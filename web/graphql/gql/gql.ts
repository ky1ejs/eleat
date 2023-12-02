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
    "\n  query Items {\n    itemCollection {\n      edges {\n        node {\n          ...Item\n        }\n      }\n    }\n  }\n": types.ItemsDocument,
    "\n  query UserProfile($user_id: UUID!) {\n    user_profileCollection(filter: { user_id: { eq: $user_id } }) {\n      edges {\n        node {\n          ...UserProfile\n        }\n      }\n    }\n  }\n": types.UserProfileDocument,
    "\n  mutation UpdateUserProfile($user_id: UUID!, $data: user_profileUpdateInput!) {\n    updateuser_profileCollection(\n      set: $data\n      filter: { user_id: { eq: $user_id } }\n    ) {\n      affectedCount\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  query ListPhysicalActivityLevels {\n    physical_activity_levelCollection {\n      edges {\n        node {\n          ...PhysicalActivityLevel\n        }\n      }\n    }\n  }\n": types.ListPhysicalActivityLevelsDocument,
    "\n  mutation InsertItem($item: itemInsertInput!) {\n    insertIntoitemCollection(objects: [$item]) {\n      affectedCount\n    }\n  }\n": types.InsertItemDocument,
    "fragment Serving on serving {\n  id\n  item_id\n  name\n  plural\n  protein_grams\n  fat_grams\n  carb_grams\n}\n\nfragment Item on item {\n  id\n  name\n  servingCollection {\n    edges {\n      node {\n        ...Serving\n      }\n    }\n  }\n}\n\nfragment PhysicalActivityLevel on physical_activity_level {\n  id\n  name\n  description\n  multiplier\n}\n\nfragment MacroTarget on macro_target {\n  id\n  protein_percentage\n  fat_percentage\n  carb_percentage\n}\n\nfragment UserProfile on user_profile {\n  nodeId\n  id\n  created_at\n  updated_at\n  user_id\n  username\n  display_name\n  avatar_url\n  date_of_birth\n  weight_in_grams\n  height_in_cm\n  amount_of_surplus_calories\n  physical_activity_level_id\n  physical_activity_level {\n    ...PhysicalActivityLevel\n  }\n  macro_target {\n    ...MacroTarget\n  }\n}": types.ServingFragmentDoc,
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
export function graphql(source: "\n  query Items {\n    itemCollection {\n      edges {\n        node {\n          ...Item\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Items {\n    itemCollection {\n      edges {\n        node {\n          ...Item\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserProfile($user_id: UUID!) {\n    user_profileCollection(filter: { user_id: { eq: $user_id } }) {\n      edges {\n        node {\n          ...UserProfile\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserProfile($user_id: UUID!) {\n    user_profileCollection(filter: { user_id: { eq: $user_id } }) {\n      edges {\n        node {\n          ...UserProfile\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserProfile($user_id: UUID!, $data: user_profileUpdateInput!) {\n    updateuser_profileCollection(\n      set: $data\n      filter: { user_id: { eq: $user_id } }\n    ) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfile($user_id: UUID!, $data: user_profileUpdateInput!) {\n    updateuser_profileCollection(\n      set: $data\n      filter: { user_id: { eq: $user_id } }\n    ) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListPhysicalActivityLevels {\n    physical_activity_levelCollection {\n      edges {\n        node {\n          ...PhysicalActivityLevel\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPhysicalActivityLevels {\n    physical_activity_levelCollection {\n      edges {\n        node {\n          ...PhysicalActivityLevel\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertItem($item: itemInsertInput!) {\n    insertIntoitemCollection(objects: [$item]) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation InsertItem($item: itemInsertInput!) {\n    insertIntoitemCollection(objects: [$item]) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Serving on serving {\n  id\n  item_id\n  name\n  plural\n  protein_grams\n  fat_grams\n  carb_grams\n}\n\nfragment Item on item {\n  id\n  name\n  servingCollection {\n    edges {\n      node {\n        ...Serving\n      }\n    }\n  }\n}\n\nfragment PhysicalActivityLevel on physical_activity_level {\n  id\n  name\n  description\n  multiplier\n}\n\nfragment MacroTarget on macro_target {\n  id\n  protein_percentage\n  fat_percentage\n  carb_percentage\n}\n\nfragment UserProfile on user_profile {\n  nodeId\n  id\n  created_at\n  updated_at\n  user_id\n  username\n  display_name\n  avatar_url\n  date_of_birth\n  weight_in_grams\n  height_in_cm\n  amount_of_surplus_calories\n  physical_activity_level_id\n  physical_activity_level {\n    ...PhysicalActivityLevel\n  }\n  macro_target {\n    ...MacroTarget\n  }\n}"): (typeof documents)["fragment Serving on serving {\n  id\n  item_id\n  name\n  plural\n  protein_grams\n  fat_grams\n  carb_grams\n}\n\nfragment Item on item {\n  id\n  name\n  servingCollection {\n    edges {\n      node {\n        ...Serving\n      }\n    }\n  }\n}\n\nfragment PhysicalActivityLevel on physical_activity_level {\n  id\n  name\n  description\n  multiplier\n}\n\nfragment MacroTarget on macro_target {\n  id\n  protein_percentage\n  fat_percentage\n  carb_percentage\n}\n\nfragment UserProfile on user_profile {\n  nodeId\n  id\n  created_at\n  updated_at\n  user_id\n  username\n  display_name\n  avatar_url\n  date_of_birth\n  weight_in_grams\n  height_in_cm\n  amount_of_surplus_calories\n  physical_activity_level_id\n  physical_activity_level {\n    ...PhysicalActivityLevel\n  }\n  macro_target {\n    ...MacroTarget\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;