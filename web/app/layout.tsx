import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/dist/client/components/headers";
import { UrqlProvider } from "@/graphql/urql/UrqlProvider";
import { Nav } from "@/components/Nav";
import SupabaseSessionProvider from "@/supabase/SupabaseSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eleat",
  description: "Plan your nutrition.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <UrqlProvider accessToken={session?.access_token}>
        <SupabaseSessionProvider initialSession={session}>
          <body className={inter.className}>
            <div className="px-4 pt-4">
              <Nav />
              {children}
            </div>
          </body>
        </SupabaseSessionProvider>
      </UrqlProvider>
    </html>
  );
}
