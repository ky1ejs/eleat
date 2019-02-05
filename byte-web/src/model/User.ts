import firebase from '../firebase'

export enum Sex {
  Male = 'male',
  Female = 'female'
}

export interface User {
  firebase_ref: firebase.firestore.DocumentReference,
  username?: string
  dob?: firebase.firestore.Timestamp,
  height_in_milimeters?: number,
  weight_in_grams?: number,
  sex?: Sex
}

export function saveUser(user: User) {
  let ref = user.firebase_ref
  delete user.firebase_ref
  if (!user.height_in_milimeters || user.height_in_milimeters <= 0 ) { delete user.height_in_milimeters }
  if (!user.weight_in_grams || user.weight_in_grams <= 0 ) { delete user.weight_in_grams }
  if (!user.dob) { delete user.dob }
  if (!user.sex) { delete user.sex }
  ref.set(user)
  user.firebase_ref = ref
}

export function userFromSnaption(snapshot: firebase.firestore.DocumentSnapshot): User {
  let data = snapshot.data()
  if (data) {
    var user: User = { ...data, firebase_ref: snapshot.ref }
    return user
  } else {
    throw new Error('Where\'s the data mate?')
  }
}

export function bmr(user: User): Number {
  if (!user.dob) { return 0}
  if (!user.weight_in_grams) { return 0 }
  if (!user.height_in_milimeters) { return 0 }
  var diff = Math.abs(user.dob.toDate().getTime() - (new Date()).getTime())
  var years = Math.ceil(diff / (1000 * 3600 * 24 * 365))
  return (user.weight_in_grams / 1000) * 10 + (user.height_in_milimeters / 100) * 6.25 - years * 5 + 5
}