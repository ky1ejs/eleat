import React from "react";
import {Item, NewItem} from "@models";
import {Form, Button} from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { saveNewItem } from "@db";
import { updateDoc } from "@firebase/firestore";
import {FormField} from "./FormField";

export function ItemRowComponent({item, includeSaveButton}: {item?: Item, includeSaveButton: boolean}) {
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

  const formId = "test"

  return (
    <tr>
      {/* TODO: the transpiller should be able to know that the value of "name" fields below
          are not valid values of NewItem, but for some reason the type definition of Field
          not allowing it to look that up. */}
        <td>
          <Form id={"test"} onSubmit={handleSubmit(onSubmit)} >
            <FormField control={control} name="name" isRequired />
          </Form>
        </td>
        <td><FormField formId={formId} control={control} name="measure_name" isRequired /></td>
        <td><FormField formId={formId} control={control} name="protein_per_gram" isRequired /></td>
        <td><FormField formId={formId} control={control} name="fat_per_gram" isRequired /></td>
        <td><FormField formId={formId} control={control} name="carbs_per_gram" isRequired /></td>
        <td><Form.Group>TODO cals calc</Form.Group></td>
        {includeSaveButton && <td><Button type="submit">Save</Button></td>}
    </tr>
  );
}
