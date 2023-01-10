import { Router } from "express";
import NoteController from "../controllers/note.controller";

class NoteRouter {
  router: Router;
  controller: NoteController;

  constructor() {
    this.router = Router();
    this.controller = new NoteController();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.get("/:noteId", this.controller.findById);
    this.router.put("/:noteId", this.controller.update);
  }
}

export default new NoteRouter().router;
