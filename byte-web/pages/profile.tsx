import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { Activity, Sex, User } from "@models";
import { Controller, useForm } from "react-hook-form";
import { firebaseApp, saveUser, userFirestoreCoder } from "@db";
import { FormField } from "@components";
import { Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from "react-datepicker";
import { calculateUsersMacroTargets, calculateBmr } from "../byte/nutrition-analysis";

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

const ProfilePage: NextPage<{uid: string}> = ({uid}) => {
  const db = getFirestore(firebaseApp)
  const userRef = doc(db, "users", uid).withConverter(userFirestoreCoder)
  const {handleSubmit, control, reset} = useForm<UserFormValues>()
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    return onSnapshot(userRef, snapshot => {
      setUser(snapshot.data())
    })
  })

   
    if (!user) return null

    const updateUser = (userUpdate: UserFormValues) => {
      
    const newData: User = {
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
      username: user.username,
      dob: user.dob?.toDate(),
      heightInCms: user.height_in_milimeters && user.height_in_milimeters / 100,
      weightInGrams: user.weight_in_grams && user.weight_in_grams / 1000,
      caloricSurplus: user.caloric_surplus,
      proteinPercentage: user.macros_target?.protein_percentage,
      fatPercentage: user.macros_target?.fat_percentage,
      carbPercentage: user.macros_target?.carb_percentage,
      activity: user.activity
    }

    reset(defaultValues)

    const targerMacroAmounts = calculateUsersMacroTargets(user, true);
    const targetCarbs = Math.round(targerMacroAmounts.carbs_in_grams);
    const targetProtein = Math.round(targerMacroAmounts.protein_in_grams);
    const targetFat = Math.round(targerMacroAmounts.fat_in_grams);
    const targetCals = calculateBmr(user, false);
    const targetCalsWithActivity = calculateBmr(user, true);
    const totalCals = targetCalsWithActivity + (user.caloric_surplus || 0);

    return (
      <div>
        <Form onSubmit={handleSubmit(updateUser)}>
          <FormField control={control} name="username" label="Username" isRequired={false} />
          <FormField control={control} name="height" label="Height" isRequired={false} />
          <FormField control={control} name="wight" label="Weight" isRequired={false} />
          <h3>BMR: {targetCals}</h3>
          <Form.Group>
            <Controller
              control={control}
              name="dob"
              render={({field}) => <ReactDatePicker onChange={field.onChange} />} />
          </Form.Group>{" "}
          <FormField control={control} name="surplus" label="Surplus" isRequired={false} />
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
          <FormField control={control} name="protein" label="Protein" isRequired={false} />
          <FormField control={control} name="carbs" label="Carbs" isRequired={false} />
          <FormField control={control} name="fat" label="Fat" isRequired={false} />
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
