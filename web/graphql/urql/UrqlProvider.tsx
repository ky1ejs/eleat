"use client";

import {
  UrqlProvider as Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
  SSRExchange,
} from "@urql/next";

function getHeaders(
  accessToken: string | undefined = undefined,
): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  if (accessToken) {
    headers["authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

function createClientOptions(
  ssr: SSRExchange,
  accessToken: string | undefined = undefined,
) {
  return {
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`,
    fetchOptions: {
      headers: getHeaders(accessToken),
    },
    exchanges: [cacheExchange, ssr, fetchExchange],
    suspense: true,
  };
}

const ssr = ssrExchange();

export function UrqlProvider({
  children,
  accessToken,
}: { accessToken: string | undefined } & React.PropsWithChildren) {
  const client = createClient(createClientOptions(ssr, accessToken));

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  );
}
