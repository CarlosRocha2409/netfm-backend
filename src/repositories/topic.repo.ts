import db from "../config/db.config";
import { Topic } from "../models/topic.model";

export default db.getRepository(Topic);
