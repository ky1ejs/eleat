import React, { Component, FormEvent } from 'react'
import firebase from '../firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { Plan, planFromSnapshot, savePlan, itemFromSnapshot, Nutrition, calculateNutritionForPlan } from '../model'
import MealComp from './Meal'

interface PlanDetailState {
  plan?: Plan,
  nutrition?: Nutrition
}
interface PlanDetailProps {
  plan_ref: firebase.firestore.DocumentReference
}
class PlanDetail extends Component<PlanDetailProps, PlanDetailState>  {
  planUnsubscribe?: Function = undefined
  mealNameTF: HTMLInputElement | undefined
  state: PlanDetailState = { plan: undefined, nutrition: undefined }

  onPlanUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let plan = planFromSnapshot(querySnapshot)
    this.setState({ plan })
    calculateNutritionForPlan(plan).then((nutrition) => {
      this.setState({ nutrition })
    })
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
    var planInfo: JSX.Element[] = []
    var meals: JSX.Element[] = []
    if (plan) {
      planInfo.push(<h2>{plan.name}</h2>)
      let nutrition = this.state.nutrition
      if (nutrition) {
        planInfo.push(<h4>Protein: {Math.round(nutrition.protein)}g</h4>)
        planInfo.push(<h4>Carb: {Math.round(nutrition.carbs)}g</h4>)
        planInfo.push(<h4>Fat: {Math.round(nutrition.fat)}g</h4>)
        planInfo.push(<h4>Cals: {Math.round(nutrition.cals)}kCal</h4>)
      }
      
      for (var i = 0; i < plan.meals.length; i++) {
        meals.push(<MealComp key={i} plan={plan} mealIndex={i} />)
      }
    }
    return (
      <div>
        <div>
          {planInfo}
        </div>
        <div>
          {meals}
        </div>
        <div>
          <Form inline onSubmit={this.addClick}>
            <FormGroup>
              <ControlLabel>Meal Name</ControlLabel>{' '}
              <FormControl inputRef={(ref) => this.mealNameTF = ref} type='text' />
            </FormGroup>{' '}
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PlanDetail