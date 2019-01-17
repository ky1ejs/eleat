import React, { Component, FormEvent } from 'react'
import firebase from './firebase'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'
import { Schedule, scheduleFromSnapshot,  schedulesForUser } from './model'

interface ScheduleTableProps { userId: string }
interface ScheduleTableState { schedules: Schedule[] }
class PlanTable extends Component<ScheduleTableProps, ScheduleTableState>  {
  ref = schedulesForUser(this.props.userId)
  nameTF: HTMLInputElement | undefined
  unsubscribe?: Function = undefined
  state: ScheduleTableState = { schedules: [] }

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let schedules = querySnapshot.docs.map(scheduleFromSnapshot)
    this.setState({ schedules })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    if (this.unsubscribe) { this.unsubscribe() }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault()
    let name = this.nameTF!.value
    if (name.length > 0) {
      this.ref.add({ name })
    }
  }

  render() {
    return (
      <div>
        {this.state.schedules.map(schedule => <ScheduleComp key={schedule.firebaseRef.id} {...schedule} />)}
        <Form inline onSubmit={this.addClick}>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>{' '}
            <FormControl inputRef={(ref) => this.nameTF = ref} type='text' />
          </FormGroup>{' '}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

class ScheduleComp extends Component<Schedule> {
  delete = () => {
    this.props.firebaseRef.delete()
  }

  render() {
    return (
      <div>
        <Form inline>
          <FormGroup>
            <ControlLabel>{this.props.name}</ControlLabel>{' '}
          </FormGroup>{' '}
          <Button type="submit">
            <Link to={'schedule/' + this.props.firebaseRef.id}>
              View
            </Link>
          </Button>
          <Button onClick={this.delete}> Delete </Button>
        </Form>
      </div>
    )
  }
}


export default PlanTable