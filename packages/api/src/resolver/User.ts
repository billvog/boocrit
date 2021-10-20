import { User } from "../entity/User";
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { FieldError } from "./FieldError";
import argon2 from "argon2";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field({ nullable: true })
  user?: User;
}

@InputType()
class RegisterInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

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
    if (
      await User.findOne({
        where: {
          email: options.email,
        },
      })
    ) {
      return {
        errors: [
          {
            path: "email",
            message: "This email is already taken",
          },
        ],
      };
    }

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
