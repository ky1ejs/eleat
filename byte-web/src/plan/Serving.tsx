import React, {Component} from "react";
import firebase from "../firebase";
import {Button, Form} from "react-bootstrap";
import {Serving, Item, Plan, savePlan, itemFromSnapshot} from "../model";

interface ServingCompProps {
  plan: Plan;
  mealIndex: number;
  servingIndex: number;
}
interface ServingCompState {
  item?: Item;
}
class ServingComp extends Component<ServingCompProps, ServingCompState> {
  itemUnsubscribe?: () => void;
  state: ServingCompState = {item: undefined};

  onItemUpdate = (doc: firebase.firestore.DocumentSnapshot) => {
    const item = itemFromSnapshot(doc);
    this.setState({item});
  };

  componentDidMount() {
    this.itemUnsubscribe = this.serving().item_ref.onSnapshot(this.onItemUpdate);
  }

  componentWillUnmount() {
    if (this.itemUnsubscribe) {
      this.itemUnsubscribe();
    }
  }

  delete = () => {
    this.props.plan.meals[this.props.mealIndex].servings.splice(this.props.servingIndex, 1);
    savePlan(this.props.plan);
  };

  serving(): Serving {
    return this.props.plan.meals[this.props.mealIndex].servings[this.props.servingIndex];
  }

  render() {
    const item = this.state.item;
    const rows: JSX.Element[] = [];
    if (item) {
      const serving = this.serving();
      const protein = item.protein_per_gram * serving.grams;
      const fat = item.fat_per_gram * serving.grams;
      const carbs = item.carbs_per_gram * serving.grams;
      const calories = protein * 4 + fat * 9 + carbs * 4;
      rows.push(<td>{item.name}</td>);
      rows.push(
        <td>
          <Form.Control type="text" defaultValue={String(this.serving().grams)} />
        </td>
      );
      rows.push(<td>{Math.round(protein)}g</td>);
      rows.push(<td>{Math.round(fat)}g</td>);
      rows.push(<td>{Math.round(carbs)}g</td>);
      rows.push(<td>{Math.round(calories)} kCal</td>);
    }

    return (
      <tr>
        {rows}
        <td>
          <Button onClick={this.delete}>Delete</Button>
        </td>
      </tr>
    );
  }
}

export default ServingComp;
