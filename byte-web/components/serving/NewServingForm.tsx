import { firebaseApp, itemFromSnapshot } from "@db";
import { collection, getFirestore, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { Item, NewServing } from "@models";
import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

interface NewServingFormProps {
  onSubmit: (serving: NewServing) => void
}

interface FormValues {
  itemRef: string
  grams: number
}

export function NewServingForm({onSubmit}: NewServingFormProps) {
  const db = getFirestore(firebaseApp)
  const { control, handleSubmit } = useForm<FormValues>();
  const [itemsById, setItemsById] = useState(new Map<string, Item>())

  const onItemsUpdate = (snapshot: QuerySnapshot) => {
    const items = snapshot.docs.map(itemFromSnapshot);
    setItemsById(new Map(items.map(item => [item.firestoreRef.id, item])));
  };

  const onFormSubmit = (values: FormValues) => {
    onSubmit({item: itemsById.get(values.itemRef)!, grams: values.grams})
  }

  useEffect(() => {
    return onSnapshot(collection(db, "items"), onItemsUpdate);
  })
  
  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Form.Group>
            <Form.Group controlId="Form.ControlsSelect">
              <Form.Label>Select</Form.Label>
              <Controller 
                name="itemRef"
                control={control}
                render={({field: {ref, onChange, value}}) => (
                  <Form.Control ref={ref} as="select" placeholder="select" value={value} onChange={onChange}>
                    {Object.entries(itemsById).map(([id, item]) => (
                      <option key={id} value={id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                )}
              />
              
            </Form.Group>
            <Form.Label>Grams</Form.Label>{" "}
            <Controller
              control={control}
              name="grams"
              render={({field}) => <Form.Control {...field} type="text" />}
            />
          </Form.Group>{" "}
          <Button type="submit">Save</Button>
        </Form>
  )
}