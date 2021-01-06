import firebase from 'firebase';
import { Serving } from ".";

export interface Recipe {
  firebaseRef: firebase.firestore.DocumentReference;
  name: string;
  method: string;
  ingredients: Serving[];
}

export function recipeFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Recipe {
  const data = snapshot.data();
  if (data) {
    const ingredients = data.ingredients || [];
    return {
      firebaseRef: snapshot.ref,
      name: data.name,
      method: data.method,
      ingredients: ingredients
    };
  } else {
    throw new Error("Where's the data mate?");
  }
}

export function saveRecipe(recipe: Recipe) {
  const recipeData = {...recipe};
  delete recipe.firebaseRef;
  if (!recipe.method) delete recipe.method
  recipeData.firebaseRef.set(recipe);
}

export function recipesForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase.firestore().collection("users").doc(userId).collection("recipes");
}
