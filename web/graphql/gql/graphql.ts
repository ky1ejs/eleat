/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: number; output: number; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: BigInt; output: BigInt; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: Date; output: Date; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: UUID; output: UUID; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `item` collection */
  deleteFromitemCollection: ItemDeleteResponse;
  /** Deletes zero or more records from the `macro_target` collection */
  deleteFrommacro_targetCollection: Macro_TargetDeleteResponse;
  /** Deletes zero or more records from the `physical_activity_level` collection */
  deleteFromphysical_activity_levelCollection: Physical_Activity_LevelDeleteResponse;
  /** Deletes zero or more records from the `plan` collection */
  deleteFromplanCollection: PlanDeleteResponse;
  /** Deletes zero or more records from the `serving` collection */
  deleteFromservingCollection: ServingDeleteResponse;
  /** Deletes zero or more records from the `user_profile` collection */
  deleteFromuser_profileCollection: User_ProfileDeleteResponse;
  /** Adds one or more `item` records to the collection */
  insertIntoitemCollection?: Maybe<ItemInsertResponse>;
  /** Adds one or more `macro_target` records to the collection */
  insertIntomacro_targetCollection?: Maybe<Macro_TargetInsertResponse>;
  /** Adds one or more `physical_activity_level` records to the collection */
  insertIntophysical_activity_levelCollection?: Maybe<Physical_Activity_LevelInsertResponse>;
  /** Adds one or more `plan` records to the collection */
  insertIntoplanCollection?: Maybe<PlanInsertResponse>;
  /** Adds one or more `serving` records to the collection */
  insertIntoservingCollection?: Maybe<ServingInsertResponse>;
  /** Adds one or more `user_profile` records to the collection */
  insertIntouser_profileCollection?: Maybe<User_ProfileInsertResponse>;
  /** Updates zero or more records in the `item` collection */
  updateitemCollection: ItemUpdateResponse;
  /** Updates zero or more records in the `macro_target` collection */
  updatemacro_targetCollection: Macro_TargetUpdateResponse;
  /** Updates zero or more records in the `physical_activity_level` collection */
  updatephysical_activity_levelCollection: Physical_Activity_LevelUpdateResponse;
  /** Updates zero or more records in the `plan` collection */
  updateplanCollection: PlanUpdateResponse;
  /** Updates zero or more records in the `serving` collection */
  updateservingCollection: ServingUpdateResponse;
  /** Updates zero or more records in the `user_profile` collection */
  updateuser_profileCollection: User_ProfileUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromitemCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ItemFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrommacro_TargetCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Macro_TargetFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromphysical_Activity_LevelCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Physical_Activity_LevelFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromplanCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<PlanFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromservingCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ServingFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromuser_ProfileCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<User_ProfileFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoitemCollectionArgs = {
  objects: Array<ItemInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntomacro_TargetCollectionArgs = {
  objects: Array<Macro_TargetInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntophysical_Activity_LevelCollectionArgs = {
  objects: Array<Physical_Activity_LevelInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoplanCollectionArgs = {
  objects: Array<PlanInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoservingCollectionArgs = {
  objects: Array<ServingInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntouser_ProfileCollectionArgs = {
  objects: Array<User_ProfileInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateitemCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ItemFilter>;
  set: ItemUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatemacro_TargetCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Macro_TargetFilter>;
  set: Macro_TargetUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatephysical_Activity_LevelCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Physical_Activity_LevelFilter>;
  set: Physical_Activity_LevelUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateplanCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<PlanFilter>;
  set: PlanUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateservingCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ServingFilter>;
  set: ServingUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateuser_ProfileCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<User_ProfileFilter>;
  set: User_ProfileUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `item` */
  itemCollection?: Maybe<ItemConnection>;
  /** A pagable collection of type `macro_target` */
  macro_targetCollection?: Maybe<Macro_TargetConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `physical_activity_level` */
  physical_activity_levelCollection?: Maybe<Physical_Activity_LevelConnection>;
  /** A pagable collection of type `plan` */
  planCollection?: Maybe<PlanConnection>;
  /** A pagable collection of type `serving` */
  servingCollection?: Maybe<ServingConnection>;
  /** A pagable collection of type `user_profile` */
  user_profileCollection?: Maybe<User_ProfileConnection>;
};


/** The root type for querying data */
export type QueryItemCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemOrderBy>>;
};


/** The root type for querying data */
export type QueryMacro_TargetCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Macro_TargetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Macro_TargetOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryPhysical_Activity_LevelCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Physical_Activity_LevelFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Physical_Activity_LevelOrderBy>>;
};


/** The root type for querying data */
export type QueryPlanCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<PlanFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlanOrderBy>>;
};


/** The root type for querying data */
export type QueryServingCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ServingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServingOrderBy>>;
};


/** The root type for querying data */
export type QueryUser_ProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<User_ProfileFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<User_ProfileOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type Item = Node & {
  __typename?: 'item';
  created_at: Scalars['Datetime']['output'];
  created_by_user_id: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  servingCollection?: Maybe<ServingConnection>;
  updated_at: Scalars['Datetime']['output'];
};


export type ItemServingCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ServingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ServingOrderBy>>;
};

export type ItemConnection = {
  __typename?: 'itemConnection';
  edges: Array<ItemEdge>;
  pageInfo: PageInfo;
};

export type ItemDeleteResponse = {
  __typename?: 'itemDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Item>;
};

export type ItemEdge = {
  __typename?: 'itemEdge';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type ItemFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  created_by_user_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ItemInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by_user_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ItemInsertResponse = {
  __typename?: 'itemInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Item>;
};

export type ItemOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  created_by_user_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ItemUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by_user_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ItemUpdateResponse = {
  __typename?: 'itemUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Item>;
};

export type Macro_Target = Node & {
  __typename?: 'macro_target';
  carb_percentage: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  fat_percentage: Scalars['BigFloat']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  protein_percentage: Scalars['BigFloat']['output'];
  updated_at: Scalars['Datetime']['output'];
  user_id: Scalars['UUID']['output'];
  user_profileCollection?: Maybe<User_ProfileConnection>;
};


export type Macro_TargetUser_ProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<User_ProfileFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<User_ProfileOrderBy>>;
};

export type Macro_TargetConnection = {
  __typename?: 'macro_targetConnection';
  edges: Array<Macro_TargetEdge>;
  pageInfo: PageInfo;
};

export type Macro_TargetDeleteResponse = {
  __typename?: 'macro_targetDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Macro_Target>;
};

export type Macro_TargetEdge = {
  __typename?: 'macro_targetEdge';
  cursor: Scalars['String']['output'];
  node: Macro_Target;
};

export type Macro_TargetFilter = {
  carb_percentage?: InputMaybe<BigFloatFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  fat_percentage?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  protein_percentage?: InputMaybe<BigFloatFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Macro_TargetInsertInput = {
  carb_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  fat_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  protein_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Macro_TargetInsertResponse = {
  __typename?: 'macro_targetInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Macro_Target>;
};

export type Macro_TargetOrderBy = {
  carb_percentage?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  fat_percentage?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  protein_percentage?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Macro_TargetUpdateInput = {
  carb_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  fat_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  protein_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Macro_TargetUpdateResponse = {
  __typename?: 'macro_targetUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Macro_Target>;
};

export type Physical_Activity_Level = Node & {
  __typename?: 'physical_activity_level';
  created_at: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  multiplier: Scalars['BigFloat']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at: Scalars['Datetime']['output'];
  user_profileCollection?: Maybe<User_ProfileConnection>;
};


export type Physical_Activity_LevelUser_ProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<User_ProfileFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<User_ProfileOrderBy>>;
};

export type Physical_Activity_LevelConnection = {
  __typename?: 'physical_activity_levelConnection';
  edges: Array<Physical_Activity_LevelEdge>;
  pageInfo: PageInfo;
};

export type Physical_Activity_LevelDeleteResponse = {
  __typename?: 'physical_activity_levelDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Physical_Activity_Level>;
};

export type Physical_Activity_LevelEdge = {
  __typename?: 'physical_activity_levelEdge';
  cursor: Scalars['String']['output'];
  node: Physical_Activity_Level;
};

export type Physical_Activity_LevelFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  multiplier?: InputMaybe<BigFloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Physical_Activity_LevelInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  multiplier?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Physical_Activity_LevelInsertResponse = {
  __typename?: 'physical_activity_levelInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Physical_Activity_Level>;
};

export type Physical_Activity_LevelOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  multiplier?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Physical_Activity_LevelUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  multiplier?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Physical_Activity_LevelUpdateResponse = {
  __typename?: 'physical_activity_levelUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Physical_Activity_Level>;
};

export type Plan = Node & {
  __typename?: 'plan';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  ordered_item_ids: Array<Maybe<Scalars['UUID']['output']>>;
  updated_at: Scalars['Datetime']['output'];
  user_id: Scalars['UUID']['output'];
};

export type PlanConnection = {
  __typename?: 'planConnection';
  edges: Array<PlanEdge>;
  pageInfo: PageInfo;
};

export type PlanDeleteResponse = {
  __typename?: 'planDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Plan>;
};

export type PlanEdge = {
  __typename?: 'planEdge';
  cursor: Scalars['String']['output'];
  node: Plan;
};

export type PlanFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type PlanInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ordered_item_ids?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type PlanInsertResponse = {
  __typename?: 'planInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Plan>;
};

export type PlanOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type PlanUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ordered_item_ids?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type PlanUpdateResponse = {
  __typename?: 'planUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Plan>;
};

export type Serving = Node & {
  __typename?: 'serving';
  carb_grams: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  created_by_user_id: Scalars['UUID']['output'];
  fat_grams: Scalars['BigFloat']['output'];
  id: Scalars['UUID']['output'];
  item: Item;
  item_id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  plural: Scalars['String']['output'];
  protein_grams: Scalars['BigFloat']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type ServingConnection = {
  __typename?: 'servingConnection';
  edges: Array<ServingEdge>;
  pageInfo: PageInfo;
};

export type ServingDeleteResponse = {
  __typename?: 'servingDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Serving>;
};

export type ServingEdge = {
  __typename?: 'servingEdge';
  cursor: Scalars['String']['output'];
  node: Serving;
};

export type ServingFilter = {
  carb_grams?: InputMaybe<BigFloatFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  created_by_user_id?: InputMaybe<UuidFilter>;
  fat_grams?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<UuidFilter>;
  item_id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  plural?: InputMaybe<StringFilter>;
  protein_grams?: InputMaybe<BigFloatFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ServingInsertInput = {
  carb_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by_user_id?: InputMaybe<Scalars['UUID']['input']>;
  fat_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  item_id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plural?: InputMaybe<Scalars['String']['input']>;
  protein_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ServingInsertResponse = {
  __typename?: 'servingInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Serving>;
};

export type ServingOrderBy = {
  carb_grams?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  created_by_user_id?: InputMaybe<OrderByDirection>;
  fat_grams?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  item_id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  plural?: InputMaybe<OrderByDirection>;
  protein_grams?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ServingUpdateInput = {
  carb_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by_user_id?: InputMaybe<Scalars['UUID']['input']>;
  fat_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  item_id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plural?: InputMaybe<Scalars['String']['input']>;
  protein_grams?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ServingUpdateResponse = {
  __typename?: 'servingUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Serving>;
};

export type User_Profile = Node & {
  __typename?: 'user_profile';
  amount_of_surplus_calories?: Maybe<Scalars['BigFloat']['output']>;
  avatar_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  date_of_birth?: Maybe<Scalars['Date']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  height_in_cm?: Maybe<Scalars['BigFloat']['output']>;
  id: Scalars['UUID']['output'];
  macro_target?: Maybe<Macro_Target>;
  macro_target_id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  physical_activity_level?: Maybe<Physical_Activity_Level>;
  physical_activity_level_id?: Maybe<Scalars['UUID']['output']>;
  updated_at: Scalars['Datetime']['output'];
  user_id: Scalars['UUID']['output'];
  username?: Maybe<Scalars['String']['output']>;
  weight_in_grams?: Maybe<Scalars['BigFloat']['output']>;
};

export type User_ProfileConnection = {
  __typename?: 'user_profileConnection';
  edges: Array<User_ProfileEdge>;
  pageInfo: PageInfo;
};

export type User_ProfileDeleteResponse = {
  __typename?: 'user_profileDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Profile>;
};

export type User_ProfileEdge = {
  __typename?: 'user_profileEdge';
  cursor: Scalars['String']['output'];
  node: User_Profile;
};

export type User_ProfileFilter = {
  amount_of_surplus_calories?: InputMaybe<BigFloatFilter>;
  avatar_url?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  date_of_birth?: InputMaybe<DateFilter>;
  display_name?: InputMaybe<StringFilter>;
  height_in_cm?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<UuidFilter>;
  macro_target_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  physical_activity_level_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
  username?: InputMaybe<StringFilter>;
  weight_in_grams?: InputMaybe<BigFloatFilter>;
};

export type User_ProfileInsertInput = {
  amount_of_surplus_calories?: InputMaybe<Scalars['BigFloat']['input']>;
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date_of_birth?: InputMaybe<Scalars['Date']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  height_in_cm?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  macro_target_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_activity_level_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  weight_in_grams?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type User_ProfileInsertResponse = {
  __typename?: 'user_profileInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Profile>;
};

export type User_ProfileOrderBy = {
  amount_of_surplus_calories?: InputMaybe<OrderByDirection>;
  avatar_url?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date_of_birth?: InputMaybe<OrderByDirection>;
  display_name?: InputMaybe<OrderByDirection>;
  height_in_cm?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  macro_target_id?: InputMaybe<OrderByDirection>;
  physical_activity_level_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  weight_in_grams?: InputMaybe<OrderByDirection>;
};

export type User_ProfileUpdateInput = {
  amount_of_surplus_calories?: InputMaybe<Scalars['BigFloat']['input']>;
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date_of_birth?: InputMaybe<Scalars['Date']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  height_in_cm?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  macro_target_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_activity_level_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  weight_in_grams?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type User_ProfileUpdateResponse = {
  __typename?: 'user_profileUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Profile>;
};

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', itemCollection?: { __typename?: 'itemConnection', edges: Array<{ __typename?: 'itemEdge', node: { __typename?: 'item', id: UUID, name: string, servingCollection?: { __typename?: 'servingConnection', edges: Array<{ __typename?: 'servingEdge', node: { __typename?: 'serving', id: UUID, item_id: UUID, name: string, plural: string, protein_grams: number, fat_grams: number, carb_grams: number } }> } | null } }> } | null };

export type UserProfileQueryVariables = Exact<{
  user_id: Scalars['UUID']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', user_profileCollection?: { __typename?: 'user_profileConnection', edges: Array<{ __typename?: 'user_profileEdge', node: { __typename?: 'user_profile', nodeId: string, id: UUID, created_at: any, updated_at: any, user_id: UUID, username?: string | null, display_name?: string | null, avatar_url?: string | null, date_of_birth?: Date | null, weight_in_grams?: number | null, height_in_cm?: number | null, amount_of_surplus_calories?: number | null, physical_activity_level_id?: UUID | null, physical_activity_level?: { __typename?: 'physical_activity_level', id: UUID, name: string, description: string, multiplier: number } | null, macro_target?: { __typename?: 'macro_target', id: UUID, protein_percentage: number, fat_percentage: number, carb_percentage: number } | null } }> } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  user_id: Scalars['UUID']['input'];
  data: User_ProfileUpdateInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateuser_profileCollection: { __typename?: 'user_profileUpdateResponse', affectedCount: number } };

export type ListPhysicalActivityLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPhysicalActivityLevelsQuery = { __typename?: 'Query', physical_activity_levelCollection?: { __typename?: 'physical_activity_levelConnection', edges: Array<{ __typename?: 'physical_activity_levelEdge', node: { __typename?: 'physical_activity_level', id: UUID, name: string, description: string, multiplier: number } }> } | null };

export type InsertItemMutationVariables = Exact<{
  item: ItemInsertInput;
}>;


export type InsertItemMutation = { __typename?: 'Mutation', insertIntoitemCollection?: { __typename?: 'itemInsertResponse', affectedCount: number } | null };

export type ServingFragment = { __typename?: 'serving', id: UUID, item_id: UUID, name: string, plural: string, protein_grams: number, fat_grams: number, carb_grams: number };

export type ItemFragment = { __typename?: 'item', id: UUID, name: string, servingCollection?: { __typename?: 'servingConnection', edges: Array<{ __typename?: 'servingEdge', node: { __typename?: 'serving', id: UUID, item_id: UUID, name: string, plural: string, protein_grams: number, fat_grams: number, carb_grams: number } }> } | null };

export type PhysicalActivityLevelFragment = { __typename?: 'physical_activity_level', id: UUID, name: string, description: string, multiplier: number };

export type MacroTargetFragment = { __typename?: 'macro_target', id: UUID, protein_percentage: number, fat_percentage: number, carb_percentage: number };

export type UserProfileFragment = { __typename?: 'user_profile', nodeId: string, id: UUID, created_at: any, updated_at: any, user_id: UUID, username?: string | null, display_name?: string | null, avatar_url?: string | null, date_of_birth?: Date | null, weight_in_grams?: number | null, height_in_cm?: number | null, amount_of_surplus_calories?: number | null, physical_activity_level_id?: UUID | null, physical_activity_level?: { __typename?: 'physical_activity_level', id: UUID, name: string, description: string, multiplier: number } | null, macro_target?: { __typename?: 'macro_target', id: UUID, protein_percentage: number, fat_percentage: number, carb_percentage: number } | null };

export const ServingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Serving"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"serving"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plural"}},{"kind":"Field","name":{"kind":"Name","value":"protein_grams"}},{"kind":"Field","name":{"kind":"Name","value":"fat_grams"}},{"kind":"Field","name":{"kind":"Name","value":"carb_grams"}}]}}]} as unknown as DocumentNode<ServingFragment, unknown>;
export const ItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Item"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servingCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Serving"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Serving"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"serving"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plural"}},{"kind":"Field","name":{"kind":"Name","value":"protein_grams"}},{"kind":"Field","name":{"kind":"Name","value":"fat_grams"}},{"kind":"Field","name":{"kind":"Name","value":"carb_grams"}}]}}]} as unknown as DocumentNode<ItemFragment, unknown>;
export const PhysicalActivityLevelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhysicalActivityLevel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"physical_activity_level"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}}]}}]} as unknown as DocumentNode<PhysicalActivityLevelFragment, unknown>;
export const MacroTargetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MacroTarget"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"macro_target"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"protein_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"fat_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"carb_percentage"}}]}}]} as unknown as DocumentNode<MacroTargetFragment, unknown>;
export const UserProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user_profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"weight_in_grams"}},{"kind":"Field","name":{"kind":"Name","value":"height_in_cm"}},{"kind":"Field","name":{"kind":"Name","value":"amount_of_surplus_calories"}},{"kind":"Field","name":{"kind":"Name","value":"physical_activity_level_id"}},{"kind":"Field","name":{"kind":"Name","value":"physical_activity_level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhysicalActivityLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"macro_target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MacroTarget"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhysicalActivityLevel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"physical_activity_level"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MacroTarget"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"macro_target"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"protein_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"fat_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"carb_percentage"}}]}}]} as unknown as DocumentNode<UserProfileFragment, unknown>;
export const ItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Item"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Serving"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"serving"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plural"}},{"kind":"Field","name":{"kind":"Name","value":"protein_grams"}},{"kind":"Field","name":{"kind":"Name","value":"fat_grams"}},{"kind":"Field","name":{"kind":"Name","value":"carb_grams"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Item"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servingCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Serving"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ItemsQuery, ItemsQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_profileCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfile"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhysicalActivityLevel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"physical_activity_level"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MacroTarget"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"macro_target"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"protein_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"fat_percentage"}},{"kind":"Field","name":{"kind":"Name","value":"carb_percentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user_profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"weight_in_grams"}},{"kind":"Field","name":{"kind":"Name","value":"height_in_cm"}},{"kind":"Field","name":{"kind":"Name","value":"amount_of_surplus_calories"}},{"kind":"Field","name":{"kind":"Name","value":"physical_activity_level_id"}},{"kind":"Field","name":{"kind":"Name","value":"physical_activity_level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhysicalActivityLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"macro_target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MacroTarget"}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"user_profileUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateuser_profileCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const ListPhysicalActivityLevelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPhysicalActivityLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"physical_activity_levelCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhysicalActivityLevel"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhysicalActivityLevel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"physical_activity_level"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}}]}}]} as unknown as DocumentNode<ListPhysicalActivityLevelsQuery, ListPhysicalActivityLevelsQueryVariables>;
export const InsertItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"itemInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoitemCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"item"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<InsertItemMutation, InsertItemMutationVariables>;