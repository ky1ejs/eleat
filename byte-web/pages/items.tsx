import React, {useState} from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { ItemRowComponent } from "@components";
import { Button, ButtonToolbar, Modal, Table } from "react-bootstrap";
import {graphql} from "../graphql/gql/gql"
import {useQuery} from "urql"
import { withUrqlClient } from "next-urql";
import { createServerSideClient } from "graphql/urql/initUrqlClient";

const ITEMS = graphql(`
    query Items {
      itemsCollection {
        edges {
          node {
            ...Item
          }
        }
      }
    }
`)

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {client, ssrCache} = await createServerSideClient(ctx)
  const result = await client.query(ITEMS, {}).toPromise();

  if (result.error) throw new Error("Error when fetching items: " + result.error.toString());

  return {
    props: {
      urqlState: ssrCache.extractData(),
    }
  };
}

const Items: NextPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [result] = useQuery({query: ITEMS})
  
  return (
    <div>
    <ButtonToolbar>
      <Button onClick={() => setShowCreateModal(true)}>Create New Item</Button>
    </ButtonToolbar>
    <Modal size="lg" scrollable centered show={showCreateModal} onHide={() => setShowCreateModal(false)}>
      <Modal.Header><Modal.Title>Create New Item</Modal.Title></Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Measurement</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            <ItemRowComponent includeSaveButton={false}/>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer><Button>Save</Button></Modal.Footer>
    </Modal>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Measurement</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Carbs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {result.data?.itemsCollection?.edges?.map(({node: item}) => <ItemRowComponent includeSaveButton key={item.id} item={item} />)}
      </tbody>
    </Table>
    </div>
  );
}

export default withUrqlClient(ssr => ({
  url: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`,
  exchanges: [ssr]
}))(Items);