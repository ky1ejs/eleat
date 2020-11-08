import React, {Component} from "react";
import firebase from "./firebase";
import "./App.css";
import ItemComp from "./ItemComp";
import * as Model from "./model";

interface AppState {
  items: Model.Item[];
}
class App extends Component<{}, AppState> {
  ref = firebase.firestore().collection("items");
  unsubscribe?: Function = undefined;
  state: AppState = {items: []};

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    let items = querySnapshot.docs.map(Model.itemFromSnapshot);
    this.setState({items});
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        {this.state.items.map((item) => (
          <ItemComp key={item.firestoreRef.id} item={item} />
        ))}
        <ItemComp key="new" />
      </div>
    );
  }
}

export default App;
