import { DocumentReference } from "@firebase/firestore";

export interface Item {
  firestoreRef: DocumentReference;
  name: string;
  measure_name: string;
  protein_per_gram: number;
  fat_per_gram: number;
  carbs_per_gram: number;
}

export interface NewItem {
  name: string;
  measure_name: string;
  protein_per_gram: number;
  fat_per_gram: number;
  carbs_per_gram: number;
}
