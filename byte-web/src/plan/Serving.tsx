import React, { Component } from 'react'
import firebase from '../firebase'
import { Button, Form } from 'react-bootstrap'
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
    var rows: JSX.Element[] = []
    if (item) {
      let serving = this.serving()
      let protein = item.protein_per_gram * serving.grams
      let fat = item.fat_per_gram * serving.grams
      let carbs = item.carbs_per_gram * serving.grams
      let calories = (protein * 4) + (fat * 9) + (carbs * 4)
      rows.push(<td>{item.name}</td>)
      rows.push(<td><Form.Control type='text' defaultValue={String(this.serving().grams)} /></td>)
      rows.push(<td>{Math.round(protein)}g</td>)
      rows.push(<td>{Math.round(fat)}g</td>)
      rows.push(<td>{Math.round(carbs)}g</td>)
      rows.push(<td>{Math.round(calories)} kCal</td>)
    }

    return (
      <tr>
        {rows}
        <td>
          <Button onClick={this.delete}>Delete</Button>
        </td>
      </tr>
    )
  }
}

export default ServingComp;