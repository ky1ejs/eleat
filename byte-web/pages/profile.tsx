import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { Activity, Sex, UserData } from "@models";
import { Controller, useForm } from "react-hook-form";
import { firebaseApp, saveUser, userFirestoreCoder } from "@db";
import { FormField } from "@components";
import { Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from "react-datepicker";
import { calculateUsersMacroTargets, calculateBmr } from "../byte/nutrition-analysis";
import { useUser } from "@contexts";

interface UserFormValues {
  username: string
  dob: Date
  heightInCms: number
  weightInGrams: number
  caloricSurplus: number
  proteinPercentage: number
  fatPercentage: number
  carbPercentage: number
  activity: Activity
}

const ProfilePage: NextPage = () => {
  const db = getFirestore(firebaseApp)
  const user = useUser()

  if (!user) return null

  const userRef = doc(db, "users", user.uid).withConverter(userFirestoreCoder)
  const {handleSubmit, control, reset} = useForm<UserFormValues>()
  const [userData, setUser] = useState<UserData | undefined>()

  useEffect(() => {
    return onSnapshot(userRef, snapshot => {
      setUser(snapshot.data())
    })
  })

   
  if (!userData) return null

    const updateUser = (userUpdate: UserFormValues) => {
      
    const newData: UserData = {
      firebase_ref: userRef,
      username: userUpdate.username,
      dob: Timestamp.fromDate(userUpdate.dob),
      height_in_milimeters: userUpdate.heightInCms * 100,
      weight_in_grams: userUpdate.weightInGrams * 1000,
      caloric_surplus: userUpdate.caloricSurplus,
      macros_target: {
        protein_percentage: userUpdate.proteinPercentage,
        fat_percentage: userUpdate.fatPercentage,
        carb_percentage: userUpdate.carbPercentage
      },
      activity: userUpdate.activity,
      sex: Sex.Male
    }
    
    saveUser(newData);
    }

    const defaultValues: Partial<UserFormValues> = {
      username: userData.username,
      dob: userData.dob?.toDate(),
      heightInCms: userData.height_in_milimeters && userData.height_in_milimeters / 100,
      weightInGrams: userData.weight_in_grams && userData.weight_in_grams / 1000,
      caloricSurplus: userData.caloric_surplus,
      proteinPercentage: userData.macros_target?.protein_percentage,
      fatPercentage: userData.macros_target?.fat_percentage,
      carbPercentage: userData.macros_target?.carb_percentage,
      activity: userData.activity
    }

    reset(defaultValues)

    const targerMacroAmounts = calculateUsersMacroTargets(userData, true);
    const targetCarbs = Math.round(targerMacroAmounts.carbs_in_grams);
    const targetProtein = Math.round(targerMacroAmounts.protein_in_grams);
    const targetFat = Math.round(targerMacroAmounts.fat_in_grams);
    const targetCals = calculateBmr(userData, false);
    const targetCalsWithActivity = calculateBmr(userData, true);
    const totalCals = targetCalsWithActivity + (userData.caloric_surplus || 0);

    return (
      <div>
        <Form onSubmit={handleSubmit(updateUser)}>
          <FormField control={control} name="username" isRequired={false} />
          <FormField control={control} name="height" isRequired={false} />
          <FormField control={control} name="wight" isRequired={false} />
          <h3>BMR: {targetCals}</h3>
          <Form.Group>
            <Controller
              control={control}
              name="dob"
              render={({field}) => <ReactDatePicker onChange={field.onChange} />} />
          </Form.Group>{" "}
          <FormField control={control} name="surplus" isRequired={false} />
          <Form.Group>
            <Controller
              control={control}
              name="activity"
              render={({field}) => (
                <>
                  <Form.Label>Activity</Form.Label>
                  <Form.Control
                    ref={field.ref}
                    as="select"
                    onChange={field.onChange}
                    placeholder="select">
                      {Array.from(Activity.allValues().values()).map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.id}
                        </option>
                      ))}
                  </Form.Control>
                </>
              )} />
          </Form.Group>{" "}
          
          <h3>BMR + Activity: {targetCalsWithActivity}</h3>
          <h4>Macros</h4>
          <FormField control={control} name="protein" isRequired={false} />
          <FormField control={control} name="carbs" isRequired={false} />
          <FormField control={control} name="fat" isRequired={false} />
          <Form.Group>
            <Button type="submit">Save</Button>
          </Form.Group>
          <h4>Target Cals: {totalCals}</h4>
          <h4>
            Protein = {targetProtein}g, Carbs = {targetCarbs}g, Fat = {targetFat}g
          </h4>
        </Form>
      </div>
    );
  }

export default ProfilePage
