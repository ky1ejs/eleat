import React, { Component, FormEvent, isValidElement } from 'react'
import firebase from './firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { Item, Serving, Meal, Plan, planFromSnapshot, savePlan } from './model'

interface PlanDetailState {
  plan?: Plan
}
interface PlanDetailProps {
  plan_ref: firebase.firestore.DocumentReference
}
class PlanDetail extends Component<PlanDetailProps, PlanDetailState>  {
  planUnsubscribe?: Function = undefined
  mealNameTF: HTMLInputElement | undefined

  constructor(props: PlanDetailProps) {
    super(props)
    this.state = { plan: undefined }
  }

  onPlanUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let plan = planFromSnapshot(querySnapshot)
    this.setState({ plan })
  }

  componentDidMount() {
    this.planUnsubscribe = this.props.plan_ref.onSnapshot(this.onPlanUpdate)
  }

  componentWillUnmount() {
    if (this.planUnsubscribe) { this.planUnsubscribe() }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let plan = this.state.plan
    if (plan) {
      plan.meals.push({ name: this.mealNameTF!.value, servings: []})
      savePlan(plan)
    }
  }

  render() {
    let plan = this.state.plan
    var meals: JSX.Element[] = []
    if (plan) {
      for (var i = 0; i < plan.meals.length; i++) {
        let meal = plan.meals[i]
        meals.push(<MealComp key={i} plan={plan} mealIndex={i} />)
      }
    }
    return (
      <div>
        {meals}
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <ControlLabel>Meal Name</ControlLabel>{' '}
            <FormControl inputRef={(ref) => this.mealNameTF = ref} type='text' />
          </FormGroup>{' '}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

interface MealCompProps {
  plan: Plan
  mealIndex: number
}
interface MealCompState {
  items: Item[]
}
class MealComp extends Component<MealCompProps, MealCompState> {
  itemSelect: HTMLInputElement | undefined
  gramsTF: HTMLInputElement | undefined
  itemUnsubscribe?: Function = undefined

  constructor(props: MealCompProps) {
    super(props)
    this.state = { items: [] }
  }
  meal(): Meal {
    return this.props.plan.meals[this.props.mealIndex]
  }

  onItemsUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    const items: Item[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      items.push({
        id: doc.id,
        name: data.name,
        protein_per_gram: data.protein_per_gram,
        fat_per_gram: data.fat_per_gram,
        carbs_per_gram: data.carbs_per_gram
      })
    })
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
        <div>
          <ServingComp key={this.meal().servings[i].item_ref.id} plan={{ ...this.props.plan }} mealIndex={this.props.mealIndex} servingIndex={i} />
        </div>
      )
    }

    return (
      <div>
        {servings}
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl inputRef={(ref) => this.itemSelect = ref} componentClass="select" placeholder="select">
                {this.state.items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
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

interface ServingCompProps {
  plan: Plan
  mealIndex: number
  servingIndex: number
}
class ServingComp extends Component<ServingCompProps, Item> {
  itemUnsubscribe?: Function = undefined
  state = {
    id: '',
    name: '',
    protein_per_gram: 0,
    fat_per_gram: 0,
    carbs_per_gram: 0
  }

  onItemUpdate = (doc: firebase.firestore.DocumentSnapshot) => {
    let data = doc.data()!
    this.setState({
      id: doc.id,
      name: data.name,
      protein_per_gram: data.protein_per_gram,
      fat_per_gram: data.fat_per_gram,
      carbs_per_gram: data.carbs_per_gram
    })
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

  serving(): Serving  {
    return this.props.plan.meals[this.props.mealIndex].servings[this.props.servingIndex]
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>{this.state.name}</ControlLabel>{' '}
          <ControlLabel>{this.serving().grams}</ControlLabel>{' '}
        </FormGroup>{' '}
        <Button type="submit">View</Button>
        <Button onClick={this.delete}>Delete</Button>
      </Form>
    )
  }
}

export default PlanDetail