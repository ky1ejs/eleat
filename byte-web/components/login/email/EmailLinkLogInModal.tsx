import React, { useState } from "react";
import { firebaseApp } from "@db";
import { sendSignInLinkToEmail, getAuth } from "firebase/auth";
import { Modal } from "react-bootstrap";
import { notifications } from "@services";
import { SentModal } from "./SentModal";
import { SendModal } from "./SendModal";

interface State {
  email?: string
  isLoading: boolean
}

export const EmailLinkLogInModal = ({show, onHide}: {show: boolean, onHide: () => void}) => {
  const [state, setState] = useState<State>({isLoading: false})

  const login = ({email}: {email: string}) => {
    if (state.isLoading) return

    const actionCodeSettings = {
      url: window.location.href + "/complete",
      handleCodeInApp: true
    };

    setState(prev => { return {...prev, isLoading: true}})
    sendSignInLinkToEmail(getAuth(firebaseApp), email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        notifications.success(`Email sent to ${email}`)
        setState(prev => { return {...prev, email}})
      })
      .catch((error) => {
        notifications.error(error)
      })
      .finally(() => {
        console.log(state)
        setState(prev => { return {...prev, isLoading: false}})
      });
  };


  const email = state.email
  return (
    <Modal show={show} centered onHide={onHide}>
      {
        email 
          ? <SentModal isLoading={state.isLoading} email={email} resend={() => login({email})} onClose={onHide} />
          : <SendModal isLoading={state.isLoading} onSend={login} />
      }
    </Modal>
    )
}
