import React, { Component, FormEvent, isValidElement } from 'react'
import firebase from './firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'

interface PlanDetailProps {
  plan: firebase.firestore.DocumentReference
}
interface Serving {
  id: string
  item_ref: firebase.firestore.DocumentReference
  grams: number
}
interface PlanDetailState {
  servings: Serving[],
  items: Item[]
}
interface Item {
  id: string,
  name: string,
  protein_per_gram: number,
  fat_per_gram: number,
  carbs_per_gram: number
}
class PlanDetail extends Component<PlanDetailProps, PlanDetailState>  {
  itemUnsubscribe?: Function = undefined
  servingsUnsubscribe?: Function = undefined
  itemSelect: HTMLInputElement | undefined
  gramsTF: HTMLInputElement | undefined
  state: PlanDetailState = { servings: [], items: [] }

  onServingsUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    var servings: Serving[] = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      servings.push({ id: doc.id, item_ref: data.item_ref, grams: data.grams })
    })
    this.setState({ servings })
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
    this.servingsUnsubscribe = this.props.plan.collection('servings').onSnapshot(this.onServingsUpdate)
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) { this.itemUnsubscribe() }
    if (this.servingsUnsubscribe) { this.servingsUnsubscribe() }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let item_ref = firebase.firestore().collection('items').doc(this.itemSelect!.value)
    let grams = Number(this.gramsTF!.value)
    this.props.plan.collection('servings').add({ grams, item_ref })
  }

  render() {
    return (
      <div>
        {this.state.servings.map(serving => <ServingComp key={serving.id} {...serving} />)}
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

class ServingComp extends Component<Serving, Item> {
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
    this.itemUnsubscribe = this.props.item_ref.onSnapshot(this.onItemUpdate)
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) { this.itemUnsubscribe() }
  }


  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>{this.state.name}</ControlLabel>{' '}
          <ControlLabel>{this.props.grams}</ControlLabel>{' '}
        </FormGroup>{' '}
        <Button type="submit">View</Button>
        <Button type="submit">Delete</Button>
      </Form>
    )
  }
}

export default PlanDetail