import { addDoc, collection, DocumentSnapshot, getFirestore, updateDoc } from "@firebase/firestore";
import { Item, NewItem } from "@models";
import { firebaseApp } from "./firebase";

export function itemFromSnapshot(snapshot: DocumentSnapshot): Item {
  const data = snapshot.data();
  if (data) {
    return {
      firestoreRef: snapshot.ref,
      name: data.name,
      measure_name: data.measure_name,
      protein_per_gram: data.protein_per_gram,
      fat_per_gram: data.fat_per_gram,
      carbs_per_gram: data.carbs_per_gram
    };
  } else {
    throw new Error("Where's the data mate?");
  }
}

export async function saveItem(item: Item) {
  const itemData: Partial<Item> = {...item};
  delete itemData.firestoreRef;
  await updateDoc(item.firestoreRef, itemData);
}

export async function saveNewItem(item: NewItem) {
  const db = getFirestore(firebaseApp)
  await addDoc(collection(db, "items"), item)
}
