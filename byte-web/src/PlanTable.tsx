import React, { Component, FormEvent } from 'react'
import firebase from './firebase'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'

interface PlanProps { userId: string }
interface Plan { id: string, name: string }
interface PlanTableState { plans: Plan[] }
class PlanTable extends Component<PlanProps, PlanTableState>  {
  ref = firebase.firestore().collection('users/' + this.props.userId + '/plans')
  nameTF: HTMLInputElement | undefined
  unsubscribe?: Function = undefined
  state: { plans: Plan[] } = { plans: [] }

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    var plans: Plan[] = []
    querySnapshot.forEach((doc) => { 
      plans.push({ id: doc.id, name: doc.data().name })
    })
    this.setState({plans})
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
        { this.state.plans.map(plan => <PlanComp key={plan.id} {...plan} />) }
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

class PlanComp extends Component<Plan> {
  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>{this.props.name}</ControlLabel>{' '}
        </FormGroup>{' '}
        <Button type="submit">View</Button>
        <Button type="submit">Delete</Button>
      </Form>
    )
  }
}


export default PlanTable