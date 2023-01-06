export const NO_ORDER = 0;
export const ORDER_BY_TITLE = 1;
export const ORDER_BY_TOPIC = 2;
export const ORDER_BY_DATE = 3;

export type TNoteOrder =
  | typeof NO_ORDER
  | typeof ORDER_BY_TITLE
  | typeof ORDER_BY_TOPIC
  | typeof ORDER_BY_DATE;

export interface INoteInput {
  title: string;
  body: string;
  topicId: number;
}

export const NoteInputFields = ["title", "body", "topicId"];

export interface INoteUpdate extends INoteInput {
  id: number;
}
export const NoteUpdateFields = ["id", ...NoteInputFields];
