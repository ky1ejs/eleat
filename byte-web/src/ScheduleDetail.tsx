import React, {Component, FormEvent} from "react";
import firebase from "./firebase";
import {Form, Button} from "react-bootstrap";
import {
  ShoppingListItem,
  generateShoppingListForPlans,
  Schedule,
  Plan,
  plansForUser,
  scheduleFromSnapshot,
  saveSchedule,
  planFromSnapshot,
  Nutrition
} from "./model";

interface ScheduleDetailState {
  schedule?: Schedule;
  plans: Plan[];
  shoppingList: ShoppingListItem[];
}
interface ScheduleDetailProps {
  scheduleRef: firebase.firestore.DocumentReference;
  userId: string;
}
class ScheduleDetail extends Component<ScheduleDetailProps, ScheduleDetailState> {
  scheduleUnsubscribe?: () => void;
  plansUnsubscribe?: () => void;
  planSelect: HTMLInputElement | undefined;
  state: ScheduleDetailState = {schedule: undefined, plans: [], shoppingList: []};

  onScheduleUpdate = (querySnapshot: firebase.firestore.DocumentSnapshot) => {
    const schedule = scheduleFromSnapshot(querySnapshot);
    this.setState({schedule});
    this.getAndgenerateShoppingListForPlans(schedule.plans).then((shoppingList) => {
      this.setState({shoppingList});
    });
  };

  onPlansUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    const plans = querySnapshot.docs.map(planFromSnapshot);
    this.setState({plans});
  };

  async getAndgenerateShoppingListForPlans(
    refs: firebase.firestore.DocumentReference[]
  ): Promise<ShoppingListItem[]> {
    const refsAndPlans = new Map<string, {count: number; plan: Plan}>();
    for (const ref of refs) {
      const existingPlan = refsAndPlans.get(ref.id);
      console.log(ref.id);
      if (existingPlan) {
        existingPlan.count += 1;
      } else {
        const snapshot = await ref.get();
        refsAndPlans.set(ref.id, {
          count: 1,
          plan: planFromSnapshot(snapshot)
        });
      }
    }
    const plans = Array.from(refsAndPlans.values())
      .map((planCount) => {
        const repeatedPlans = new Array<Plan>();
        for (let i = 0; i < planCount.count; i++) {
          repeatedPlans.push(planCount.plan);
        }
        return repeatedPlans;
      })
      .flat();
    const list = await generateShoppingListForPlans(plans);
    return Array.from(list.values());
  }

  componentDidMount() {
    this.scheduleUnsubscribe = this.props.scheduleRef.onSnapshot(this.onScheduleUpdate);
    this.plansUnsubscribe = plansForUser(this.props.userId).onSnapshot(this.onPlansUpdate);
  }

  componentWillUnmount() {
    if (this.scheduleUnsubscribe) {
      this.scheduleUnsubscribe();
    }
    if (this.plansUnsubscribe) {
      this.plansUnsubscribe();
    }
  }

  addClick = (e: FormEvent) => {
    e.preventDefault();
    const plan_ref = firebase.firestore().doc(this.planSelect!.value);
    const schedule = this.state.schedule;
    if (schedule) {
      schedule.plans.push(plan_ref);
      saveSchedule(schedule);
    }
  };

  render() {
    let plans: JSX.Element[] = [];
    const schedule = this.state.schedule;
    if (schedule) {
      plans = schedule.plans.map((ref) => <PlanComp key={`${ref}`} planRef={ref} />);
    }
    return (
      <div>
        {plans}
        <Form inline onSubmit={this.addClick}>
          <Form.Group>
            <Form.Label>Select</Form.Label>
            <Form.Control ref={(ref) => (this.planSelect = ref)} as="select" placeholder="select">
              {this.state.plans.map((plan) => (
                <option key={plan.firebaseRef.id} value={plan.firebaseRef.path}>
                  {plan.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>{" "}
          <Button type="submit">Save</Button>
        </Form>
        <br />
        <br />
        <div>
          <h3>Shopping List</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
            {this.state.shoppingList.map((item) => (
              <tr key={`${item.item.name}-row`}>
                <td key={item.item.name}>{item.item.name}</td>
                <td key={`${item.item.name}-data`}>
                  {item.grams} {item.item.measure_name}
                  {item.grams > 1 ? "s" : ""}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

interface PlanCompProps {
  planRef: firebase.firestore.DocumentReference;
}
interface PlanCompState {
  plan?: Plan;
}
class PlanComp extends Component<PlanCompProps, PlanCompState> {
  planUnsubscribe?: () => void;
  state: PlanCompState = {plan: undefined};

  onPlanUpdate = (snapshop: firebase.firestore.DocumentSnapshot) => {
    const plan = planFromSnapshot(snapshop);
    this.setState({plan});
  };
  componentDidMount() {
    this.planUnsubscribe = this.props.planRef.onSnapshot(this.onPlanUpdate);
  }

  componentWillUnmount() {
    if (this.planUnsubscribe) {
      this.planUnsubscribe();
    }
  }

  render() {
    let name = "";
    if (this.state.plan) {
      name = this.state.plan.name;
    }
    return (
      <div>
        <h3>{name}</h3>
      </div>
    );
  }
}

export default ScheduleDetail;
