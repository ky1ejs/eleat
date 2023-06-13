import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, getDocs, getFirestore, updateDoc } from "@firebase/firestore";
import { Plan } from "@models";
import { firebaseApp } from "./firebase";


export function plansForUser(userId: string): CollectionReference {
  const db = getFirestore(firebaseApp)
  return collection(db, "users", userId, "plans")
}

export function planFromSnapshot(snapshot: DocumentSnapshot): Plan {
  const data = snapshot.data();
  if (data) {
    const meals = data.meals || [];
    return {
      firebaseRef: snapshot.ref,
      name: data.name,
      meals: meals
    };
  } else {
    throw new Error("Where's the data mate?");
  }
}

export async function savePlan(plan: Plan) {
  const planData: Partial<Plan> = {...plan};
  delete planData.firebaseRef;
  await updateDoc(plan.firebaseRef, planData)
}
