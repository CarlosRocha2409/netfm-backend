import { QueryFailedError } from "typeorm";
import { TopicDto } from "../dtos/topic.dto";
import { ApiError } from "../error-handling/ApiError";
import topicRepo from "../repositories/topic.repo";
import { BAD_REQUEST } from "../types/error.type";
import {
  ITopicInput,
  ITopicUpdate,
  TopicInputFields,
  TopicUpdateFields,
} from "../types/topic.type";
import { validateFields } from "../util/validation.uti";

export default class TopicService {
  repo: typeof topicRepo;

  constructor() {
    this.repo = topicRepo;
  }

  async getAll() {
    return this.repo
      .find({
        order: {
          id: "ASC",
        },
      })
      .then((topics) => topics.map((topic) => new TopicDto(topic)));
  }

  async geById(id: number) {
    const topic = await this.repo.findOne({ where: { id } }).catch(() => {
      throw new ApiError(`${id} is not a valid topic Id`, BAD_REQUEST);
    });

    if (!topic)
      throw new ApiError(`Topic with id ${id} not found`, BAD_REQUEST);
    return new TopicDto(topic);
  }

  private validateCreate(topic: ITopicInput) {
    validateFields({
      fields: TopicInputFields,
      item: topic,
      action: "creating a",
      itemName: "topic",
    });
  }
  async create(topic: ITopicInput) {
    this.validateCreate(topic);
    return this.repo
      .insert(topic)
      .then((result) => {
        return {
          id: result.identifiers[0],
        };
      })
      .catch((e) => {
        throw new ApiError(e.message, BAD_REQUEST);
      });
  }

  private async validateUpdate(topic: ITopicUpdate) {
    await this.geById(topic.id);
    validateFields({
      fields: TopicUpdateFields,
      item: topic,
      action: "updating a",
      itemName: "topic",
    });
  }
  async update(topic: ITopicUpdate) {
    await this.validateUpdate(topic);
    return this.repo
      .update({ id: topic.id }, { ...topic })
      .then(() => {
        return {
          id: topic.id,
        };
      })
      .catch((e) => {
        throw new ApiError(e.message, BAD_REQUEST);
      });
  }
}
