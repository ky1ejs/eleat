import React, { Component, FormEvent } from 'react'
import firebase from './firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { ShoppingListItem, generateShoppingListForPlans, Schedule, Plan, plansForUser, scheduleFromSnapshot, saveSchedule, planFromSnapshot, Nutrition } from './model'

interface ScheduleDetailState {
  schedule?: Schedule,
  plans: Plan[],
  shoppingList: ShoppingListItem[]
}
interface ScheduleDetailProps {
  scheduleRef: firebase.firestore.DocumentReference,
  userId: string
}
class ScheduleDetail extends Component<ScheduleDetailProps, ScheduleDetailState>  {
  scheduleUnsubscribe?: Function = undefined
  plansUnsubscribe?: Function = undefined
  planSelect: HTMLInputElement | undefined
  state: ScheduleDetailState = { schedule: undefined, plans: [], shoppingList: [] }

  onScheduleUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let schedule = scheduleFromSnapshot(querySnapshot)
    this.setState({ schedule })
    this.getAndgenerateShoppingListForPlans(schedule.plans).then((shoppingList) => {
      this.setState({ shoppingList })
    })
  }

  onPlansUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let plans = querySnapshot.docs.map(planFromSnapshot)
    this.setState({ plans })
  }

  async getAndgenerateShoppingListForPlans(refs: firebase.firestore.DocumentReference[]): Promise<ShoppingListItem[]> {
    var refsAndPlans = new Map<string, {count: number, plan: Plan}>()
    for (const ref of refs) {
      let existingPlan = refsAndPlans.get(ref.id)
      console.log(ref.id)
      if (existingPlan) {
        existingPlan.count += 1
      } else {
        let snapshot = await ref.get()
        refsAndPlans.set(ref.id, {
          count: 1,
          plan: planFromSnapshot(snapshot)
        })
      }
    }
    let plans = Array.from(refsAndPlans.values()).map((planCount) => {
      var repeatedPlans = new Array<Plan>()
      for (var i = 0; i < planCount.count; i++) {
        repeatedPlans.push(planCount.plan)
      }
      return repeatedPlans
    }).flat()
    let list = await generateShoppingListForPlans(plans)
    return Array.from(list.values())
  }

  componentDidMount() {
    this.scheduleUnsubscribe = this.props.scheduleRef.onSnapshot(this.onScheduleUpdate)
    this.plansUnsubscribe = plansForUser(this.props.userId).onSnapshot(this.onPlansUpdate)
  }

  componentWillUnmount() {
    if (this.scheduleUnsubscribe) { this.scheduleUnsubscribe() }
    if (this.plansUnsubscribe) { this.plansUnsubscribe() }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let plan_ref = firebase.firestore().doc(this.planSelect!.value)
    let schedule = this.state.schedule
    if (schedule) {
      schedule.plans.push(plan_ref)
      saveSchedule(schedule)
    }
  }

  render() {
    var plans: JSX.Element[] = []
    let schedule = this.state.schedule
    if (schedule) {
      plans = schedule.plans.map((ref) => <PlanComp planRef={ref} />)
    }
    return (
      <div>
        {plans}
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <ControlLabel>Select</ControlLabel>
            <FormControl inputRef={(ref) => this.planSelect = ref} componentClass="select" placeholder="select">
              {this.state.plans.map(plan => <option key={plan.firebaseRef.id} value={plan.firebaseRef.path}>{plan.name}</option>)}
            </FormControl>
          </FormGroup>{' '}
          <Button type="submit">Save</Button>
        </Form>
        <br />
        <br />
        <div>
          <h3>
            Shopping List
          </h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
            {this.state.shoppingList.map(item => 
              <tr><td key={item.item.name}>{item.item.name}</td><td>{item.grams} {item.item.measure_name}{item.grams > 1 ? 's' : ''}</td></tr> )
            }
          </table>
        </div>
      </div>
    )
  }
}

interface PlanCompProps {
  planRef: firebase.firestore.DocumentReference
}
interface PlanCompState {
  plan?: Plan
}
class PlanComp extends Component<PlanCompProps, PlanCompState> {
  planUnsubscribe?: Function = undefined
  state: PlanCompState = { plan: undefined }

  onPlanUpdate = (snapshop: firebase.firestore.DocumentSnapshot) => {
    let plan = planFromSnapshot(snapshop)
    this.setState({plan})
  }
  componentDidMount() {
    this.planUnsubscribe = this.props.planRef.onSnapshot(this.onPlanUpdate)
  }

  componentWillUnmount() {
    if (this.planUnsubscribe) { this.planUnsubscribe() }
  }

  render() {
    var name = ""
    if (this.state.plan) {
      name = this.state.plan.name
    }
    return (
      <div>
        <h3>{name}</h3>
      </div>
    )
  }
}

export default ScheduleDetail