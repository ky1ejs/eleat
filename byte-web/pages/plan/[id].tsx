import React, {useEffect, useState} from "react";
import {Plan,User} from "@models";
import {firebaseApp, planFromSnapshot, savePlan, userFirestoreCoder} from "@db"
import { doc, DocumentReference, getDoc, getFirestore, onSnapshot } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { NextPage } from "next";
import { NewMeal, MealComponent, PlanNutritionAnalysisComponent, NewMealForm } from "@components";

const PlanDetail: NextPage<{planRef: DocumentReference}> = ({planRef}) => {
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  const [plan, setPlan] = useState<Plan | undefined>()
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      getDoc(doc(db, "users", currentUser.uid).withConverter(userFirestoreCoder))
        .then((snapshot) => setUser(snapshot.data()));
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
      <PlanNutritionAnalysisComponent plan={plan} user={user} />
      {plan.meals.map((meal, index) => <MealComponent key={index} meal={meal} savePlan={() => savePlan(plan)}/>)}
      <NewMealForm onSubmit={createNewMeal} />
    </div>
  );
}

export default PlanDetail;
