import { Note } from "../models/note.model";
import { TopicDto } from "./topic.dto";

export class NoteDto {
  id: number;
  title: string;
  body: string;
  date: Date;
  topic: TopicDto;

  constructor(note: Note) {
    this.id = note.id;
    this.body = note.body;
    this.title = note.title;
    this.date = note.updated_at;
    this.topic = new TopicDto(note.topic);
  }
}
