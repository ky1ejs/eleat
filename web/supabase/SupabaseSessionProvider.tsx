"use client";

import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

type MaybeSession = Session | null;

type SessionContext = {
  session: MaybeSession;
};

const Context = createContext<SessionContext>({ session: null });
const supabase = createClientComponentClient();

export default function SupabaseSessionProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: MaybeSession;
}) {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event, sesh) => {
      setSession(sesh);
    });
    return sub.data.subscription.unsubscribe;
  }, []);

  return <Context.Provider value={{ session }}>{children}</Context.Provider>;
}

export const useSession = () => useContext(Context);
