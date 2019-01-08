import React, { Component, FormEvent } from 'react'
import firebase from './firebase'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'
import { Plan, planFromSnapshot } from './model'

interface PlanProps { userId: string }
interface PlanTableState { plans: Plan[] }
class PlanTable extends Component<PlanProps, PlanTableState>  {
  ref = firebase.firestore().collection('users/' + this.props.userId + '/plans')
  nameTF: HTMLInputElement | undefined
  unsubscribe?: Function = undefined
  state: { plans: Plan[] } = { plans: [] }

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let plans: Plan[] = querySnapshot.docs.map(function (snap) {
      return planFromSnapshot(snap)
    })
    this.setState({ plans })
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
    let isPublic = false
    if (name.length > 0) {
      this.ref.add({ name, isPublic })
    }
  }

  render() {
    return (
      <div>
        { this.state.plans.map(plan => <PlanComp key={plan.firebaseRef.id} { ...plan } />) }
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
            <Link to={'plan/' + this.props.firebaseRef.id}>
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