import { itemFromSnapshot } from "@db";
import { getDoc } from "@firebase/firestore";
import { Item, Nutrition, Serving } from "@models";

export async function calculateNutritionForServing(serving: Serving): Promise<Nutrition> {
  const data = await getDoc(serving.item_ref)
  const item = itemFromSnapshot(data);
  return calculateNutritionForItemAndServing(item, serving)
}

export function calculateNutritionForItemAndServing(item: Item, serving: Serving): Nutrition {
  const CALS_PER_GRAM_PROTEIN = 4
  const CALS_PER_GRAM_CARBS = 4
  const CALS_PER_GRAM_FAT = 9;

  const proteinGrams = item.protein_per_gram * serving.grams
  const fatGrams = item.fat_per_gram * serving.grams 
  const carbsGrams = item.carbs_per_gram * serving.grams

  return {
    protein: proteinGrams, 
    fat: fatGrams,
    carbs: carbsGrams,
    cals: proteinGrams * CALS_PER_GRAM_PROTEIN + carbsGrams * CALS_PER_GRAM_CARBS + fatGrams * CALS_PER_GRAM_FAT
  }
}
