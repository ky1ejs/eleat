import firebase from '../firebase'

export interface Item {
  firestoreRef: firebase.firestore.DocumentReference,
  name: string,
  protein_per_gram: number,
  fat_per_gram: number,
  carbs_per_gram: number
}

export function itemFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Item {
  let data = snapshot.data()
  if (data) {
    return {
      firestoreRef: snapshot.ref,
      name: data.name,
      protein_per_gram: data.protein_per_gram,
      fat_per_gram: data.fat_per_gram,
      carbs_per_gram: data.carbs_per_gram
    }
  } else {
    throw new Error('Where\'s the data mate?')
  }
}