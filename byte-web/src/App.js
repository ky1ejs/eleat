import React, { Component } from 'react'
import firebase from "./firebase"
import './App.css'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

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
        {this.state.items.map(item => <Item key={item.id} name={item.name} />)}
      </div>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl type="text" defaultValue={this.props.name} />
        </FormGroup>{' '}
        <Button type="submit">Save</Button>
      </Form>
    )
  }
}

export default App;
