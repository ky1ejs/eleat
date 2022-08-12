import { NextPage } from "next";
import React, {useEffect} from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { firebaseApp } from "@db";

const CompleteLogin: NextPage = () => {
  useEffect(() => {
    try {
      const url = window.location.href;
      const auth = getAuth(firebaseApp)
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
          return
        }

        // Signin user and remove the email localStorage
        signInWithEmailLink(auth, email, url)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            console.log("loggedIn");
            console.log(result);
          });
      }
    } catch (err) {
      console.log(err);
    }
  })

  return <div>hello</div>;
}

export default CompleteLogin;
