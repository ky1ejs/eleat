import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export const GoogleLogInButton = () => {
  const logIn = () => {
    signInWithRedirect(getAuth(), new GoogleAuthProvider());
  }

  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        console.log(`Current user: ${auth.currentUser?.email}`)
        auth.onAuthStateChanged(uesr => {
          console.log(uesr)
        })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  })

  return (
    <Button onClick={logIn}>Google</Button>
  )
}
