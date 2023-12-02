import fetch from "cross-fetch";
import path from "path";
import fs from "fs";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";
import { configDotenv } from "dotenv";

const envFile = process.env.NODE_ENV === "development" ? ".env.local" : ".env";
configDotenv({ path: envFile });
console.log("fetching from: " + process.env.NEXT_PUBLIC_SUPABASE_URL);
const schemaUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const downloadGraphQlSchema = () => {
  return fetch(schemaUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: apiKey,
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((resp) => resp.json())
    .then((schemaJSON) => printSchema(buildClientSchema(schemaJSON.data)));
};

const filePath = path.join(__dirname, "../graphql/schema/", "schema.graphql");
downloadGraphQlSchema().then((schema) => {
  fs.writeFileSync(filePath, schema, "utf-8");
  console.log(`✨  Saved to ${filePath}`);
});
