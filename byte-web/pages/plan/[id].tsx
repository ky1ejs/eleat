import React, {useEffect, useState} from "react";
import {Plan,UserData} from "@models";
import {firebaseApp, planFromSnapshot, savePlan, userFirestoreCoder} from "@db"
import { doc, DocumentReference, getDoc, getFirestore, onSnapshot } from "@firebase/firestore";
import { NextPage } from "next";
import { NewMeal, MealComponent, PlanNutritionAnalysisComponent, NewMealForm } from "@components";
import { useUser } from "@contexts";

const PlanDetail: NextPage<{planRef: DocumentReference}> = ({planRef}) => {
  const user = useUser()
  const db = getFirestore(firebaseApp)

  const [plan, setPlan] = useState<Plan | undefined>()
  const [userData, setUserData] = useState<UserData | undefined>()

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", user.uid).withConverter(userFirestoreCoder))
        .then((snapshot) => setUserData(snapshot.data()));
    }

    return onSnapshot(planRef, snapshot => setPlan(planFromSnapshot(snapshot)));
  })

  const createNewMeal = (newMeal: NewMeal) => {
    if (!plan || newMeal.name.length > 0) return
    plan.meals.push({name: newMeal.name, servings: []});
    savePlan(plan);
  };

  if (!plan) {
    return null
  }

  return (
    <div>
      <PlanNutritionAnalysisComponent plan={plan} userData={userData} />
      {plan.meals.map((meal, index) => <MealComponent key={index} meal={meal} savePlan={() => savePlan(plan)}/>)}
      <NewMealForm onSubmit={createNewMeal} />
    </div>
  );
}

export default PlanDetail;
