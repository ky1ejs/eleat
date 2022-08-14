import React from "react"
import { LoadingIndicator } from "components/LoadingIndicator";
import { Modal, Button } from "react-bootstrap";

interface SentModalProps {
  isLoading: boolean, 
  email: string, 
  resend: () => void, 
  onClose: () => void
}

export const SentModal = ({isLoading, email, resend, onClose}: SentModalProps) => (
  <div>
    <Modal.Header>
        <Modal.Title>
            Sent!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        An email has been sent to {email} with a log in link.
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={resend} disabled={isLoading}>
        {isLoading ? <LoadingIndicator /> : <>Re-send</>}
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Modal.Footer>
  </div>
)
