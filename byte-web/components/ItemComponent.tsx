import React from "react";
import {Item, NewItem} from "@models";
import {Form, Button, Row, Col} from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { saveNewItem } from "@db";
import { updateDoc } from "@firebase/firestore";
import {FormField} from "./FormField";

export function ItemComponent({item}: {item?: Item}) {
  const defaultValues: NewItem | undefined = item ? {
    name: item.name, 
    measure_name: item.measure_name,
    protein_per_gram: item.protein_per_gram,
    fat_per_gram: item.fat_per_gram, 
    carbs_per_gram: item.carbs_per_gram
  } : undefined

  const { control, handleSubmit } = useForm<NewItem>({defaultValues});
  const onSubmit = (newItem: NewItem) => {
    if (item) {
      // I have no idea why the spread opperator is needed but without it there's an error
      // maybe related: https://github.com/firebase/firebase-js-sdk/issues/5853
      updateDoc(item.firestoreRef, {...newItem})
    } else {
      saveNewItem(newItem);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: the transpiller should be able to know that the value of "name" fields below
          are not valid values of NewItem, but for some reason the type definition of Field
          not allowing it to look that up. */}
      <Row>
        <Col>
          <FormField control={control} label="Name" name="name" isRequired />
        </Col>
        <Col><FormField control={control} label="Measurement" name="measure_name" isRequired /></Col>
        <Col><FormField control={control} label="Protein" name="protein_per_gram" isRequired /></Col>
        <Col><FormField control={control} label="Fat" name="fat_per_gram" isRequired /></Col>
        <Col><FormField control={control} label="Carbs" name="carbs_per_gram" isRequired /></Col>
        <Col><Form.Group>Calories</Form.Group></Col>
        <Col><Button type="submit">Save</Button></Col>
      </Row>
    </Form>
  );
}
