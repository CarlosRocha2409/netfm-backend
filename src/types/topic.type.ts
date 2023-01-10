export interface ITopicInput {
  title: string;
}
export const TopicInputFields = ["title"];

export interface ITopicUpdate extends ITopicInput {
  id: number;
}

export const TopicUpdateFields = [...TopicInputFields, "id"];
