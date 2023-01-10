import { DataSource } from "typeorm";
import apiLogger from "../logger/api.logger";
import entities from "../models/index.model";
import { fill } from "../util/fill.util";

class DBConfig {
  private static instance: DBConfig;
  AppDataSource: DataSource;
  private hostName: string = process.env.DB_HOST!;
  private port: string = process.env.DB_PORT!;
  private username: string = process.env.DB_USER!;
  private password: string = process.env.DB_PASSWORD!;
  private database: string = process.env.DB!;

  constructor() {
    this.AppDataSource = new DataSource({
      type: "postgres",
      host: this.hostName,
      port: parseInt(this.port),
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: true,
      entities,
    });

    this.connect();
  }

  private async connect() {
    this.AppDataSource.initialize()
      .then(() => {
        apiLogger.info("Successfully connected to DB");
        fill();
      })
      .catch((error) => console.log(error));
  }

  public static getInstance(): DBConfig {
    if (!DBConfig.instance) {
      DBConfig.instance = new DBConfig();
    }
    return DBConfig.instance;
  }
}

export default DBConfig.getInstance().AppDataSource;
