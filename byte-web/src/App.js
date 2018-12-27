import React, { Component } from 'react';
import firebase from "./firebase";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('items');
    this.unsubscribe = null;
    this.state = {
      items: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      const { name } = doc.data();
      items.push({ 
        name: name,
        id: doc.id
      });
    });
    this.setState({ items });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item =>
              <tr key={item.id}>
                <td>{item.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
