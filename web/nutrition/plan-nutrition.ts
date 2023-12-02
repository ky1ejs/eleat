export async function calculateNutritionForPlan(
  plan: Plan,
): Promise<Nutrition> {
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let cals = 0;
  for (let mealIndex = 0; mealIndex < plan.meals.length; mealIndex++) {
    const meal = plan.meals[mealIndex];
    for (
      let servingIndex = 0;
      servingIndex < meal.servings.length;
      servingIndex++
    ) {
      const nutrition = await calculateNutritionForServing(
        meal.servings[servingIndex],
      );
      protein += nutrition.protein;
      carbs += nutrition.carbs;
      fat += nutrition.fat;
      cals += nutrition.cals;
    }
  }
  return { protein, carbs, fat, cals };
}
