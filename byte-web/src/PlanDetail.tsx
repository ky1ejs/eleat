import React, { Component, FormEvent, isValidElement } from 'react'
import firebase from './firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { Item, Serving, Plan, planFromSnapshot, savePlan } from './model'

interface PlanDetailState {
  plan?: Plan,
  items: Item[]
}
interface PlanDetailProps {
  plan_ref: firebase.firestore.DocumentReference
}
class PlanDetail extends Component<PlanDetailProps, PlanDetailState>  {
  itemUnsubscribe?: Function = undefined
  planUnsubscribe?: Function = undefined
  itemSelect: HTMLInputElement | undefined
  gramsTF: HTMLInputElement | undefined
  
  constructor(props: PlanDetailProps) {
    super(props)
    this.state = { plan: undefined, items: [] }
  }

  onPlanUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let plan = planFromSnapshot(querySnapshot)
    this.setState({ plan })
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

  componentDidMount() {
    this.itemUnsubscribe = firebase.firestore().collection('items').onSnapshot(this.onItemsUpdate)
    this.planUnsubscribe = this.props.plan_ref.onSnapshot(this.onPlanUpdate)
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) { this.itemUnsubscribe() }
    if (this.planUnsubscribe) { this.planUnsubscribe() }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let item_ref = firebase.firestore().collection('items').doc(this.itemSelect!.value)
    let grams = Number(this.gramsTF!.value)
    let plan = this.state.plan
    if (plan) {
      plan.meals.push({ name: 'Breakfast', servings: [{ grams, item_ref }]})
      savePlan(plan)
    }
  }

  render() {
    let plan = this.state.plan
    var servings: JSX.Element[] = []
    if (plan) {
      for (var i = 0; i < plan.meals.length; i++) {
        let meal = plan.meals[i]
        for (var j = 0; j < meal.servings.length; j++) {
          let serving = meal.servings[j]
          servings.push(
            <div>
              <ServingComp key={serving.item_ref.id} plan={{...plan}} mealIndex={i} servingIndex={j} />
            </div>
          )
        }
      }
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