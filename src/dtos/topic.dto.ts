import { Topic } from "../models/topic.model";

export class TopicDto {
  id: number;
  title: string;

  constructor(topic: Topic) {
    this.id = topic.id;
    this.title = topic.title;
  }
}
