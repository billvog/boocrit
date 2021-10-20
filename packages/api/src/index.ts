import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/User";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { __prod__ } from "./contants";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entity/User";

(async () => {
  const app = express();

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
      validate: false,
    }),
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log(`Server started at 4000`));
})();
