import React, { useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import { NextPage } from "next";
import { addDoc, collection, getFirestore, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { Recipe } from "@models";
import { firebaseApp, recipeFromSnapshot } from "@db";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "@contexts";
import { RecipeRow } from "@components";

interface NewRecipe {
  name: string
}

const RecipePage: NextPage = () => {
  const user = useUser()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const {handleSubmit, control} = useForm<NewRecipe>()

  if (!user) return null

  const db = getFirestore(firebaseApp)
  const recipeCollection = collection(db, "users", user.uid, "recipes")

  const onRecipeUpdate = (snapshot: QuerySnapshot) => {
    setRecipes(snapshot.docs.map(recipeFromSnapshot))
  }

  useEffect(() => {
    return onSnapshot(recipeCollection, onRecipeUpdate)
  }, [user.uid, recipeCollection])

  const createRecipe = async (recipe: NewRecipe) => {
    if (recipe.name.length === 0) return
    await addDoc(recipeCollection, recipe)
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeRow recipe={recipe} key={recipe.firebaseRef.id} />
      ))}
      <Form onSubmit={handleSubmit(createRecipe)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>{" "}
          <Controller
            control={control}
            name="name"
            render={({field}) => <Form.Control {...field} type="text" />}
          />
        </Form.Group>{" "}
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}

export default RecipePage;
