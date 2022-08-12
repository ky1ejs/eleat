import React, { ReactNode } from "react"
import { Navigation } from "@components"

export const DefaultLayout = ({ children } : {children: ReactNode | ReactNode[]}) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
