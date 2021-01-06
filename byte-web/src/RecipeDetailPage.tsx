import React, { FormEvent, useEffect, useState} from "react";
import firebase from 'firebase';
import { Recipe, recipeFromSnapshot, saveRecipe } from "./model/Recipe";
import { Item, itemFromSnapshot, Serving } from "./model";
import {Button, Form} from "react-bootstrap";

export const RecipeDetailPage: React.FC<{recipeRef: firebase.firestore.DocumentReference}> = ({recipeRef}) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [items, setItems] = useState<Item[]>([])
  let itemSelect: HTMLInputElement | undefined;
  let gramsTF: HTMLInputElement | undefined;

  useEffect(() => {
    const recipeSub = recipeRef.onSnapshot(snapshot => {
      setRecipe(recipeFromSnapshot(snapshot))
    })
    const itemsSub = firebase.firestore().collection("items").onSnapshot(snapshot => {
      setItems(snapshot.docs.map(itemFromSnapshot))
    });
    return () => {
      recipeSub()
      itemsSub()
    }
  }, [recipeRef])

  const onDelete: (index: number) => void = index => {
    if (!recipe) return
    recipe.ingredients.splice(index, 1);
    saveRecipe(recipe);
  };

  const addClick = (e: FormEvent) => {
    if (!recipe) return
    e.preventDefault();
    const itemRef = firebase.firestore().collection("items").doc(itemSelect!.value);
    const grams = Number(gramsTF!.value);
    recipe.ingredients.push({grams, item_ref: itemRef});
    saveRecipe(recipe);
  };

  if (!recipe) return <div></div> 

  return (
      <div>
        <h1>{recipe.name}</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
              <th>Calories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {recipe.ingredients.map((serving, index) => {
                return <ServingRow key={index} serving={serving} index={index} onDelete={onDelete} />
              })}
          </tbody>
        </table>

        <Form inline onSubmit={addClick}>
          <Form.Group>
            <Form.Group controlId="Form.ControlsSelect">
              <Form.Label>Select</Form.Label>
              <Form.Control ref={(ref) => (itemSelect = ref)} as="select" placeholder="select">
                {items.map((item) => (
                  <option key={item.firestoreRef.id} value={item.firestoreRef.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Label>Grams</Form.Label>{" "}
            <Form.Control ref={(ref) => (gramsTF = ref)} type="text" />
          </Form.Group>{" "}
          <Button type="submit">Save</Button>
        </Form>
      </div>
  )
}

const Test: React.FC = () => {
  return (
    <div>Test</div>
  )
}

const ServingRow: React.FC<{serving: Serving, index: number, onDelete: (number) => void}> = ({serving, index, onDelete}) => {
  const [item, setItem] = useState<Item | undefined>(undefined)

  useEffect(() => {
    return serving.item_ref.onSnapshot(snapshot => {
      setItem(itemFromSnapshot(snapshot))
    })
  }, [serving])

  if (!item) return null

  const protein = item.protein_per_gram * serving.grams;
  const fat = item.fat_per_gram * serving.grams;
  const carbs = item.carbs_per_gram * serving.grams;
  const calories = protein * 4 + fat * 9 + carbs * 4;

  return (
    <tr key={item.firestoreRef.id}>
      <td>{item.name}</td>
      <td>{serving.grams}</td>
      <td>{Math.round(protein)}</td>
      <td>{Math.round(fat)}g</td>
      <td>{Math.round(carbs)}g</td>
      <td>{Math.round(calories)} kCal</td>
      <td><Button onClick={() => onDelete(index)}>Delete</Button></td>
    </tr>
  )
}