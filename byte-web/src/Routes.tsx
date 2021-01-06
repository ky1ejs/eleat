import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import CompleteLogin from "./CompleteLogin";
import Navigation from "./Navigation";
import PlanTable from "./plan/PlanTable";
import PlanDetail from "./plan/PlanDetail";
import ScheduleTable from "./ScheduleTable";
import ScheduleDetail from "./ScheduleDetail";
import Profile from "./Profile";
import firebase from "./firebase";
import {schedulesForUser, plansForUser} from "./model";
import { RecipeTable } from "./RecipeTable";
import { recipesForUser } from "./model/Recipe";
import { RecipeDetailPage } from "./RecipeDetailPage";

export const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Route path="/items" component={App} />
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/plan"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              return <PlanTable userId={firebase.auth().currentUser!.uid} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/plan/:id"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              const uid = firebase.auth().currentUser!.uid;
              const plan_ref = plansForUser(uid).doc(props.match.params.id);
              return <PlanDetail plan_ref={plan_ref} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/recipes"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              return <RecipeTable userId={firebase.auth().currentUser!.uid} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/recipes/:id"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              const uid = firebase.auth().currentUser!.uid;
              const plan_ref = recipesForUser(uid).doc(props.match.params.id);
              return <RecipeDetailPage recipeRef={plan_ref} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/schedule"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              return <ScheduleTable userId={firebase.auth().currentUser!.uid} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/schedule/:id"
          render={(props) => {
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              const uid = firebase.auth().currentUser!.uid;
              const scheduleRef = schedulesForUser(uid).doc(props.match.params.id);
              return <ScheduleDetail scheduleRef={scheduleRef} userId={uid} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route
          exact
          path="/profile"
          render={(props) => {
            console.log(firebase.auth());
            console.log(firebase.auth().currentUser);
            firebase.auth().currentUser?.reload();
            if (firebase.auth().currentUser) {
              const uid = firebase.auth().currentUser!.uid;
              const userRef = firebase.firestore().collection("users").doc(uid);
              return <Profile userRef={userRef} />;
            } else {
              return <Redirect to="login" />;
            }
          }}
        />
        <Route exact path="/login/complete" component={CompleteLogin} />
        <Route exact path="/" render={(props) => <Redirect to="items" />} />
      </div>
    </BrowserRouter>
  );
};
