import { MacroNutrientConsumptionTargets, UserData } from "@models";
import { calculateBmr } from ".";

export function calculateUsersMacroTargets(user: UserData, factorInTheirActivity: boolean): MacroNutrientConsumptionTargets {
  if (!user.macros_target) {
    return emptyTargets();
  }

  const bmrAmount = calculateBmr(user, factorInTheirActivity);
  if (bmrAmount <= 0) {
    return emptyTargets();
  }

  const surplus = user.caloric_surplus || 0;
  const target = bmrAmount + surplus;
  return {
    carbs_in_grams: (target * user.macros_target.carb_percentage) / 4,
    protein_in_grams: (target * user.macros_target.protein_percentage) / 4,
    fat_in_grams: (target * user.macros_target.fat_percentage) / 9,
    cals: target
  };
}

function emptyTargets(): MacroNutrientConsumptionTargets {
  return {
    carbs_in_grams: 0,
    protein_in_grams: 0,
    fat_in_grams: 0,
    cals: 0
  };
}
