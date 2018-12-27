import React, { Component } from 'react'
import firebase from "./firebase"
import './App.css'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'


interface Item { id: string, name: string }
interface AppState { items: Item[] }

class App extends Component<{}, AppState>  {
  ref = firebase.firestore().collection('items')
  unsubscribe?: Function = undefined
  state: AppState = { items: [] }

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    const items: Item[] = []
    querySnapshot.forEach((doc) => {
      const { name } = doc.data()
      items.push({
        id: doc.id,
        name: name
      })
    })
    this.setState({ items })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    if (this.unsubscribe) { this.unsubscribe() }
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => <ItemComp key={item.id} item={item} />)}
      </div>
    )
  }
}

interface ItemCompProps { item: Item }
class ItemComp extends Component<ItemCompProps> {
  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl type="text" defaultValue={this.props.item.name} />
        </FormGroup>{' '}
        <Button type="submit">Save</Button>
      </Form>
    )
  }
}

export default App
