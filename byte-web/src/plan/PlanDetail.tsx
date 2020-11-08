import React, {Component, FormEvent} from "react";
import firebase from "../firebase";
import {Table, Form, Button, Tab} from "react-bootstrap";
import {
  Plan,
  planFromSnapshot,
  savePlan,
  Nutrition,
  calculateNutritionForPlan,
  userFromSnaption,
  macroTargets
} from "../model";
import MealComp from "./Meal";
import {User} from "../model";
import {Bar, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";

interface PlanDetailState {
  plan?: Plan;
  nutrition?: Nutrition;
  user?: User;
}
interface PlanDetailProps {
  plan_ref: firebase.firestore.DocumentReference;
}
class PlanDetail extends Component<PlanDetailProps, PlanDetailState> {
  planUnsubscribe?: Function = undefined;
  mealNameTF: HTMLInputElement | undefined;
  state: PlanDetailState = {
    plan: undefined,
    nutrition: undefined,
    user: undefined
  };

  onPlanUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    let plan = planFromSnapshot(querySnapshot);
    this.setState({plan});
    calculateNutritionForPlan(plan).then((nutrition) => {
      this.setState({nutrition});
    });
  };

  componentDidMount() {
    this.planUnsubscribe = this.props.plan_ref.onSnapshot(this.onPlanUpdate);

    let currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        let user = userFromSnaption(snapshot);
        this.setState({user});
      });
  }

  componentWillUnmount() {
    if (this.planUnsubscribe) {
      this.planUnsubscribe();
    }
  }

  addClick = (e: FormEvent) => {
    e.preventDefault();
    let plan = this.state.plan;
    if (plan) {
      plan.meals.push({name: this.mealNameTF!.value, servings: []});
      savePlan(plan);
    }
  };

  render() {
    let plan = this.state.plan;
    let user = this.state.user;
    var planInfo: JSX.Element[] = [];
    var meals: JSX.Element[] = [];
    if (plan) {
      planInfo.push(<h2>{plan.name}</h2>);
      let nutrition = this.state.nutrition;
      if (nutrition) {
        if (user) {
          let mTargets = macroTargets(user, true);
          const marcroData = [
            {
              name: "Protein",
              plan: Math.round(nutrition.protein),
              target: Math.round(mTargets.protein_in_grams),
              diff: Math.round(mTargets.protein_in_grams - nutrition.protein)
            },
            {
              name: "Carbs",
              plan: Math.round(nutrition.carbs),
              target: Math.round(mTargets.carbs_in_grams),
              diff: Math.round(mTargets.carbs_in_grams - nutrition.carbs)
            },
            {
              name: "Fat",
              plan: Math.round(nutrition.fat),
              target: Math.round(mTargets.fat_in_grams),
              diff: Math.round(mTargets.fat_in_grams - nutrition.fat)
            }
          ];
          const calorieData = [
            {
              name: "Calories",
              plan: Math.round(nutrition.cals),
              target: Math.round(mTargets.cals),
              diff: Math.round(mTargets.cals - nutrition.cals)
            }
          ];
          let planCellStyle = {
            backgroundColor: "#8884d8"
          };
          let targetCellStyle = {
            backgroundColor: "#82ca9d"
          };
          var rows = marcroData.map((d) => {
            return (
              <tr>
                <td>{d.name}</td>
                <td style={planCellStyle}>{d.plan}g</td>
                <td style={targetCellStyle}>{d.target}g</td>
                <td>{d.diff}g</td>
              </tr>
            );
          });
          rows.push(
            <tr>
              <td>{calorieData[0].name}</td>
              <td style={planCellStyle}>{calorieData[0].plan} kCal</td>
              <td style={targetCellStyle}>{calorieData[0].target} kCal</td>
              <td>{calorieData[0].diff} kCal</td>
            </tr>
          );
          let tableStyle = {
            width: 450
          };
          planInfo.push(
            <div>
              <Table style={tableStyle} responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Plan</th>
                    <th>Target</th>
                    <th>Diff</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
              <BarChart width={730} height={250} data={marcroData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plan" fill="#8884d8" />
                <Bar dataKey="target" fill="#82ca9d" />
              </BarChart>
              <BarChart width={730} height={250} data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plan" fill="#8884d8" />
                <Bar dataKey="target" fill="#82ca9d" />
              </BarChart>
            </div>
          );
        } else {
          planInfo.push(<h4>Protein: {Math.round(nutrition.protein)}g</h4>);
          planInfo.push(<h4>Carb: {Math.round(nutrition.carbs)}g</h4>);
          planInfo.push(<h4>Fat: {Math.round(nutrition.fat)}g</h4>);
          planInfo.push(<h4>Cals: {Math.round(nutrition.cals)}kCal</h4>);
        }
      }

      for (var i = 0; i < plan.meals.length; i++) {
        meals.push(<MealComp key={i} plan={plan} mealIndex={i} />);
      }
    }
    return (
      <div>
        <div>{planInfo}</div>
        <div>{meals}</div>
        <div>
          <Form inline onSubmit={this.addClick}>
            <Form.Group>
              <Form.Label>Meal Name</Form.Label>{" "}
              <Form.Control ref={(ref) => (this.mealNameTF = ref)} type="text" />
            </Form.Group>{" "}
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PlanDetail;
