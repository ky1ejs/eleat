import { Plan } from './Plan'

export interface ShoppingListItem {
  itemName: string,
  grams: number
}
export async function generateShoppingListForPlan(plan: Plan): Promise<Map<string, ShoppingListItem>> {
  var list = new Map<string, ShoppingListItem>()
  await plan.meals.forEach(async (meal) => {
    meal.servings.forEach(async (serving) => {
      let id = serving.item_ref.id
      let item = list.get(id)
      if (item) {
        item.grams += serving.grams
      } else {
        let doc = await serving.item_ref.get()
        list.set(id, { itemName: doc.data()!.name, grams: serving.grams })
      }
    })
  })
  return list
}

export async function generateShoppingListForPlans(plans: Plan[]): Promise<Map<string, ShoppingListItem>> {
  var list = new Map<string, ShoppingListItem>()
  await plans.forEach(async (plan) => {
    let planList = await generateShoppingListForPlan(plan)
    planList.forEach((value, key) => {
      let item = list.get(key)
      if (item) {
        item.grams += value.grams
      } else {
        list.set(key, value)
      }
    })
  })
  return list
}