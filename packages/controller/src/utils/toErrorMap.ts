import { FieldError } from "../generated/graphql-hooks";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};

  try {
    errors.forEach(({ path, message }) => {
      errorMap[path] = message;
    });
  } catch {
    return {
      _: "Internal server error",
    };
  }

  return errorMap;
};
