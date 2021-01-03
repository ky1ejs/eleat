import {Plan} from "./Plan";
import {Serving} from "./Serving";
import {itemFromSnapshot} from "./Item";

export interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
  cals: number;
}

export async function calculateNutritionForPlan(plan: Plan): Promise<Nutrition> {
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let cals = 0;

  for (let mealIndex = 0; mealIndex < plan.meals.length; mealIndex++) {
    const meal = plan.meals[mealIndex];
    for (let servingIndex = 0; servingIndex < meal.servings.length; servingIndex++) {
      const nutrition = await calculateNutritionForServing(meal.servings[servingIndex]);
      protein += nutrition.protein;
      carbs += nutrition.carbs;
      fat += nutrition.fat;
      cals += nutrition.cals;
    }
  }

  return {protein, carbs, fat, cals};
}

export async function calculateNutritionForServing(serving: Serving): Promise<Nutrition> {
  const itemData = await serving.item_ref.get();
  const item = itemFromSnapshot(itemData);
  const protein = item.protein_per_gram * serving.grams;
  const carbs = item.carbs_per_gram * serving.grams;
  const fat = item.fat_per_gram * serving.grams;

  const cals = protein * 4 + carbs * 4 + fat * 9;

  return {protein, carbs, fat, cals};
}
