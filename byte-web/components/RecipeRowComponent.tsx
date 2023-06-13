import React from "react"
import { Recipe } from "@models"
import Link from "next/link"
import { Form, Button } from "react-bootstrap"

export const RecipeRow: React.FC<{recipe: Recipe}> = ({recipe}) => {
  const onDeleteClick = () => {

  }
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>{recipe.name}</Form.Label>{" "}
        </Form.Group>{" "}
        <Button type="submit">
          <Link href={"recipes/" + recipe.firebaseRef.id}>View</Link>
        </Button>
        <Button onClick={onDeleteClick}> Delete </Button>
      </Form>
    </div>
  )
}
