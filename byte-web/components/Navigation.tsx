import "./Navigation.module.css"
import React from "react";
import { firebaseApp } from "@db";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import {Navbar, Nav, NavLink, Button} from "react-bootstrap";
import Link from "next/link";

interface Item {
  path: string, 
  name: string
}

const UserStatus = () => {
  const auth = getAuth(firebaseApp)
  const router = useRouter()

  const logIn = () => {
    router.push("/login")
  }

  const logOut = () => {

  }

  return (
    <>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
  <Navbar.Text>
    {auth.currentUser
          ? <div>
              {auth.currentUser.displayName}
              <Button onClick={logOut}>Log Out</Button>
            </div>
          : <div><Button onClick={logIn}>Log In</Button></div>
        }
  </Navbar.Text>
  </Navbar.Collapse>
  </>
  )
}

export const Navigation = () => {
  const router = useRouter()

  let items: Item[] = [
    {path: "/items", name: "Items" },
    {path: "/plan", name: "Plan"},
    {path: "/recipes", name: "Recipes"},
    {path: "/schedule", name: "Schedule"},
    {path: "/profile", name: "Profile"}
  ]

  const isItemActive = (item: Item): boolean => {
    return router.asPath === item.path
  }

  return (
    <div className="navigation">
      <Navbar>
      <Navbar.Brand>Byte</Navbar.Brand>
      <Nav>
        {
          items.map(i => (
            <Nav.Item key={i.name}>
              <Link href={i.path}>{i.name}</Link>
            </Nav.Item>
          ))
        }
      </Nav>
      <UserStatus/>
      </Navbar>
    </div>
  )
}
