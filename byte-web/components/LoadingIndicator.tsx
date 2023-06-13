import React from 'react'
import { Spinner } from 'react-bootstrap'

export const LoadingIndicator = () => (
  <Spinner size="sm" animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
)
