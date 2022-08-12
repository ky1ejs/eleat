import React from "react";
import {Navbar, Nav, NavLink} from "react-bootstrap";

export const Navigation = () => (
  <Navbar>
    <Navbar.Brand>Byte</Navbar.Brand>
    <Nav>
      <Nav.Item>
        <NavLink href="/items">Items</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink href="/plan">Plan</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink href="/recipes">Recipes</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink href="/schedule">Schedule</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink href="/profile">Profile</NavLink>
      </Nav.Item>
    </Nav>
  </Navbar>
)
