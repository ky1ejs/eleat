import { Button, Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"

export interface NewMeal {
  name: string
}

export interface NewMealFormProps {
  onSubmit: (meal: NewMeal) => void
}

export const NewMealForm = ({onSubmit}: NewMealFormProps) => {
  const {handleSubmit, control} = useForm<NewMeal>()
  return (
    <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Meal Name</Form.Label>{" "}
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
