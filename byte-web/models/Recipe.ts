
import { DocumentReference } from "@firebase/firestore";
import { Serving } from "@models";

export interface Recipe {
  firebaseRef: DocumentReference;
  name: string;
  method: string;
  ingredients: Serving[];
}
