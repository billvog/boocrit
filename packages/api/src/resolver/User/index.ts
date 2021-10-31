import argon2 from "argon2";
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
import { uid } from "uid";
import { REDIS_REGISTER1_CODE, session_cookie } from "../../contants";
import { User } from "../../entity/User";
import { MyRedisClient as redis } from "../../MyRedisClient";
import { MyContext } from "../../type/MyContext";
import { OkResponse } from "../OkResponse";
import { isAuthenticated } from "./isAuthMiddleware";
import {
  CredentialsInput,
  RegisterInput1,
  RegisterInput2,
  RegisterInput4,
} from "./UserInput";
import { UserResponse } from "./UserResponse";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello!";
  }

  @FieldResolver()
  fullName(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async Me(@Ctx() ctx: MyContext): Promise<User> {
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

  @Mutation(() => OkResponse)
  async RegisterUser1(
    @Arg("options") options: RegisterInput1
  ): Promise<OkResponse> {
    const code = uid(6);

    // For now log the code
    console.log(code);

    const user = {
      ...options,
    };

    // Save user info to redis
    await redis.set(
      `${REDIS_REGISTER1_CODE}${code}`,
      JSON.stringify(user),
      "px",
      1000 * 60 * 60 * 4 // 4h
    );

    return {
      ok: true,
    };
  }

  @Mutation(() => OkResponse)
  async RegisterUser2(
    @Arg("options") options: RegisterInput2
  ): Promise<OkResponse> {
    // Retrieve code from redis
    const code = await redis.get(`${REDIS_REGISTER1_CODE}${options.code}`);
    if (!code) {
      return {
        ok: false,
      };
    }

    try {
      const user = JSON.parse(code);
      return {
        ok: user.email == options.email,
      };
    } catch {
      return {
        ok: false,
      };
    }
  }

  @Mutation(() => UserResponse)
  async RegisterUser4(
    @Arg("options") options: RegisterInput4,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    let stored_user;

    try {
      const code = await redis.get(`${REDIS_REGISTER1_CODE}${options.code}`);
      if (!code) throw new Error("Code not found");
      stored_user = JSON.parse(code);
    } catch {
      return {
        errors: [
          {
            path: "email",
            message: "Repeat the verification process",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    const user = await User.create({
      firstName: options.firstName,
      lastName: options.lastName,
      email: stored_user.email,
      password: hashedPassword,
    }).save();

    ctx.req.session.userId = user.id;
    return {
      user,
    };
  }
}
