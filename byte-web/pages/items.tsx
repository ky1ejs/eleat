import React, {useEffect, useState} from "react";
import { NextPage } from "next";
import { ItemComponent } from "@components";
import {Item} from '@models';
import {firebaseApp, itemFromSnapshot} from "@db";
import {collection, onSnapshot, getFirestore, QuerySnapshot} from 'firebase/firestore'

const Items: NextPage = () => {
  const db = getFirestore(firebaseApp)
  const [items, setItems] = useState<Item[]>([])

  const handleSnapshot = (querySnapshot: QuerySnapshot) => {
    setItems(querySnapshot.docs.map(itemFromSnapshot));
  };

  useEffect(() => {
    return onSnapshot(collection(db, "items"), handleSnapshot);
  })

  return (
    <div>
      {items.map((i) => <ItemComponent key={i.firestoreRef.id} item={i} />)}
      <ItemComponent key="new" />
    </div>
  );
}

export default Items;
