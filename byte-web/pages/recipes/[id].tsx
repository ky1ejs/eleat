import React, { useEffect, useState} from "react";
import { Recipe } from "@models";
import {Button, Form} from "react-bootstrap";
import { NextPage } from "next";
import { doc, onSnapshot} from "@firebase/firestore";
import { recipesForUser, recipeFromSnapshot, saveRecipe } from "@db";
import { Controller, useForm } from "react-hook-form";
import { ServingTableComponent } from "@components";

export const RecipeDetailPage: NextPage<{recipeId: string, uid: string}> = ({recipeId, uid}) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const {handleSubmit, control} = useForm<{method: string}>()
  const recipeRef = doc(recipesForUser(uid), recipeId);

  useEffect(() => {
    return onSnapshot(recipeRef, snapshot => {
      setRecipe(recipeFromSnapshot(snapshot))
    })
  }, [recipeRef])

  // TODO: add loading UI
  if (!recipe) return null

  const saveMethod = ({method}: {method: string}) => {
    recipe.method = method;
    saveRecipe(recipe)
  } 

  return (
      <div>
        <h1>{recipe.name}</h1>

        <h1>Method</h1>
        <Form onSubmit={handleSubmit(saveMethod)}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Controller
            control={control}
            name="method"
            render={({field}) => <Form.Control {...field} as="textarea" rows={3} />} />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>

        <ServingTableComponent servings={recipe.ingredients} onSave={() => saveRecipe(recipe)} />
      </div>
  )
}
