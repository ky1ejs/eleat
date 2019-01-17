import React, { Component, FormEvent } from 'react'
import firebase from './firebase'
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { Schedule, Plan, plansForUser, scheduleFromSnapshot, saveSchedule, planFromSnapshot } from './model'

interface ScheduleDetailState {
  schedule?: Schedule,
  plans: Plan[]
}
interface ScheduleDetailProps {
  scheduleRef: firebase.firestore.DocumentReference,
  userId: string
}
class ScheduleDetail extends Component<ScheduleDetailProps, ScheduleDetailState>  {
  scheduleUnsubscribe?: Function = undefined
  plansUnsubscribe?: Function = undefined
  planSelect: HTMLInputElement | undefined
  state: ScheduleDetailState = { schedule: undefined, plans: [] }

  onScheduleUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let schedule = scheduleFromSnapshot(querySnapshot)
    this.setState({ schedule })
  }

  onPlansUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let plans = querySnapshot.docs.map(planFromSnapshot)
    this.setState({ plans })
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
    return (
      <div>
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <ControlLabel>Select</ControlLabel>
            <FormControl inputRef={(ref) => this.planSelect = ref} componentClass="select" placeholder="select">
              {this.state.plans.map(plan => <option key={plan.firebaseRef.id} value={plan.firebaseRef.path}>{plan.name}</option>)}
            </FormControl>
          </FormGroup>{' '}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

export default ScheduleDetail