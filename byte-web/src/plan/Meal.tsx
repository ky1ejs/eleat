import React, { Component, FormEvent } from 'react'
import firebase from '../firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { Item, Meal, Plan, savePlan, itemFromSnapshot, Nutrition } from '../model'
import ServingComp from './Serving'

interface MealCompProps {
  plan: Plan,
  mealIndex: number
}
interface MealCompState {
  items: Item[],
  nutrition?: Nutrition
}
class MealComp extends Component<MealCompProps, MealCompState> {
  itemSelect: HTMLInputElement | undefined
  gramsTF: HTMLInputElement | undefined
  itemUnsubscribe?: Function = undefined
  state: MealCompState = { items: [], nutrition: undefined }

  meal(): Meal {
    return this.props.plan.meals[this.props.mealIndex]
  }

  onItemsUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let items = querySnapshot.docs.map(itemFromSnapshot)
    this.setState({ items })
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let item_ref = firebase.firestore().collection('items').doc(this.itemSelect!.value)
    let grams = Number(this.gramsTF!.value)
    this.meal().servings.push({ grams, item_ref })
    savePlan(this.props.plan)
  }

  componentDidMount() {
    this.itemUnsubscribe = firebase.firestore().collection('items').onSnapshot(this.onItemsUpdate)
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) { this.itemUnsubscribe() }
  }

  render() {
    var servings: JSX.Element[] = []
    for (var i = 0; i < this.meal().servings.length; i++) {
      servings.push(
        <ServingComp key={this.meal().servings[i].item_ref.id} plan={{ ...this.props.plan }} mealIndex={this.props.mealIndex} servingIndex={i} />
      )
    }

    return (
      <div>
        <h3>{this.meal().name}</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Protein</th>
            <th>Fat</th>
            <th>Carbs</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
          {servings}
        </table>
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl inputRef={(ref) => this.itemSelect = ref} componentClass="select" placeholder="select">
                {this.state.items.map(item => <option key={item.firestoreRef.id} value={item.firestoreRef.id}>{item.name}</option>)}
              </FormControl>
            </FormGroup>
            <ControlLabel>Grams</ControlLabel>{' '}
            <FormControl inputRef={(ref) => this.gramsTF = ref} type='text' />
          </FormGroup>{' '}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

export default MealComp