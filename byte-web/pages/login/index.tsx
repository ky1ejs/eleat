import React, {useState} from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import {Form, Button} from "react-bootstrap";
import { NextPage } from "next";
import { firebaseApp } from "@db";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string | undefined>()

  const login = (e: any) => {
    e.preventDefault();

    if (!email) return;

    const url = window.location.href + "/complete";
    const actionCodeSettings = {
      url: url,
      handleCodeInApp: true
    };

    console.log(url);

    const auth = getAuth(firebaseApp)
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(() => {
        // Some error occurred, you can inspect the code: error.code
      });
  };

    return (
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Email</Form.Label>{" "}
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>{" "}
        <Button type="submit">Save</Button>
      </Form>
    );
}

export default Login;
