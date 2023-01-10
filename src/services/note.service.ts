import { ILike, Like } from "typeorm";
import { ITEMS_PER_PAGE } from "../config/general.config";
import { NoteDto } from "../dtos/note.dto";
import { PaginationDTO } from "../dtos/pagination.dto";
import { ApiError } from "../error-handling/ApiError";
import noteRepo from "../repositories/note.repo";
import { BAD_REQUEST } from "../types/error.type";
import {
  INoteInput,
  INoteQueries,
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

  async getAll({
    page,
    queries: { order, title, body },
  }: {
    page: number;
    queries: INoteQueries;
  }) {
    return this.repo
      .findAndCount({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        relations: {
          topic: true,
        },
        order: {
          ...(order === NO_ORDER && { id: "DESC" }),
          ...(order === ORDER_BY_TITLE && { title: "ASC" }),
          ...(order === ORDER_BY_DATE && { created_at: "DESC" }),
          ...(order === ORDER_BY_TOPIC && {
            topic: {
              title: "ASC",
            },
          }),
        },
        where: {
          ...(title && { title: ILike(`%${title}%`) }),
          ...(body && { body: ILike(`%${body}%`) }),
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
    const note = await this.repo
      .findOne({
        where: {
          id,
        },
        relations: {
          topic: true,
        },
      })
      .catch(() => {
        throw new ApiError(`${id} is not a valid note id`, BAD_REQUEST);
      });

    if (!note) {
      throw new ApiError(`Note with id ${id} not found`, BAD_REQUEST);
    }
    return new NoteDto(note);
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
        throw new ApiError(e.message, BAD_REQUEST);
      });
  }

  async validateUpdate(note: INoteUpdate) {
    await this.findById(note.id);
    validateFields({
      fields: NoteUpdateFields,
      item: note,
      action: "updating a",
      itemName: "user",
    });
  }

  async update(input: INoteUpdate) {
    await this.validateUpdate(input);
    return this.repo
      .update({ id: input.id }, { ...input })
      .then(() => {
        return {
          id: input.id,
        };
      })
      .catch((e) => {
        throw new ApiError(e.message, BAD_REQUEST);
      });
  }
}
