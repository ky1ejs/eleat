import firebase from "../firebase";

export interface Schedule {
  firebaseRef: firebase.firestore.DocumentReference;
  name: string;
  plans: firebase.firestore.DocumentReference[];
}

export function schedulesForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase.firestore().collection("users").doc(userId).collection("schedules");
}

export function scheduleFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Schedule {
  const data = snapshot.data();
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
}

export function saveSchedule(schecule: Schedule) {
  const scheduleData = {...schecule};
  delete scheduleData.firebaseRef;
  schecule.firebaseRef.set(scheduleData);
}
