import { DocumentReference } from "firebase/firestore";

export interface Schedule {
  firebaseRef: DocumentReference;
  name: string;
  plans: DocumentReference[];
}
