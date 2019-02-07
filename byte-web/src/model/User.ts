import firebase from '../firebase'

export enum Sex {
  Male = 'male',
  Female = 'female'
}

interface MacroTargets {
  fat_percentage: number,
  carb_percentage: number,
  protein_percentage: number
}

export interface User {
  firebase_ref: firebase.firestore.DocumentReference,
  username?: string,
  dob?: firebase.firestore.Timestamp,
  height_in_milimeters?: number,
  weight_in_grams?: number,
  sex?: Sex,
  caloric_surplus?: number,
  macros_target?: MacroTargets,
  activity?: Activity
}

export function saveUser(user: User) {
  let ref = user.firebase_ref
  delete user.firebase_ref
  if (!user.height_in_milimeters || user.height_in_milimeters <= 0 ) { delete user.height_in_milimeters }
  if (!user.weight_in_grams || user.weight_in_grams <= 0 ) { delete user.weight_in_grams }
  if (!user.dob) { delete user.dob }
  if (!user.sex) { delete user.sex }
  if (!user.caloric_surplus || user.caloric_surplus <= 0) {
    delete user.caloric_surplus
  }
  if (!user.macros_target ||
      user.macros_target.carb_percentage < 0 || user.macros_target.carb_percentage > 1 ||
      user.macros_target.protein_percentage < 0 || user.macros_target.protein_percentage > 1 ||
      user.macros_target.fat_percentage < 0 || user.macros_target.fat_percentage > 1 ||
      user.macros_target.fat_percentage +  user.macros_target.protein_percentage +  user.macros_target.carb_percentage != 1) {
        delete user.macros_target
  }
  if (!user.activity) { delete user.activity }
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

export function bmr(user: User, withActivity: Boolean): number {
  if (!user.dob) { return 0}
  if (!user.weight_in_grams) { return 0 }
  if (!user.height_in_milimeters) { return 0 }
  var diff = Math.abs(user.dob.toDate().getTime() - (new Date()).getTime())
  var years = Math.ceil(diff / (1000 * 3600 * 24 * 365))
  // Mifflin-St Jeor Equation - https://www.calculator.net/bmr-calculator.html
  var base = (user.weight_in_grams / 1000) * 10 + (user.height_in_milimeters / 100) * 6.25 - years * 5 + 5
  if (withActivity && user.activity) {
    base = base * multiplerForActivity(user.activity)
  }
  return base
}

interface MacroAmounts {
  carbs_in_grams: number,
  protein_in_grams: number,
  fat_in_grams: number
}

function emptyMacroAmounts() : MacroAmounts {
  return {
    carbs_in_grams: 0,
    protein_in_grams: 0,
    fat_in_grams: 0
  }
}

export function macroTargets(user: User, withActivity: Boolean): MacroAmounts {
  let bmrAmount = bmr(user, withActivity)
  if (bmrAmount <= 0) { return emptyMacroAmounts() }
  if (!user.macros_target) { return emptyMacroAmounts() }
  let surplus = user.caloric_surplus || 0
  let target = bmrAmount + surplus
  return {
    carbs_in_grams: target * user.macros_target.carb_percentage / 4,
    protein_in_grams: target * user.macros_target.protein_percentage / 4,
    fat_in_grams: target * user.macros_target.fat_percentage / 9
  }
}

// Sedentary = 1.2
// Lightly active = 1.375
// Moderately active = 1.550
// Very active = 1.725
// Extra active = 1.9

export enum Activity {
  sedentary = 'sedentary',
  light = 'light',
  moderate = 'moderate',
  high = 'high',
  exceptional = 'moderate'
}

export const allActivities: Activity[] = [
  Activity.sedentary,
  Activity.light,
  Activity.moderate,
  Activity.high,
  Activity.exceptional
]

function multiplerForActivity(activity: Activity): number {
  switch (activity) {
    case Activity.sedentary: return 1.2
    case Activity.light: return 1.375
    case Activity.moderate: return 1.55
    case Activity.high: return 1.725
    case Activity.exceptional: return 1.9
  }
}
