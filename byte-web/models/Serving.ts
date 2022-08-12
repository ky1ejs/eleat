import { DocumentReference } from "@firebase/firestore";
import { Item } from "./Item";

export interface Serving {
  item_ref: DocumentReference;
  grams: number;
}

export interface NewServing {
  item: Item;
  grams: number;
}
