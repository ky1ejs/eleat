import { readFileSync } from 'fs';
import urlScalar from '@graphql/custom-scalars/urlScalar';
import dateScalar from '@graphql/custom-scalars/dateScalar';
import { Resolvers } from '@graphql/__generated__/graphql';
import http from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { GraphQLContext } from '@graphql/GraphQLContext';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

const startServer = async () => {
  const typeDefs = readFileSync('graphql/schema.graphql', { encoding: 'utf-8' });

  const resolvers: Resolvers = {
    Date: dateScalar,
    URL: urlScalar,
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
      context: async () => ({})
    }),
  );

  const port = process.env.PORT || 3000;

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`📡 listening on port ${port}`);
}

const shutdown = async () => {
  console.log("Shutting down gracefully...");
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

startServer();
