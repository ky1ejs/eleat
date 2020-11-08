import {Plan} from "./Plan";
import {Item, itemFromSnapshot} from "./Item";

export interface ShoppingListItem {
  item: Item;
  grams: number;
}
export async function generateShoppingListForPlan(
  plan: Plan
): Promise<Map<string, ShoppingListItem>> {
  var list = new Map<string, ShoppingListItem>();
  for (const meal of plan.meals) {
    for (const serving of meal.servings) {
      let id = serving.item_ref.id;
      let item = list.get(id);
      if (item) {
        item.grams += serving.grams;
      } else {
        let data = await serving.item_ref.get();
        let item = itemFromSnapshot(data);
        list.set(id, {item: item, grams: serving.grams});
      }
    }
  }
  return list;
}

export async function generateShoppingListForPlans(
  plans: Plan[]
): Promise<Map<string, ShoppingListItem>> {
  var list = new Map<string, ShoppingListItem>();
  for (const plan of plans) {
    let planList = await generateShoppingListForPlan(plan);
    planList.forEach((value, key) => {
      let item = list.get(key);
      if (item) {
        item.grams += value.grams;
      } else {
        list.set(key, value);
      }
    });
  }
  return list;
}
