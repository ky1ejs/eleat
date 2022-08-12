import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, updateDoc } from "@firebase/firestore";
import { Activity, User } from "@models";

export async function saveUser(user: User) {
  await updateDoc(user.firebase_ref.withConverter(userFirestoreCoder), user)
}

export const userFirestoreCoder: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => {
    const v = validateUserFields(user)
    return {
      ...v.usernameIsValid && {username: user.username},
      ...v.heightIsValid && {height_in_milimeters: user.height_in_milimeters},
      ...v.weightIsValid && {weight_in_grams: user.weight_in_grams},
      ...v.dobIsValid && {dob: user.dob},
      ...v.sexIsValid && {sex: user.sex},
      ...v.isCaloricSurplusValid && {caloric_surplus: user.caloric_surplus},
      ...v.isMacroNutrientTargetValid && {macro_target: user.macros_target},
      ...v.isActivityValid && {activity: user.activity?.id}
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions) => {
    const data = snapshot.data(options);
    const user: User = { 
      ...data, 
      activity: Activity.VALUES.get(data.activity), 
      firebase_ref: snapshot.ref 
    }
    return user
  }
}

const validateUserFields = (user: User) => {
  const m = user.macros_target
  const isMacroNutrientTargetValid = m && 
    m.carb_percentage > 0 &&
    m.carb_percentage < 1 &&
    m.protein_percentage > 0 &&
    m.protein_percentage < 1 &&
    m.fat_percentage > 0 &&
    m.fat_percentage < 1 &&
    m.fat_percentage + m.protein_percentage + m.carb_percentage === 1

  return {
    usernameIsValid: user.username && user.username.length > 0,
    heightIsValid: user.height_in_milimeters && user.height_in_milimeters > 0,
    weightIsValid: user.weight_in_grams && user.weight_in_grams > 0,
    dobIsValid: user.dob !== undefined,
    sexIsValid: user.sex !== undefined,
    isCaloricSurplusValid: user.caloric_surplus && user.caloric_surplus > 0,
    isMacroNutrientTargetValid,
    isActivityValid: user.activity !== undefined
  }
}
