import React, { Component } from 'react'
import firebase from './firebase'

class CompleteLogin extends Component {

  async componentDidMount() {
    try {
      const url = window.location.href
      if (firebase.auth().isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn')

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation')
        }

        // Signin user and remove the email localStorage
        const result = await firebase.auth().signInWithEmailLink(email!, url)
        window.localStorage.removeItem('emailForSignIn')
        console.log('loggedIn')
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default CompleteLogin