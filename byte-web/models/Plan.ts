import { DocumentReference } from "@firebase/firestore";
import {Meal} from "./Meal";

export interface Plan {
  firebaseRef: DocumentReference;
  name: string;
  meals: [Meal];
}
