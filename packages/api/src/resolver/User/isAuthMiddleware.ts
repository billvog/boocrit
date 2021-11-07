import { User } from "../../entity/User";
import { MyContext } from "src/type/MyContext";
import { MiddlewareFn } from "type-graphql";

const NotAuthenticatedError = "You must be authenticated to access that path";

export const isAuthenticated: MiddlewareFn<MyContext> = async (
  { context: ctx },
  next
) => {
  if (!ctx.req.session.userId) {
    throw new Error(NotAuthenticatedError);
  }

  const me = await User.findOne({ where: { id: ctx.req.session.userId } });
  if (!me) {
    throw new Error(NotAuthenticatedError);
  }

  ctx.me = me;
  return next();
};
