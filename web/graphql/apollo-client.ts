import { ApolloClient, InMemoryCache } from "@apollo/client";

const HOST = process.env.NODE_ENV === "production" ? "https://api.eleat.fit" : "http://localhost:4000";

const client = new ApolloClient({
  uri: `${HOST}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
