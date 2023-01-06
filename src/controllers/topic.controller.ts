import { NextFunction, Request, Response } from "express";
import NoteService from "../services/note.service";
import TopicService from "../services/topic.service";
import { NO_ORDER, TNoteOrder } from "../types/note.type";

export default class TopicController {
  service: TopicService;

  constructor() {
    this.service = new TopicService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let order = req.query.order ? (+req.query.order as TNoteOrder) : NO_ORDER;
    let page = req.query.page ? +req.query.page : 1;

    return this.service
      .getAll()
      .then((notes) => res.status(200).json(notes))
      .catch((e) => next(e));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    return this.service
      .create(req.body)
      .then((note) => res.status(200).json(note))
      .catch((e) => next(e));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    return this.service
      .update({
        id: +req.params.topicId,
        ...req.body,
      })
      .then((note) => res.status(200).json(note))
      .catch((e) => next(e));
  };
}
