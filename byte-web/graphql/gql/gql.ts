/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateItem($id: UUID, $update: itemsUpdateInput!) {\n  updateitemsCollection(\n    set: $update, \n    filter: { id: { eq: $id }}\n  ) {\n    \taffectedCount    \n    \trecords {\n      \t...Item\n    \t}\n\t}\n}\n": types.UpdateItemDocument,
    "\n    mutation InsertItem($item: itemsInsertInput!) {\n      insertIntoitemsCollection(objects: [$item]) {\n        affectedCount    \n    \trecords {\n      \t...Item\n    \t}\n      }\n    }\n": types.InsertItemDocument,
    "fragment Item on items {\n  id\n  name\n  fat_per_gram\n  protein_per_gram\n  carbs_per_gram\n  measurement_name\n}": types.ItemFragmentDoc,
    "\n    query Items {\n      itemsCollection {\n        edges {\n          node {\n            ...Item\n          }\n        }\n      }\n    }\n": types.ItemsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateItem($id: UUID, $update: itemsUpdateInput!) {\n  updateitemsCollection(\n    set: $update, \n    filter: { id: { eq: $id }}\n  ) {\n    \taffectedCount    \n    \trecords {\n      \t...Item\n    \t}\n\t}\n}\n"): (typeof documents)["\n  mutation UpdateItem($id: UUID, $update: itemsUpdateInput!) {\n  updateitemsCollection(\n    set: $update, \n    filter: { id: { eq: $id }}\n  ) {\n    \taffectedCount    \n    \trecords {\n      \t...Item\n    \t}\n\t}\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation InsertItem($item: itemsInsertInput!) {\n      insertIntoitemsCollection(objects: [$item]) {\n        affectedCount    \n    \trecords {\n      \t...Item\n    \t}\n      }\n    }\n"): (typeof documents)["\n    mutation InsertItem($item: itemsInsertInput!) {\n      insertIntoitemsCollection(objects: [$item]) {\n        affectedCount    \n    \trecords {\n      \t...Item\n    \t}\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Item on items {\n  id\n  name\n  fat_per_gram\n  protein_per_gram\n  carbs_per_gram\n  measurement_name\n}"): (typeof documents)["fragment Item on items {\n  id\n  name\n  fat_per_gram\n  protein_per_gram\n  carbs_per_gram\n  measurement_name\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Items {\n      itemsCollection {\n        edges {\n          node {\n            ...Item\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query Items {\n      itemsCollection {\n        edges {\n          node {\n            ...Item\n          }\n        }\n      }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;