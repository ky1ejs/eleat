import { LoadingIndicator } from "@components";
import { firebaseApp } from "@db";
import { getAuth, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type MaybeUser = User | undefined

interface UserState {
  user?: User
  hasLoadedOnce: boolean
}

const UserContext = createContext<MaybeUser>(undefined)

export const UserProvider = ({children}: {children: React.ReactElement}) => {
  const auth = getAuth(firebaseApp)
  const [state, setState] = useState<UserState>({hasLoadedOnce: false})

  useEffect(() => {
    return auth.onAuthStateChanged(next => {
      setState({user: next ?? undefined, hasLoadedOnce: true})
    })
  })

  return (
    <UserContext.Provider value={state.user}>
      {state.hasLoadedOnce ? children : <LoadingIndicator />}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
