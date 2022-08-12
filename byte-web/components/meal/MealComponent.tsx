import { Meal } from "@models";
import React from "react";
import {ServingTableComponent} from "@components";

interface MealComponentProps { 
  meal: Meal,
  // meals and servings and stored on a Plan
  // so to update the DB, we need to save the Plan.
  savePlan: () => void
}

export const MealComponent = ({meal, savePlan}: MealComponentProps) => (
  <>
    <h3>{meal.name}</h3>
    <ServingTableComponent servings={meal.servings} onSave={savePlan} />
  </>
)
