# Custom GraphQL Scalar Parsing

## Intro

Some models, such as `Date`, are serialized for sending over the wire. When they're received by the client, you need to parse them into the desired model at the request site... unless you use some kind of "resolver" or "mapper".

## Why I can't continue to use URQL

To date, I've been using URQL because at the time of moving to NextJS 13 earlier this year, it was the only library I could find that supported `ServerComponent` and `ClientComponent` in React 18 / NextJS 13.

However, it's "exchanges" architecture doesn't make it very easy to do so. Here's the approach that GH Copilot gave me:

> To write an exchange in URQL that parses/resolves scalars to custom types such as Date, you can follow these steps:

> Import the necessary modules from 'urql' and 'graphql'.
> Define your custom scalar, for example, a Date scalar.
> Create a new exchange function that checks if the operation is a query or mutation.
> If it is, traverse the response and replace any instances of your custom scalar with the parsed value.
> Finally, use this new exchange in your URQL client.
> Here is a JavaScript example:
>
> ```
  import { pipe, tap } from 'wonka';
  import { Exchange, Operation } from 'urql';
  import { Kind, GraphQLError, GraphQLScalarType, ValueNode } from 'graphql';

  // Define your custom scalar
  const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client input variables
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null;
    },
  });

  // Create a new exchange
  const customScalarExchange = (): Exchange => ({ forward }) => (ops$) => {
    return pipe(
      ops$,
      forward,
      tap(({ operation, data }) => {
        if (operation.operationName === 'query' || operation.operationName === 'mutation') {
          // Traverse the response and replace any instances of your custom scalar
          const parsedData = parseScalars(data);
          operation.data = parsedData;
        }
      })
    );
  };

  // Use this new exchange in your URQL client
  const client = createClient({
    url: '/graphql',
    exchanges: [dedupExchange, cacheExchange, customScalarExchange(), fetchExchange],
  });
> ```
>
> Remember to replace parseScalars with your own function that traverses the response and replaces instances of your custom scalar.

I mainly dislike this a) isn't a first class supported solution and b) introduces a new library (`wonka`). 

ACTUALLY -- it doesn't even work since you need to write a `parseScalars` function that traverses the whole response looking for models



This other approach I found for URQL is this (found while googling: "urql parse date client"):
1. https://github.com/urql-graphql/urql/issues/473#issuecomment-675403870
2. https://patrickdesjardins.com/blog/typescript-codegen-graphql-custom-scalar

The thing about this is that it's not been updated for over a year, which concerns me.



Google path
* Search: apollo parse date client
* https://community.apollographql.com/t/is-it-possible-to-map-scalars-date-client-side/1462
* https://community.apollographql.com/t/is-it-possible-to-map-scalars-date-client-side/1462/2
* https://github.com/apollographql/apollo-feature-requests/issues/368
* Intersting messages
  * https://github.com/apollographql/apollo-feature-requests/issues/368#issuecomment-1608460456
  * https://github.com/apollographql/apollo-feature-requests/issues/368#issuecomment-1527975562
  * https://github.com/apollographql/apollo-feature-requests/issues/368#issuecomment-1527974910
* These issues were linked in the feature request 368 issue above
  * https://github.com/homebound-team/graphql-typescript-scalar-type-policies/issues/1
  * https://github.com/dotansimha/graphql-code-generator-community/issues/366
* This blog post was linked both in issue 1 of `graphql-typescript-scalar-type-policies` and apollo feature request issue 368 - https://patrickdesjardins.com/blog/typescript-codegen-graphql-custom-scalar. The message in 368 that links it: https://github.com/apollographql/apollo-feature-requests/issues/368#issuecomment-1527975562


* https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-read-function