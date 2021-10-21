import argon2 from "argon2";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./RegsiterInput";
import { UserResponse } from "./UserResponse";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, World!";
  }

  @FieldResolver()
  fullName(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
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
