"use client";

import NewItemModal from "@/components/NewItemModal";
import { graphql } from "@/graphql/gql";
import { ItemFragment as Item } from "@/graphql/gql/graphql";
import { useQuery } from "@urql/next";
import { PropsWithChildren, useMemo } from "react";

const ITEMS = graphql(`
  query Items {
    itemCollection {
      edges {
        node {
          ...Item
        }
      }
    }
  }
`);

export function Items() {
  const [result] = useQuery({ query: ITEMS, context: useMemo(() => ({}), []) });
  return (
    <>
      <NewItemModal trigger={<button>Open</button>} />
      <ItemTable actions>
        {result.data?.itemCollection?.edges.map(({ node: item }) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ItemTable>
    </>
  );
}

const ItemTable = ({
  children,
  actions,
}: { actions?: boolean } & PropsWithChildren) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Serving Options</th>
        {(actions ?? false) && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export function ItemRow({ item }: { item: Item }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.servingCollection?.edges.length ?? 0}</td>
    </tr>
  );
}
