require("dotenv-safe").config();
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { session_cookie, __prod__ } from "./contants";
import { Book } from "./entity/Book";
import { BookReview } from "./entity/BookReview";
import { User } from "./entity/User";
import { MyRedisClient } from "./MyRedisClient";
import { BookResolver } from "./resolver/Book";
import { BookReviewResolver } from "./resolver/BookReview";
import { UserResolver } from "./resolver/User";
import { ConfigureMailer } from "./utils/Mailer";

(async () => {
  const app = express();
  app.disable("x-powered-by");
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({ client: MyRedisClient }),
      name: session_cookie,
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      },
    })
  );

  const dbConnection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User, Book, BookReview],
  });

  if (__prod__) {
    await dbConnection.runMigrations();
  }

  // Configure mailer
  const mailer = ConfigureMailer();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, BookResolver, BookReviewResolver],
    }),
    formatError: (error) => {
      // Validation error
      if (error.extensions?.exception.validationErrors) {
        const validationError = error.extensions?.exception.validationErrors[0];
        return {
          path: validationError.property,
          message: Object.values(validationError.constraints)[0],
        } as any;
      }

      return error;
    },
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req, res }) => ({
      req,
      res,
      mailer,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log(`Server started at 4000`));
})();
