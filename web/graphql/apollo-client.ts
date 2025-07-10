import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const HOST = process.env.NODE_ENV === "production" ? "https://api.eleat.fit" : "http://localhost:4000";

export function getClient(cookies: (() => Promise<ReadonlyRequestCookies>) | undefined) {
  const httpLink = createHttpLink({
    uri: HOST + "/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    let authHeader = headers;
    if (cookies) {
      authHeader = {
        authorization: (await cookies()).get("session")?.value ?? "",
      }
    }
    return { headers: { ...headers, ...authHeader } };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}
