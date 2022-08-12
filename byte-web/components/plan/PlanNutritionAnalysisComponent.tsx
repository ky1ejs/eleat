import { Nutrition, Plan, User } from '@models';
import { calculateNutritionForPlan, calculateUsersMacroTargets } from '@byte';
import React, { useState } from 'react'
import { buildCalorieChartData, NutritionChartComponent } from '../NutritionChartComponent';
import { NutritionInfoTable } from '../NutritionInfoTable';


export function PlanNutritionAnalysisComponent({plan, user}: {plan: Plan, user?: User}) {
  const [nutrition, setNutrition] = useState<Nutrition | undefined>()

  calculateNutritionForPlan(plan).then((nutrition) => {
    setNutrition(nutrition);
  });

  if (!nutrition) return null;

  if (!user) return (
    <div>
      <h4>Protein: {Math.round(nutrition.protein)}g</h4>
      <h4>Carb: {Math.round(nutrition.carbs)}g</h4>
      <h4>Fat: {Math.round(nutrition.fat)}g</h4>
      <h4>Cals: {Math.round(nutrition.cals)}kCal</h4>
    </div>
  )

  const targets = calculateUsersMacroTargets(user, true)
  const macroData = buildCalorieChartData(nutrition, targets)
  const calorieData = buildCalorieChartData(nutrition, targets)

  return (
    <div>
      <NutritionInfoTable macroData={macroData} calorieData={calorieData}/>
      <NutritionChartComponent macroData={macroData} calorieData={calorieData} />
    </div>
  )
}







