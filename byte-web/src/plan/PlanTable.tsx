import React, {Component, FormEvent} from "react";
import firebase from "../firebase";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {Plan, planFromSnapshot, savePlan} from "../model";

interface PlanProps {
  userId: string;
}
interface PlanTableState {
  plans: Plan[];
}
class PlanTable extends Component<PlanProps, PlanTableState> {
  ref = firebase.firestore().collection("users/" + this.props.userId + "/plans");
  nameTF: HTMLInputElement | undefined;
  unsubscribe?: Function = undefined;
  state: {plans: Plan[]} = {plans: []};

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let plans = querySnapshot.docs.map(planFromSnapshot);
    this.setState({plans});
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  addClick = (e: FormEvent<Form>) => {
    e.preventDefault();
    let name = this.nameTF!.value;
    let isPublic = false;
    if (name.length > 0) {
      this.ref.add({name, isPublic});
    }
  };

  render() {
    return (
      <div>
        {this.state.plans.map((plan) => (
          <PlanComp key={plan.firebaseRef.id} {...plan} />
        ))}
        <Form inline onSubmit={this.addClick}>
          <Form.Group>
            <Form.Label>Name</Form.Label>{" "}
            <Form.Control ref={(ref) => (this.nameTF = ref)} type="text" />
          </Form.Group>{" "}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}

class PlanComp extends Component<Plan> {
  delete = () => {
    this.props.firebaseRef.delete();
  };

  duplicate = () => {
    let name = this.props.name + " Copy";
    this.props.firebaseRef.parent.add({name: name, isPublic: false}).then((firebaseRef) => {
      savePlan({...this.props, firebaseRef, name});
    });
  };

  render() {
    return (
      <div>
        <Form inline>
          <Form.Group>
            <Form.Label>{this.props.name}</Form.Label>{" "}
          </Form.Group>{" "}
          <Button type="submit">
            <Link to={"plan/" + this.props.firebaseRef.id}>View</Link>
          </Button>
          <Button onClick={this.delete}> Delete </Button>
          <Button onClick={this.duplicate}> Duplicate </Button>
        </Form>
      </div>
    );
  }
}

export default PlanTable;
