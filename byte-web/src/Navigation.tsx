import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

class Navigation extends Component<{}>  {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Byte
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            <NavLink to="/items">Items</NavLink>
          </NavItem>
          <NavItem eventKey={2}>
            <NavLink to="/plan">Plan</NavLink>
          </NavItem>
          <NavItem eventKey={3}>
            <NavLink to="/schedule">Schedule</NavLink>
          </NavItem>
          <NavItem eventKey={4}>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation