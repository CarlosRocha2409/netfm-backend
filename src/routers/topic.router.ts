import { Router } from "express";
import TopicController from "../controllers/topic.controller";

class TopicRouter {
  router: Router;
  controller: TopicController;

  constructor() {
    this.router = Router();
    this.controller = new TopicController();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:noteId", this.controller.update);
  }
}

export default new TopicRouter().router;
