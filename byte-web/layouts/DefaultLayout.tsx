import React, { ReactNode, CSSProperties } from "react"
import { Navigation } from "@components"
import styles from "./DefaultLayout.module.css"
import { ToastContainer } from "react-toastify"

const toastTyle: CSSProperties = {
  top: '64px',
  position: 'fixed',
};

export const DefaultLayout = ({ children } : {children: ReactNode | ReactNode[]}) => {
  return (
    <>
      <Navigation />
      <main>
        <div className={styles.bodyContainer}>
          {children}
        </div>
        <ToastContainer style={toastTyle} closeOnClick draggable={false} />
      </main>
    </>
  )
}
