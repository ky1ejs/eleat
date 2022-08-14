import React from "react";
import {Button} from "react-bootstrap";
import { NextPage } from "next";
import styles from "./index.module.css"
import { EmailLogInButton, LoadingIndicator } from "@components";

const Login: NextPage = () => {
    return (
      <div className={styles.login}>
        <h1>Log In</h1>
        <p>
          To start making nutrition plans you need to log in or create an account.
        </p>
        <EmailLogInButton />
        <Button>Google</Button>
        <Button>Apple</Button>
      </div>
    );
}

export default Login;
