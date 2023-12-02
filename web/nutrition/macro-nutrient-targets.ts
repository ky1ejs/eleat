import { calculateBmr } from "./bmr";
import { UserProfileFragment } from "@/graphql/gql/graphql";

export interface MacroNutrientConsumptionTargets {
  carbs_in_grams: number;
  protein_in_grams: number;
  fat_in_grams: number;
  cals: number;
}

export function calculateUsersMacroTargets(
  user: UserProfileFragment,
  factorInTheirActivity: boolean,
): MacroNutrientConsumptionTargets {
  if (!user.macro_target) {
    return emptyTargets();
  }

  const bmrAmount = calculateBmr(user, factorInTheirActivity);
  if (bmrAmount <= 0) {
    return emptyTargets();
  }

  const surplus = user.amount_of_surplus_calories || 0;
  const target = bmrAmount + surplus;
  return {
    carbs_in_grams: (target * user.macro_target.carb_percentage) / 4,
    protein_in_grams: (target * user.macro_target.protein_percentage) / 4,
    fat_in_grams: (target * user.macro_target.fat_percentage) / 9,
    cals: target,
  };
}

function emptyTargets(): MacroNutrientConsumptionTargets {
  return {
    carbs_in_grams: 0,
    protein_in_grams: 0,
    fat_in_grams: 0,
    cals: 0,
  };
}
