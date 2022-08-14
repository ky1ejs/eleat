import React, {useEffect, useState} from "react";
import { NextPage } from "next";
import { ItemRowComponent } from "@components";
import {Item} from '@models';
import {firebaseApp, itemFromSnapshot} from "@db";
import {collection, onSnapshot, getFirestore, QuerySnapshot} from 'firebase/firestore'
import { Button, ButtonToolbar, Modal, Table } from "react-bootstrap";

const Items: NextPage = () => {
  const db = getFirestore(firebaseApp)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  const handleSnapshot = (querySnapshot: QuerySnapshot) => {
    setItems(querySnapshot.docs.map(itemFromSnapshot));
  };

  useEffect(() => {
    return onSnapshot(collection(db, "items"), handleSnapshot);
  })

  return (
    <>
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
        {items.map((i) => <ItemRowComponent includeSaveButton key={i.firestoreRef.id} item={i} />)}
      </tbody>
    </Table>
    </>
  );
}

export default Items;
