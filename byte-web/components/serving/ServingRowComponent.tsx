import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Item, Serving} from "@models";
import { DocumentSnapshot, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseApp, itemFromSnapshot} from "@db";
import { calculateNutritionForItemAndServing } from "@byte";

interface ServingComponentProps {
  serving: Serving, 
  onDelete: () => void
}

export function ServingRowComponent({serving, onDelete}: ServingComponentProps) {
  const db = getFirestore(firebaseApp)
  const [item, setItem] = useState<Item | undefined>()

  const onItemUpdate = (doc: DocumentSnapshot) => {
    setItem(itemFromSnapshot(doc));
  };

  useEffect(() => {
      return onSnapshot(serving.item_ref, onItemUpdate)
  })

  if (!item) return null;

  const nutrition = calculateNutritionForItemAndServing(item, serving)

  return (
    <tr>
      <td>{item.name}</td>
      <td><Form.Control type="text" defaultValue={String(serving.grams)} /></td>
      <td>{Math.round(nutrition.protein)}g</td>
      <td>{Math.round(nutrition.fat)}g</td>
      <td>{Math.round(nutrition.carbs)}g</td>
      <td>{Math.round(nutrition.cals)} kCal</td>
      <td><Button onClick={onDelete}>Delete</Button></td>
    </tr>
  )
}
