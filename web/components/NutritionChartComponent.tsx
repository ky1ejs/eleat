import React from 'react'
import { Nutrition, MacroNutrientConsumptionTargets } from '@models';
import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';

export interface ChartData {
  name: string,
  plan: number,
  target: number,
  diff: number
}

export interface NutritionChartData {
  macroData: ChartData[], 
  calorieData: ChartData[]
}

export const NutritionChartComponent = ({macroData, calorieData}: NutritionChartData) => (
  <div>
    <BarChart width={730} height={250} data={macroData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="plan" fill="#8884d8" />
      <Bar dataKey="target" fill="#82ca9d" />
    </BarChart>
    <BarChart width={730} height={250} data={calorieData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="plan" fill="#8884d8" />
      <Bar dataKey="target" fill="#82ca9d" />
    </BarChart>
  </div>
)

export function buildMacroChartData(nutrition: Nutrition, targets: MacroNutrientConsumptionTargets): ChartData[] {
  return [
    {
      name: "Protein",
      plan: Math.round(nutrition.protein),
      target: Math.round(targets.protein_in_grams),
      diff: Math.round(targets.protein_in_grams - nutrition.protein)
    },
    {
      name: "Carbs",
      plan: Math.round(nutrition.carbs),
      target: Math.round(targets.carbs_in_grams),
      diff: Math.round(targets.carbs_in_grams - nutrition.carbs)
    },
    {
      name: "Fat",
      plan: Math.round(nutrition.fat),
      target: Math.round(targets.fat_in_grams),
      diff: Math.round(targets.fat_in_grams - nutrition.fat)
    }
  ];
}

export function buildCalorieChartData(nutrition: Nutrition, targets: MacroNutrientConsumptionTargets): ChartData[] {
  return [
    {
      name: "Calories",
      plan: Math.round(nutrition.cals),
      target: Math.round(targets.cals),
      diff: Math.round(targets.cals - nutrition.cals)
    }
  ];
}
