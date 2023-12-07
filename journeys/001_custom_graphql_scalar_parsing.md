# Custom GraphQL Scalar Parsing

## Intro

Some scalars, such as `Date`, are transformed to other types (_e.g. `string`, in this case_) for sending over the wire. When they're received by the client, you need to parse them into the desired model at the request site. 

This is not ideal because you have to pepper your codebase with tranform calls to map the serialized type to the desired type (e.g. `string` -> `Date`).

Ideally, we'd be able to configure our GraphQL client stack to use given resolvers/mappers and have it run them when a trip is received that needs to be resolved.

_TL;DR; I explored three ways of do this. Two of them didn't work out and one did, but it's too cumbersome._

[This blog](https://patrickdesjardins.com/blog/typescript-codegen-graphql-custom-scalar) post does a great job of summarising the problem.

## 1. Using URQL

On my recent project, I've been using URQL because at the time of moving it to NextJS 13 earlier this year, URQL was the only library I could find that supported `ServerComponent` and `ClientComponent` in React 18 / NextJS 13.

I had a chat with GitHub Copilot chat, asking how I could resolve types like Date on the client with URQL. It said:

> To write an exchange in URQL that parses/resolves scalars to custom types such as Date, you can follow these steps:
>
> Import the necessary modules from 'urql' and 'graphql'.Define your custom scalar, for example, a Date scalar. Create a new exchange function that checks if the operation is a query or mutation. If it is, traverse the response and replace any instances of your custom scalar with the parsed value. Finally, use this new exchange in your URQL client.
>
> Here's an example:
```typescript
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
```
>
> Remember to replace parseScalars with your own function that traverses the response and replaces instances of your custom scalar.

### Verdict 
I mainly dislike this approach for a few reasons, including having a new dep called `wonka` and it using observables to get the job done, but ultimately I didn't want to have to write and maintain the `parseScalars` function.

## 2. Scalar transformation library for URQL

I found [this package](https://github.com/clentfort/urql-custom-scalars-exchange) as another potential solution with URQL via this Google route: 
1. Googled: "urql parse date client"
1. https://github.com/urql-graphql/urql/issues/473#issuecomment-675403870
1. https://www.npmjs.com/package/urql-custom-scalars-exchange
1. https://github.com/clentfort/urql-custom-scalars-exchange

The problem I had with this solution was that the repo had not been updated in over a year. I don't want to be dependent on something that'll get out of date with the rest of URQL and the ecosystem (NextJS, React etc.)

## 3. Switch to Apollo and use `graphql-typescript-scalar-type-policies`

### Summary
Most of my Google searches for ways to resolve/deserialze types as part of the GraphQL call led me to Apollo.

`graphql-typescript-scalar-type-policies` is a package that allows you to use an Apollo API to resolves scalars in the Apollo's `InMemoryCache`.

Example is in [the package repo](https://github.com/homebound-team/graphql-typescript-scalar-type-policies).

### The problem

The problem with this has been that I couldn't figure out a way to write a `FieldPolicy` without getting a type error. Specifically, the `merge` function, that's exemplified in the `graphql-typescript-scalar-type-policies` docs, expects you to always return a `Date`, but gives you an optional input string :/. This of course makes no sense....

### How I found it

* Google Search: "apollo parse date client"
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

## 4. Use Apollo with `apollo-link-scalars`

Another package to use with Apollo to solve the issue, this time using the Link API of Apollo Client.

This looked to be my favorite since it used first party approaches to resolving types and allowed me to easily integrate `graphql-scalars`, a package that provides serialize/deserialze functions for many popular types (e.g. `Date`, `DateTime` and [many many more.](https://the-guild.dev/graphql/scalars/docs/scalars/account-number))

### Verdict

The problem with this package was that in order for the resolvers to work, the ["introspection" `graphql-codegen` plugin](https://the-guild.dev/graphql/codegen/plugins/other/introspection`) needs to be run. I suppose this is how `apollo-link-scalars` finds the types and knows when to transform given fields.

The introspection plugin generates a json file describing the schema. This file needs to be imported by your app and passed to the Apollo Client along with the resolvers, like so (notice `introspectionResult`):

```typescript
import introspectionResult from "./../gql/schema.json";

function makeClient(accessToken: string | undefined = undefined) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`,
    headers: getHeaders(accessToken),
  });

  const typesMap = {
    Date: DateResolver,
  };

  const schema = buildClientSchema(
    introspectionResult as unknown as IntrospectionQuery,
  );

  const linkWithScalarResolvers = ApolloLink.from([
    withScalars({ schema, typesMap }) as unknown as ApolloLink,
    httpLink,
  ]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: linkWithScalarResolvers,
  });
}
```

My app is and schema is only in its early days, but even then the `schema.json` reached 280kb (134kb minified, 7kb gzipped).

7kb isn't too crazy, but it just gets me that my schema will grow a lot from here and this file will grow with it...


### How I found it
1. Google: "apollo field policy string to date"
1. https://stackoverflow.com/a/66093807/3053366
1. https://github.com/eturino/apollo-link-scalars


## Final Descision
In the end it turns out that for the field I've been working with (a date field) I need it represented as a string at times for handing in forms.

For now I'm going to not do any scalar resolution and may refer back to option 4. if I need to... but as I said, as my schema matures, this might not be a viable options.

## Further Reading

Some information The Guild on Custom Scalars and Enums, but it seems quite backend centric:
https://the-guild.dev/graphql/tools/docs/scalars#using-a-package

https://the-guild.dev/graphql/scalars/docs

