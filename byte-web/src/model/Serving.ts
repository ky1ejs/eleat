import firebase from "../firebase";

export interface Serving {
  item_ref: firebase.firestore.DocumentReference;
  grams: number;
}
