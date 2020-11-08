import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Navbar, NavItem, Nav} from "react-bootstrap";

class Navigation extends Component<{}> {
  render() {
    return (
      <Navbar>
        <Navbar.Brand>Byte</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <NavLink to={"/items"}>Items</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={"/plan"}>Plan</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={"/schedule"}>Schedule</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={"/profile"}>Profile</NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
