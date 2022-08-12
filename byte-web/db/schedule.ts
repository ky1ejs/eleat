import { collection, CollectionReference, DocumentData, DocumentSnapshot, FirestoreDataConverter, getFirestore, QueryDocumentSnapshot, QuerySnapshot, SnapshotOptions, updateDoc } from "firebase/firestore";
import { Schedule } from "@models";
import { firebaseApp } from "./firebase";

export function schedulesForUser(uid: string): CollectionReference {
  const db = getFirestore(firebaseApp)
  return collection(db, "users", uid, "schedules").withConverter(scheduleFirebaseCoder)
}

export async function saveSchedule(schecule: Schedule) {
  const scheduleData: Partial<Schedule> = {...schecule};
  delete scheduleData.firebaseRef;
  await updateDoc(schecule.firebaseRef, scheduleData);
}

export const scheduleFirebaseCoder: FirestoreDataConverter<Schedule> = {
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions) => {
    const data = snapshot.data(options)
      if (data) {
        const plans = data.plans || [];
        return {
          firebaseRef: snapshot.ref,
          name: data.name,
          plans: plans
        };
      } else {
        throw new Error("Where's the data mate?");
      }
  },
  toFirestore: (schedule: Schedule) => {
      const data: Partial<Schedule> = {...schedule};
      delete data.firebaseRef;
      return data
  }
}
