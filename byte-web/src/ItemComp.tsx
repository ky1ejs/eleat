import React, { Component } from 'react'
import { Item, saveItem, saveNewItem } from './model'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

interface ItemCompProps {
  item?: Item
}
export default class ItemComp extends Component<ItemCompProps> {
  nameTF: HTMLInputElement | undefined
  measureNameTF: HTMLInputElement | undefined
  proteinTF: HTMLInputElement | undefined
  fatTF: HTMLInputElement | undefined
  carbsTF: HTMLInputElement | undefined

  save = (e: any) => {
    e.preventDefault()
    let item = this.props.item
    const newItem = {
      name: this.nameTF!.value,
      measure_name: this.measureNameTF!.value,
      protein_per_gram: Number(this.proteinTF!.value),
      fat_per_gram: Number(this.fatTF!.value),
      carbs_per_gram: Number(this.carbsTF!.value)
    }
    if (item) {
      item.firestoreRef.set(newItem)
    } else {
      saveNewItem(newItem)
    }
  }

  render() {
    let name = this.props.item && this.props.item.name || ""
    let measureName = this.props.item && this.props.item.measure_name || ""
    let protein_per_gram = this.props.item && this.props.item.protein_per_gram || 0
    let carbs_per_gram = this.props.item && this.props.item.carbs_per_gram || 0
    let fat_per_gram = this.props.item && this.props.item.fat_per_gram || 0
    return (
      <Form inline onSubmit={this.save}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.nameTF = ref }} type="text" defaultValue={name} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Measure Name</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.measureNameTF = ref }} type="text" defaultValue={measureName} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Protein</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.proteinTF = ref }} type="text" defaultValue={String(protein_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Fat</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.fatTF = ref }} type="text" defaultValue={String(fat_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Carbs</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.carbsTF = ref }} type="text" defaultValue={String(carbs_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          Calories
        </FormGroup>{' '}
        <Button type="submit">Save</Button>
      </Form>
    )
  }
}