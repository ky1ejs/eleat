// urql/initializeClient.tsx
import { createPagesServerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { initUrqlClient } from "next-urql";
import { Database } from "supabase/database.types";
import {
  cacheExchange,
  Client,
  ClientOptions,
  createClient,
  fetchExchange,
  SSRExchange,
  ssrExchange
} from "urql";

// let urqlClient: Client | null = null;

let ssrCache: ReturnType<typeof ssrExchange> | null = null;

const isServer = typeof window === "undefined";

function getHeaders(accessToken: string | undefined = undefined): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  if (accessToken) {
    headers["authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

function createClientParams(ssrCache: SSRExchange, accessToken: string | undefined = undefined): ClientOptions {
  return {
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`,
    fetchOptions: function createFetchOptions() {
      return { headers: getHeaders(accessToken) };
    },
    exchanges: [cacheExchange, ssrCache, fetchExchange]
  }
}

export function createClientSideClient(): Client {
  ssrCache = ssrExchange({ isClient: !isServer })
  return createClient(createClientParams(ssrCache))
}

export async function createServerSideClient(cookies: () => ReadonlyRequestCookies) {
  const supabase = createServerComponentClient<Database>(ctx);
  const {
    data: {session}
  } = await supabase.auth.getSession()
  console.log(`session: ${session}`)
  ssrCache = ssrExchange({isClient: false });
  const client = initUrqlClient(createClientParams(ssrCache, session?.access_token), false);
  return {client, ssrCache}
}
