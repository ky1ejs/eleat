import React, { Component } from 'react'
import firebase from "./firebase"
import './App.css'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

interface Item { 
  id: string, 
  name: string,  
  protein_per_gram: number,
  fat_per_gram: number,
  carbs_per_gram: number
}
interface AppState { items: Item[] }

class App extends Component<{}, AppState>  {
  ref = firebase.firestore().collection('items')
  unsubscribe?: Function = undefined
  state: AppState = { items: [] }

  onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot) => {
    const items: Item[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      items.push({
        id: doc.id,
        name: data.name,
        protein_per_gram: data.protein_per_gram,
        fat_per_gram: data.fat_per_gram,
        carbs_per_gram: data.carbs_per_gram
      })
    })
    this.setState({ items })
  }

  addClick = () => {
    var state = this.state
    state.items.push({ 
      id: "", 
      name: "" ,
      protein_per_gram: 0,
      fat_per_gram: 0,
      carbs_per_gram: 0
    })
    this.setState(state)
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
        {this.state.items.map(item => <ItemComp key={item.id} {...item} />)}
        <Button onClick={this.addClick}>Add</Button>
      </div>
    )
  }
}

class ItemComp extends Component<Item> {
  nameTF: HTMLInputElement | undefined
  proteinTF: HTMLInputElement | undefined
  fatTF: HTMLInputElement | undefined
  carbsTF: HTMLInputElement | undefined

  save = (e: any) => {
    e.preventDefault()
    if (this.props.id.length > 0) {

    } else {
      const data = {
        name: this.nameTF!.value,
        protein_per_gram: Number(this.proteinTF!.value),
        fat_per_gram: Number(this.fatTF!.value),
        carbs_per_gram: Number(this.carbsTF!.value)
      }
      
      firebase.firestore().collection('items').add(data)
    }
  }

  render() {
    return (
      <Form inline onSubmit={this.save}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.nameTF = ref }} type="text" defaultValue={this.props.name} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Protein</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.proteinTF = ref}} type="text" defaultValue={String(this.props.protein_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Fat</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.fatTF = ref }} type="text" defaultValue={String(this.props.fat_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>Carbs</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.carbsTF = ref }} type="text" defaultValue={String(this.props.carbs_per_gram)} />
        </FormGroup>{' '}
        <FormGroup>
          Calories
        </FormGroup>{' '}
        <Button type="submit">Save</Button>
      </Form>
    )
  }
}

export default App
