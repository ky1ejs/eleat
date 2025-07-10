import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { ApolloProvider } from "@apollo/client";
import { cookies } from "next/headers";
import { getClient } from "@/graphql/apollo-client";


export const metadata: Metadata = {
  title: "Eleat",
  description: "Nutrition planning made easy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get("session")?.value ?? null;
  const client = getClient(sessionId)
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body>
          <Nav />
          {children}
        </body>
      </ApolloProvider>
    </html>
  );
}
