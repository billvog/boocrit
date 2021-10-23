import { User } from "../../entity/User";
import { MyContext } from "src/type/MyContext";
import { MiddlewareFn } from "type-graphql";

const NotAuthenticatedError = "You must be authenticated to access that path";

export const isAuthenticated: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  if (!context.req.session.userId) {
    throw new Error(NotAuthenticatedError);
  }

  const me = await User.findOne(context.req.session.userId);
  if (!me) {
    throw new Error(NotAuthenticatedError);
  }

  context.me = me;
  return next();
};
