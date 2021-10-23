import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/User";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { session_cookie, __prod__ } from "./contants";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entity/User";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyRedisClient } from "./MyRedisClient";

(async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({ client: MyRedisClient }),
      name: session_cookie,
      secret: "a98s7d09as8ud9as8ud09238ed903j",
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
    url: "postgres://postgres:postgres@localhost/boocrit",
    logging: !__prod__,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User],
  });

  if (__prod__) {
    await dbConnection.runMigrations();
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log(`Server started at 4000`));
})();
