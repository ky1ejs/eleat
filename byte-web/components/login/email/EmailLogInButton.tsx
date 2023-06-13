import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { EmailLinkLogInModal } from "./EmailLinkLogInModal"

export const EmailLogInButton = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Email Link</Button>
      <EmailLinkLogInModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  )
}
