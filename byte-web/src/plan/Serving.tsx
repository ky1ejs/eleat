import React, { Component } from 'react'
import firebase from '../firebase'
import { Form, ControlLabel, FormGroup, Button, FormControl } from 'react-bootstrap'
import { Serving, Item, Plan, savePlan, itemFromSnapshot } from '../model'

interface ServingCompProps {
  plan: Plan
  mealIndex: number
  servingIndex: number
}
interface ServingCompState {
  item?: Item
}
class ServingComp extends Component<ServingCompProps, ServingCompState> {
  itemUnsubscribe?: Function = undefined
  state: ServingCompState = { item: undefined }

  onItemUpdate = (doc: firebase.firestore.DocumentSnapshot) => {
    let item = itemFromSnapshot(doc)
    this.setState({item})
  }

  componentDidMount() {
    this.itemUnsubscribe = this.serving().item_ref.onSnapshot(this.onItemUpdate)
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) { this.itemUnsubscribe() }
  }

  delete = () => {
    this.props.plan.meals[this.props.mealIndex].servings.splice(this.props.servingIndex, 1)
    savePlan(this.props.plan)
  }

  serving(): Serving {
    return this.props.plan.meals[this.props.mealIndex].servings[this.props.servingIndex]
  }

  render() {
    let item = this.state.item
    var info: JSX.Element[] = []
    if (item) {
      let serving = this.serving()
      let protein = item.protein_per_gram * serving.grams
      let fat = item.fat_per_gram * serving.grams
      let carbs = item.carbs_per_gram * serving.grams
      let calories = (protein * 4) + (fat * 9) + (carbs * 4)
      info.push(
        <div>
          <ControlLabel>{item.name}</ControlLabel>
          <FormControl type='text' defaultValue={String(this.serving().grams)} />
          <ControlLabel>Protein: {Math.round(protein)}g</ControlLabel>{ '   '}
          <ControlLabel>Fat: { Math.round(fat) }g</ControlLabel > { '   '}
          <ControlLabel>Carbs: { Math.round(carbs) }g</ControlLabel > { '   '}
          <ControlLabel>Calories: { Math.round(calories) } kCal</ControlLabel >
        </div>
      )
    }

    return (
      <Form inline>
        <FormGroup>
          {info}
        </FormGroup>
        <Button onClick={this.delete}>Delete</Button>
      </Form>
    )
  }
}

export default ServingComp