import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: [
    "graphql/queries/**/*.graphql",
    "app/**/*.ts?(x)",
    "components/**/*.ts?(x)",
    "lib/**/*.ts?(x)",
  ],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      schema: "./../backend/graphql/schema.graphql",
      documents: ["./src/graphql/queries.graphql"],
    },
  },
};

export default config;
