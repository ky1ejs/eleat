import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import './index.css'
import App from './App'
import Navigation from './Navigation'
import * as serviceWorker from './serviceWorker'

const Plan = () => <h2>Plan</h2>;

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navigation />
      <Route path='/items' component={App} />
      <Route path='/plan' compnent={Plan} />
      <Route exact path='/' render={props => (<Redirect to='items' />)} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
