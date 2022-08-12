
import { DocumentReference, Timestamp } from "@firebase/firestore";
import { Activity } from "./Activity";
import { MacroNutrientPercentageTargets } from "./MacroNutrientPercentageTargets";
import { Sex } from "./Sex";

export interface User {
  firebase_ref: DocumentReference;
  username?: string;
  dob?: Timestamp;
  height_in_milimeters?: number;
  weight_in_grams?: number;
  sex?: Sex;
  caloric_surplus?: number;
  macros_target?: MacroNutrientPercentageTargets;
  activity?: Activity;
}
