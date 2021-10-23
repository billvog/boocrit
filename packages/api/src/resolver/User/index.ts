import argon2 from "argon2";
import { MyContext } from "../../type/MyContext";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entity/User";
import { CredentialsInput, RegisterInput } from "./UserInput";
import { UserResponse } from "./UserResponse";
import { isAuthenticated } from "./isAuthMiddleware";
import { OkResponse } from "../OkResponse";
import { session_cookie } from "../../contants";

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  fullName(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async Me(@Ctx() ctx: MyContext): Promise<User | null> {
    return ctx.me;
  }

  @Mutation(() => OkResponse)
  @UseMiddleware(isAuthenticated)
  async LogoutUser(@Ctx() ctx: MyContext): Promise<OkResponse> {
    return new Promise((res) =>
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return res({ ok: false });
        }

        ctx.res.clearCookie(session_cookie);
        res({ ok: true });
      })
    );
  }

  @Mutation(() => UserResponse)
  async LoginUser(
    @Arg("credentials") credentials: CredentialsInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return {
        errors: [
          {
            path: "_",
            message: "Wrong credentials",
          },
        ],
      };
    }

    const validPassword = await argon2.verify(
      user.password,
      credentials.password
    );
    if (!validPassword) {
      return {
        errors: [
          {
            path: "_",
            message: "Wrong credentials",
          },
        ],
      };
    }

    ctx.req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async RegisterUser(
    @Arg("options") options: RegisterInput
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);
    const user = await User.create({
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
      password: hashedPassword,
    }).save();

    return {
      user,
    };
  }
}
