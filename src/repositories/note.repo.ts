import db from "../config/db.config";
import { Note } from "../models/note.model";

export default db.getRepository(Note);
