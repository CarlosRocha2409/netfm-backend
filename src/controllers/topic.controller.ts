import { NextFunction, Request, Response } from "express";
import TopicService from "../services/topic.service";

export default class TopicController {
  service: TopicService;

  constructor() {
    this.service = new TopicService();
  }

  getAll = async (_: Request, res: Response, next: NextFunction) => {
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
