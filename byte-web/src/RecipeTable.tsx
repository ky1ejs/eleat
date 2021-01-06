import React, { FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import { Recipe, recipeFromSnapshot } from "./model/Recipe";
import firebase from "firebase";

export const RecipeTable: React.FC<{userId: string}> = ({userId}) => {
  const ref = firebase.firestore().collection("users/" + userId + "/recipes");
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    return ref.onSnapshot((snapshot) => {
      setRecipes(snapshot.docs.map(recipeFromSnapshot))
    })
  }, [userId])

  
  let nameTextField: HTMLInputElement | undefined

  const onAddClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameTextField.value;
    if (name.length > 0) {
      ref.add({name});
    }
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeRow recipe={recipe} key={recipe.firebaseRef.id} />
      ))}
      <Form inline onSubmit={onAddClick}>
        <Form.Group>
          <Form.Label>Name</Form.Label>{" "}
          <Form.Control ref={(ref) => (nameTextField = ref)} type="text" />
        </Form.Group>{" "}
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}

const RecipeRow: React.FC<{recipe: Recipe}> = ({recipe}) => {
  const onDeleteClick = () => {

  }
  return (
    <div>
      <Form inline>
        <Form.Group>
          <Form.Label>{recipe.name}</Form.Label>{" "}
        </Form.Group>{" "}
        <Button type="submit">
          <Link to={"recipes/" + recipe.firebaseRef.id}>View</Link>
        </Button>
        <Button onClick={onDeleteClick}> Delete </Button>
      </Form>
    </div>
  )
}
