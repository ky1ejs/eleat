import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import './index.css'
import App from './App'
import Login from './Login'
import CompleteLogin from './CompleteLogin'
import Navigation from './Navigation'
import PlanTable from './plan/PlanTable'
import PlanDetail from './plan/PlanDetail'
import firebase from './firebase'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navigation />
      <Route path='/items' component={App} />
      <Route path='/login' component={Login} />
      <Route exact path='/plan' render={props => {
        if (firebase.auth().currentUser) {
          return <PlanTable userId={firebase.auth().currentUser!.uid} />
        } else {
          return <Redirect to='login' />
        }
      }} />
      <Route exact path='/plan/:id' render={props => {
        console.log(firebase.auth())
        console.log(firebase.auth().currentUser)
        if (firebase.auth().currentUser) {
          let uid = firebase.auth().currentUser!.uid
          let plan_ref = firebase.firestore()
            .collection('users') 
            .doc(uid)
            .collection('plans')
            .doc(props.match.params.id)
          return <PlanDetail plan_ref={ plan_ref } />
        } else {
          return <Redirect to='login' />
        }
      }} />
      <Route exact path='/login/complete' component={CompleteLogin} />
      <Route exact path='/' render={props => (<Redirect to='items' />)} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
