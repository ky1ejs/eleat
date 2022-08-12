import { collection, CollectionReference, DocumentData, DocumentSnapshot, FirestoreDataConverter, getFirestore, QueryDocumentSnapshot, SnapshotOptions, updateDoc } from "@firebase/firestore";
import { Recipe } from "@models";
import { firebaseApp } from "./firebase";

export function recipeFromSnapshot(snapshot: DocumentSnapshot): Recipe {
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

export const recipeFirestoreCoder: FirestoreDataConverter<Recipe> = {
  toFirestore: (recipe: Recipe) => {
    const v = validateRecipeFields(recipe)
    return {
      name: recipe.name,
      ingredients: recipe.ingredients,
      ...v.isMethodValid && {method: recipe.method},
    }
  },
  fromFirestore: recipeFromSnapshot
}

const validateRecipeFields = (recipe: Recipe) => {
  return {
    isMethodValid: recipe.method && recipe.method.length > 0
  }
}

export async function saveRecipe(recipe: Recipe) {
  await updateDoc(recipe.firebaseRef.withConverter(recipeFirestoreCoder), recipe)
}

export function recipesForUser(userId: string): CollectionReference {
  const db = getFirestore(firebaseApp)
  return collection(db, "users", userId, "recipes");
}
