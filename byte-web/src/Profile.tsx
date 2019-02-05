import React, { Component } from 'react'
import firebase from './firebase'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { User, userFromSnaption, saveUser, Sex, bmr } from './model'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface ProfileProps {
  userRef: firebase.firestore.DocumentReference
}
class Login extends Component<ProfileProps, User> {
  userSubscription?: Function
  usernameTF: HTMLInputElement | undefined
  dobPicker?: HTMLInputElement | undefined
  heightTF?: HTMLInputElement | undefined
  weightTF?: HTMLInputElement | undefined
  state: User = { firebase_ref: this.props.userRef }

  onUserUpdate = (snapshot: firebase.firestore.DocumentSnapshot) => {
    let user = userFromSnaption(snapshot)
    this.setState({ ...user })
  }

  componentDidMount() {
    this.userSubscription = this.props.userRef.onSnapshot(this.onUserUpdate)
  }

  componentWillUnmount() {
    if (this.userSubscription) { this.userSubscription() }
  }

  save = (e: any) => {
    e.preventDefault()
    var newData: User = {
      firebase_ref: this.state.firebase_ref,
      dob: this.state.dob
    }
    if (this.usernameTF) { newData.username = this.usernameTF.value }
    if (this.heightTF) {
      let cms = parseInt(this.heightTF.value, 10) 
      let mms = cms * 100
      newData.height_in_milimeters = mms
    }
    if (this.weightTF) { 
      let kgs = parseInt(this.weightTF.value, 10)
      let grams = kgs * 1000
      newData.weight_in_grams =  grams
    }
    newData.sex = Sex.Male
    saveUser(newData)
  }

  onDateChange = (date: Date) => {
    if (!date) { 
      let dob = undefined
      this.setState({dob})
    } else {
      let dob = firebase.firestore.Timestamp.fromDate(date)
      this.setState({dob})
    }
  }

  render() {
    let username = this.state.username
    let date = this.state.dob && this.state.dob.toDate()
    let height = (this.state.height_in_milimeters) ? String(this.state.height_in_milimeters / 100) : undefined
    let weight = (this.state.weight_in_grams) ? String(this.state.weight_in_grams / 1000) : undefined

    return (
      <div>
      <Form inline onSubmit={this.save}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>{' '}
          <FormControl defaultValue={username} inputRef={ref => { this.usernameTF = ref }} type="text" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Height</ControlLabel>{' '}
          <FormControl defaultValue={height} inputRef={ref => { this.heightTF = ref }} type="text" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Weight</ControlLabel>{' '}
          <FormControl defaultValue={weight} inputRef={ref => { this.weightTF = ref }} type="text" />
        </FormGroup>{' '}
        <FormGroup>
          <DatePicker selected={date} onChange={this.onDateChange} />
        </FormGroup>{' '}
        <FormGroup>
          <Button type='submit'>Save</Button>
        </FormGroup>
      </Form>
      <h3>BMR: {bmr(this.state)}</h3>
      </div>
    )
  }
}

export default Login