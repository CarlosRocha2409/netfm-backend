import * as bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import { ApiError } from "./error-handling/ApiError";
import cors from "cors";
import { FORBIDDEN, INTERNAL_SERVER } from "./types/error.type";
import logger from "./logger/api.logger";

class App {
  public express: express.Application;

  private whitelist = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:5000",
    "*",
  ];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(
      cors({
        credentials: true,
        origin: (origin, callback) => {
          if (origin && this.whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new ApiError("Not Authorized", FORBIDDEN));
          }
        },
      })
    );
    this.express.use((req, __, next) => {
      logger.info(`[HTTP Request ${req.method}]: ${req.url}`);
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // Custom Routes

    this.express.get("/", (_, res, __) => {
      res.send("Typescript App works!!");
    });

    // handle undefined routes
    this.express.use("*", (_, res, __) => {
      res.send("Make sure url is correct!!!");
    });

    this.express.use((e: ApiError, _: any, res: any, __: any) => {
      console.log(e);
      res.status(e.statusCode).json({
        name: e.message,
        message: e.name,
        status: e.statusCode ?? INTERNAL_SERVER,
      });
    });
  }
}

export default new App().express;
