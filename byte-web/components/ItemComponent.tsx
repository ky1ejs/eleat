import React from "react";
import { ItemFragment as Item } from "graphql/gql/graphql";
import {NewItem} from "@models";
import {Form, Button} from "react-bootstrap";
import { useForm } from 'react-hook-form'
import {FormField} from "./FormField";
import { graphql } from "graphql/gql";
import { useMutation } from "urql";

const UPDATE_ITEM = graphql(`
  mutation UpdateItem($id: UUID, $update: itemsUpdateInput!) {
  updateitemsCollection(
    set: $update, 
    filter: { id: { eq: $id }}
  ) {
    	affectedCount    
    	records {
      	...Item
    	}
	}
}
`)

const INSERT_ITEM = graphql(`
    mutation InsertItem($item: itemsInsertInput!) {
      insertIntoitemsCollection(objects: [$item]) {
        affectedCount    
    	records {
      	...Item
    	}
      }
    }
`)

export function ItemRowComponent({item, includeSaveButton}: {item?: Item, includeSaveButton: boolean}) {
  const defaultValues: NewItem | undefined = item ? {
    name: item.name, 
    measurement_name: item.measurement_name,
    protein_per_gram: item.protein_per_gram,
    fat_per_gram: item.fat_per_gram, 
    carbs_per_gram: item.carbs_per_gram
  } : undefined

  const [, update] = useMutation(UPDATE_ITEM)
  const [, insert] = useMutation(INSERT_ITEM)

  const { control, handleSubmit } = useForm<NewItem>({defaultValues});
  const onSubmit = (newItem: NewItem) => {
    if (item) {
      update({id: item.id, update: {...newItem}})
    } else {
      insert({item: {...newItem}})
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
        <td><FormField formId={formId} control={control} name="measurement_name" isRequired /></td>
        <td><FormField formId={formId} control={control} name="protein_per_gram" isRequired /></td>
        <td><FormField formId={formId} control={control} name="fat_per_gram" isRequired /></td>
        <td><FormField formId={formId} control={control} name="carbs_per_gram" isRequired /></td>
        <td><Form.Group>TODO cals calc</Form.Group></td>
        {includeSaveButton && <td><Button type="submit">Save</Button></td>}
    </tr>
  );
}
