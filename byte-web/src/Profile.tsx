import React, { Component } from 'react'
import firebase from './firebase'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { User, userFromSnaption, saveUser, Sex, bmr, macroTargets, allActivities, Activity } from './model'
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
  calSurplusTF?: HTMLInputElement | undefined
  proteinTargetTF?: HTMLInputElement | undefined
  carbTargetTF?: HTMLInputElement | undefined
  fatTargetTF?: HTMLInputElement | undefined
  activitySelect?: HTMLInputElement | undefined
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
    if (this.calSurplusTF) {
      newData.caloric_surplus = parseInt(this.calSurplusTF.value, 10)
    }
    if (this.proteinTargetTF && this.carbTargetTF && this.fatTargetTF) {
      let protein = parseInt(this.proteinTargetTF.value, 10) / 100
      let carbs = parseInt(this.carbTargetTF.value, 10) / 100
      let fat = parseInt(this.fatTargetTF.value, 10) / 100
      newData.macros_target = {
        protein_percentage: protein,
        carb_percentage: carbs,
        fat_percentage: fat
      }
    }
    if (this.activitySelect) { 
      let act = this.activitySelect.value as keyof typeof Activity
      newData.activity = Activity[act]
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
    let calSurplus = (this.state.caloric_surplus) ? String(this.state.caloric_surplus) : undefined
    let protein_target = (this.state.macros_target) ? String(this.state.macros_target.protein_percentage * 100) : undefined
    let carbs_target = (this.state.macros_target) ? String(this.state.macros_target.carb_percentage * 100) : undefined
    let fat_target = (this.state.macros_target) ? String(this.state.macros_target.fat_percentage * 100) : undefined
    let targerMacroAmounts = macroTargets(this.state, true)
    let targetCarbs = Math.round(targerMacroAmounts.carbs_in_grams)
    let targetProtein = Math.round(targerMacroAmounts.protein_in_grams)
    let targetFat =  Math.round(targerMacroAmounts.fat_in_grams)
    let targetCals = bmr(this.state, false)
    let targetCalsWithActivity = bmr(this.state, true)
    let totalCals = targetCalsWithActivity + (this.state.caloric_surplus || 0)

    return (
      <div>
      <Form inline onSubmit={this.save}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>{' '}
          <FormControl defaultValue={username} inputRef={ref => { this.usernameTF = ref }} type="text" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Height</ControlLabel>{' '}
          <FormControl defaultValue={height} inputRef={ref => { this.heightTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Weight</ControlLabel>{' '}
          <FormControl defaultValue={weight} inputRef={ref => { this.weightTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>
          <DatePicker selected={date} onChange={this.onDateChange} />
        </FormGroup>{' '}
      <h3>BMR: {targetCals}</h3>
        <FormGroup>
          <ControlLabel>Surplus</ControlLabel>{' '}
          <FormControl defaultValue={calSurplus} inputRef={ref => { this.calSurplusTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>{' '}
          <ControlLabel>Activity</ControlLabel>
          <FormControl inputRef={(ref) => this.activitySelect = ref} componentClass="select" placeholder="select">
            {allActivities.map(act => <option key={act} value={Activity[act]}>{Activity[act]}</option>)}
          </FormControl>
        </FormGroup>
      <h3>BMR + Activity: {targetCalsWithActivity}</h3>
      <h4>Macros</h4>
        <FormGroup>
          <ControlLabel>Protein</ControlLabel>{' '}
          <FormControl defaultValue={protein_target} inputRef={ref => { this.proteinTargetTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Carbs</ControlLabel>{' '}
          <FormControl defaultValue={carbs_target} inputRef={ref => { this.carbTargetTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Fat</ControlLabel>{' '}
          <FormControl defaultValue={fat_target} inputRef={ref => { this.fatTargetTF = ref }} type="number" />
        </FormGroup>{' '}
        <FormGroup>
          <Button type='submit'>Save</Button>
        </FormGroup>
        <h4>Target Cals: {totalCals}</h4>
        <h4>Protein = {targetProtein}g, Carbs = {targetCarbs}g, Fat = {targetFat}g</h4>
      </Form>
      </div>
    )
  }
}

export default Login