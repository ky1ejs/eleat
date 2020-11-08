import React, {Component} from "react";
import {Item, saveItem, saveNewItem} from "./model";
import {Form, Button} from "react-bootstrap";

interface ItemCompProps {
  item?: Item;
}
export default class ItemComp extends Component<ItemCompProps> {
  nameTF: HTMLInputElement | undefined;
  measureNameTF: HTMLInputElement | undefined;
  proteinTF: HTMLInputElement | undefined;
  fatTF: HTMLInputElement | undefined;
  carbsTF: HTMLInputElement | undefined;

  save = (e: any) => {
    e.preventDefault();
    let item = this.props.item;
    const newItem = {
      name: this.nameTF!.value,
      measure_name: this.measureNameTF!.value,
      protein_per_gram: Number(this.proteinTF!.value),
      fat_per_gram: Number(this.fatTF!.value),
      carbs_per_gram: Number(this.carbsTF!.value)
    };
    if (item) {
      item.firestoreRef.set(newItem);
    } else {
      saveNewItem(newItem);
    }
  };

  render() {
    let name = (this.props.item && this.props.item.name) || "";
    let measureName = (this.props.item && this.props.item.measure_name) || "";
    let protein_per_gram = (this.props.item && this.props.item.protein_per_gram) || 0;
    let carbs_per_gram = (this.props.item && this.props.item.carbs_per_gram) || 0;
    let fat_per_gram = (this.props.item && this.props.item.fat_per_gram) || 0;
    return (
      <Form inline onSubmit={this.save}>
        <Form.Group>
          <Form.Label>Name</Form.Label>{" "}
          <Form.Control
            ref={(ref) => {
              this.nameTF = ref;
            }}
            type="text"
            defaultValue={name}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Measure Name</Form.Label>{" "}
          <Form.Control
            ref={(ref) => {
              this.measureNameTF = ref;
            }}
            type="text"
            defaultValue={measureName}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Protein</Form.Label>{" "}
          <Form.Control
            ref={(ref) => {
              this.proteinTF = ref;
            }}
            type="text"
            defaultValue={String(protein_per_gram)}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Fat</Form.Label>{" "}
          <Form.Control
            ref={(ref) => {
              this.fatTF = ref;
            }}
            type="text"
            defaultValue={String(fat_per_gram)}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Carbs</Form.Label>{" "}
          <Form.Control
            ref={(ref) => {
              this.carbsTF = ref;
            }}
            type="text"
            defaultValue={String(carbs_per_gram)}
          />
        </Form.Group>{" "}
        <Form.Group>Calories</Form.Group> <Button type="submit">Save</Button>
      </Form>
    );
  }
}
