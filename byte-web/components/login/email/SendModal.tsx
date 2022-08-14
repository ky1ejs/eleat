import React from "react"
import { LoadingIndicator } from "components/LoadingIndicator"
import { Form, Modal, Button } from "react-bootstrap"
import { useForm, Controller } from "react-hook-form"

export interface SendEmailLinkFormValues { 
  email: string
}

export const SendModal = ({onSend, isLoading}: {onSend: (values: SendEmailLinkFormValues) => void, isLoading: boolean}) => {
  const {handleSubmit, control} = useForm<SendEmailLinkFormValues>({defaultValues: {email: ""}})

  return (
  <Form onSubmit={handleSubmit(onSend)}>
      <Modal.Header><Modal.Title>Log In with Email Link</Modal.Title></Modal.Header>
      <Modal.Body>
          <Controller
            control={control}
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }, 
              required: true
            }}
            render={({field}) => <Form.Control type="email" {...field} />} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" disabled={isLoading }>
          {isLoading ? <LoadingIndicator /> : <>Save</>}
        </Button></Modal.Footer>
      </Form>
  )
}
