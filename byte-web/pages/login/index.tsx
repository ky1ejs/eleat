import React from "react";
import { NextPage } from "next";
import styles from "./index.module.css"
import { SupabaseLogin } from "@components";

const Login: NextPage = () => {
    return (
      <div className={styles.login}>
        <h1>Log In</h1>
        <p>
          To start making nutrition plans you need to log in or create an account.
        </p>
        <SupabaseLogin/>
      </div>
    );
}

export default Login;
