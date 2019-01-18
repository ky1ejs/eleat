import firebase from './firebase'

export interface Item {
  firestoreRef: firebase.firestore.DocumentReference,
  name: string,
  protein_per_gram: number,
  fat_per_gram: number,
  carbs_per_gram: number
}

export function itemFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Item {
  let data = snapshot.data()
  if (data) {
    return {
      firestoreRef: snapshot.ref,
      name: data.name,
      protein_per_gram: data.protein_per_gram,
      fat_per_gram: data.fat_per_gram,
      carbs_per_gram: data.carbs_per_gram
    }
  } else {
    throw new Error('Where\'s the data mate?')
  }
}

export interface Plan {
  firebaseRef: firebase.firestore.DocumentReference,
  name: string,
  meals: [Meal]
}

export interface Meal {
  name: string,
  servings: Serving[]
}

export function planFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Plan {
  let data = snapshot.data()
  if (data) {
    let meals = data.meals || []
    return {
      firebaseRef: snapshot.ref,
      name: data.name,
      meals: meals
    }
  } else {
    throw new Error('Where\'s the data mate?')
  }
}

export function savePlan(plan: Plan) {
  var planData = { ...plan }
  delete planData.firebaseRef
  plan.firebaseRef.set(planData)
}

export function plansForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('plans')
}

export interface Serving {
  item_ref: firebase.firestore.DocumentReference,
  grams: number
}

export interface Schedule {
  firebaseRef: firebase.firestore.DocumentReference
  name: string
  plans: firebase.firestore.DocumentReference[]
}

export function schedulesForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('schedules')
}

export function scheduleFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Schedule {
  let data = snapshot.data()
  if (data) {
    let plans = data.plans || []
    return {
      firebaseRef: snapshot.ref,
      name: data.name,
      plans: plans
    }
  } else {
    throw new Error('Where\'s the data mate?')
  }
}

export function saveSchedule(schecule: Schedule) {
  var scheduleData = { ...schecule }
  delete scheduleData.firebaseRef
  schecule.firebaseRef.set(scheduleData)
}

export interface Nutrition {
  protein: number,
  carbs: number,
  fat: number
}

export async function calculateNutritionForPlan(plan: Plan): Promise<Nutrition> {
  var protein = 0
  var carbs = 0
  var fat = 0

  for (var mealIndex = 0; mealIndex < plan.meals.length; mealIndex++) {
    let meal = plan.meals[mealIndex]
    for (var servingIndex = 0; servingIndex < meal.servings.length; servingIndex++) {
      let nutrition = await calculateNutritionForServing(meal.servings[servingIndex])
      protein += nutrition.protein
      carbs += nutrition.carbs
      fat += nutrition.fat
    }
  }

  return { protein, carbs, fat }
}

export async function calculateNutritionForServing(serving: Serving): Promise<Nutrition> {
  let itemData = await serving.item_ref.get()
  let item = itemFromSnapshot(itemData)
  let protein = item.protein_per_gram * serving.grams
  let carbs = item.carbs_per_gram * serving.grams
  let fat = item.fat_per_gram * serving.grams

  return { protein, carbs, fat }
}

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
