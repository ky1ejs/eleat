import { DocumentReference, getDoc } from "firebase/firestore";
import { Plan, ShoppingListItem } from "@models";
import { itemFromSnapshot, planFromSnapshot } from "@db";

export async function getAndGenerateShoppingListForPlans(
  planRefs: DocumentReference[]
): Promise<ShoppingListItem[]> {
  const refsAndPlans = new Map<string, {count: number; plan: Plan}>();
  for (const ref of planRefs) {
    const existingPlan = refsAndPlans.get(ref.id);
    console.log(ref.id);
    if (existingPlan) {
      existingPlan.count += 1;
    } else {
      const snapshot = await getDoc(ref);
      refsAndPlans.set(ref.id, {
        count: 1,
        plan: planFromSnapshot(snapshot)
      });
    }
  }
  const plans = Array.from(refsAndPlans.values())
    .map((planCount) => {
      const repeatedPlans = new Array<Plan>();
      for (let i = 0; i < planCount.count; i++) {
        repeatedPlans.push(planCount.plan);
      }
      return repeatedPlans;
    })
    .flat();
  const list = await generateShoppingListForPlans(plans);
  return Array.from(list.values());
}

export async function generateShoppingListForPlan(
  plan: Plan
): Promise<Map<string, ShoppingListItem>> {
  const list = new Map<string, ShoppingListItem>();
  for (const meal of plan.meals) {
    for (const serving of meal.servings) {
      const id = serving.item_ref.id;
      const item = list.get(id);
      if (item) {
        item.grams += serving.grams;
      } else {
        const data = await getDoc(serving.item_ref);
        const item = itemFromSnapshot(data);
        list.set(id, {item: item, grams: serving.grams});
      }
    }
  }
  return list;
}

export async function generateShoppingListForPlans(
  plans: Plan[]
): Promise<Map<string, ShoppingListItem>> {
  const list = new Map<string, ShoppingListItem>();
  for (const plan of plans) {
    const planList = await generateShoppingListForPlan(plan);
    planList.forEach((value, key) => {
      const item = list.get(key);
      if (item) {
        item.grams += value.grams;
      } else {
        list.set(key, value);
      }
    });
  }
  return list;
}
