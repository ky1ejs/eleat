import firebase from './firebase'

export interface Item {
  id: string,
  name: string,
  protein_per_gram: number,
  fat_per_gram: number,
  carbs_per_gram: number
}

export interface Plan {
  firebaseRef: firebase.firestore.DocumentReference,
  name: string,
  meals: [Meal]
}

export interface Meal {
  name: string,
  servings: Serving[]
}

export function planFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Plan {
  let data = snapshot.data()
  if (data) {
    let meals = data.meals || []
    return { 
      firebaseRef: snapshot.ref, 
      name: data.name, 
      meals: meals 
    }
  } else {
    throw new Error('Where\'s the data mate?')
  }
}

export function savePlan(plan: Plan) {
  var planData = {...plan}
  delete planData.firebaseRef
  plan.firebaseRef.set(planData)
}

function plansForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('plans')
}

export interface Serving {
  item_ref: firebase.firestore.DocumentReference,
  grams: number
}

export class Schedule {
  firebaseRef: firebase.firestore.DocumentReference
  plans: firebase.firestore.DocumentReference[]

  constructor(snapshot: firebase.firestore.DocumentSnapshot) {
    this.firebaseRef = snapshot.ref
    let data = snapshot.data()
    if (data) {
      this.plans = data.plans
    } else {
      throw new Error('Where\'s the data mate?')
    }
  }

  schedulesForUser(userId: string) {
    return firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules')
  }
}
