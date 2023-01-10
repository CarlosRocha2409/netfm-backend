import { ApiError } from "../error-handling/ApiError";
import { BAD_REQUEST, INTERNAL_SERVER } from "../types/error.type";
import logger from "../logger/api.logger";

export function validateFields({
  fields,
  item,
  action,
  itemName,
}: {
  fields: string[];
  item: any;
  action: string;
  itemName: string;
}) {
  fields.forEach((field) => {
    if (!item[field])
      throw new ApiError(
        `Attribute ${field} is necessary for ${action} ${itemName}`,
        BAD_REQUEST
      );
  });
}

export function throwServerError(e: any, action: string) {
  logger.error(`Error ${action}:: ${e.message}`);
  throw new ApiError(`Error ${action}`, INTERNAL_SERVER);
}
