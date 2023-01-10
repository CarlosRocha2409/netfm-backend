import { Note } from "../models/note.model";
import { TopicDto } from "./topic.dto";

export class NoteDto {
  id: number;
  title: string;
  body: string;
  creation: Date;
  topic: TopicDto;

  constructor(note: Note) {
    this.id = note.id;
    this.body = note.body;
    this.title = note.title;
    this.creation = note.created_at;
    this.topic = new TopicDto(note.topic);
  }
}
