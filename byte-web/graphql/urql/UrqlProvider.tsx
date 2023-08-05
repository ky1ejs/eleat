import React from "react";
import { Provider } from "urql";
import { createClientSideClient } from "./initUrqlClient";

export function UrqlProvider(props: { children: React.ReactNode }) {
  const [client, setClient] = React.useState(() => createClientSideClient());
  
  // supabaseClient.auth.onAuthStateChange((_, session) => {
    // console.log("auth change")
    // setClient(createClient(session?.access_token))
  // })

  return <Provider value={client}>{props.children}</Provider>;
}

