import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "graphql/schema/schema.graphql",
  documents: [
    "graphql/queries/**/*.graphql",
    "app/**/*.ts?(x)",
    "components/**/*.ts?(x)",
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./graphql/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        scalars: {
          Date: "Date",
          BigFloat: "number",
          BigInt: "BigInt",
          Int: "number",
          UUID: "UUID",
        },
      },
    },
  },
};

export default config;
