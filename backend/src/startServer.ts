import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Resolvers } from "@graphql/__generated__/graphql";
import dateScalar from "@graphql/custom-scalars/dateScalar";
import urlScalar from "@graphql/custom-scalars/urlScalar";
import { GraphQLContext } from "@graphql/GraphQLContext";
import { readFileSync } from "fs";
import cors from 'cors';
import express from 'express';
import http from 'http';
import prisma from "src/prisma-client";
import initiateEmailAuthentication from "src/mutation/initiateEmailAuthentication";
import validateEmailAuthentication from "src/mutation/validateAuthentication";
import completeAccountCreation from "src/mutation/completeAccountCreation";

export const startServer = async () => {
  const typeDefs = readFileSync('graphql/schema.graphql', { encoding: 'utf-8' });

  const resolvers: Resolvers = {
    Date: dateScalar,
    URL: urlScalar,
    Mutation: {
      initiateEmailAuthentication,
      validateEmailAuthentication,
      completeAccountCreation
    }
  };

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        dataSources: {
          prisma
        }
      })
    }),
  );

  const port = process.env.PORT || 4000;

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`📡 listening on port ${port}`);
}
