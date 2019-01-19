import { Plan } from './Plan'
import { Serving } from './Serving'
import { itemFromSnapshot } from './Item'

export interface Nutrition {
  protein: number,
  carbs: number,
  fat: number,
  cals: number
}

export async function calculateNutritionForPlan(plan: Plan): Promise<Nutrition> {
  var protein = 0
  var carbs = 0
  var fat = 0
  var cals = 0

  for (var mealIndex = 0; mealIndex < plan.meals.length; mealIndex++) {
    let meal = plan.meals[mealIndex]
    for (var servingIndex = 0; servingIndex < meal.servings.length; servingIndex++) {
      let nutrition = await calculateNutritionForServing(meal.servings[servingIndex])
      protein += nutrition.protein
      carbs += nutrition.carbs
      fat += nutrition.fat
      cals += nutrition.cals
    }
  }

  return { protein, carbs, fat, cals }
}

export async function calculateNutritionForServing(serving: Serving): Promise<Nutrition> {
  let itemData = await serving.item_ref.get()
  let item = itemFromSnapshot(itemData)
  let protein = item.protein_per_gram * serving.grams
  let carbs = item.carbs_per_gram * serving.grams
  let fat = item.fat_per_gram * serving.grams

  let cals = protein * 4 + carbs * 4 + fat * 9

  return { protein, carbs, fat, cals }
}