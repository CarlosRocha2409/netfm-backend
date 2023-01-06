import { ITEMS_PER_PAGE } from "../config/general.config";
import { NoteDto } from "../dtos/note.dto";
import { PaginationDTO } from "../dtos/pagination.dto";
import { ApiError } from "../error-handling/ApiError";
import noteRepo from "../repositories/note.repo";
import { BAD_REQUEST } from "../types/error.type";
import {
  INoteInput,
  INoteUpdate,
  NoteInputFields,
  NoteUpdateFields,
  NO_ORDER,
  ORDER_BY_DATE,
  ORDER_BY_TITLE,
  ORDER_BY_TOPIC,
  TNoteOrder,
} from "../types/note.type";
import { validateFields } from "../util/validation.uti";

export default class NoteService {
  repo: typeof noteRepo;

  constructor() {
    this.repo = noteRepo;
  }

  async getAll({ page, order }: { page: number; order: TNoteOrder }) {
    return this.repo
      .findAndCount({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        relations: {
          topic: true,
        },
        order: {
          ...(order === NO_ORDER && { id: "DESC" }),
          ...(order === ORDER_BY_TITLE && { title: "DESC" }),
          ...(order === ORDER_BY_DATE && { created_at: "DESC" }),
          ...(order === ORDER_BY_TOPIC && {
            topic: {
              title: "ASC",
            },
          }),
        },
      })
      .then(([notes, count]) => {
        return new PaginationDTO(
          page,
          count,
          ITEMS_PER_PAGE,
          notes.map((n) => new NoteDto(n))
        );
      });
  }

  async findById(id: number) {
    return this.repo
      .findOne({
        where: {
          id,
        },
        relations: {
          topic: true,
        },
      })
      .then((note) => {
        if (!note)
          throw new ApiError(`Note with id ${id} not found`, BAD_REQUEST);
        return new NoteDto(note);
      });
  }

  private validateCreation(note: INoteInput) {
    validateFields({
      fields: NoteInputFields,
      item: note,
      action: "creating a",
      itemName: "note",
    });
  }

  async create(input: INoteInput) {
    this.validateCreation(input);
    return this.repo
      .insert(input)
      .then((result) => {
        return {
          id: result.identifiers[0],
        };
      })
      .catch((e) => {
        console.log(e);
        throw new ApiError(e.detail, BAD_REQUEST);
      });
  }

  validateUpdate(note: INoteUpdate) {
    validateFields({
      fields: NoteUpdateFields,
      item: note,
      action: "updating a",
      itemName: "user",
    });
  }

  async update(input: INoteUpdate) {
    this.validateUpdate(input);
    return this.repo
      .update({ id: input.id }, { ...input })
      .then(() => {
        return {
          id: input.id,
        };
      })
      .catch((e) => {
        console.log(e);
        throw new ApiError(e.message, BAD_REQUEST);
      });
  }
}