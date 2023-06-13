import { NewServing, Serving } from "@models"
import { NewServingForm } from "./NewServingForm";
import { ServingRowComponent } from "./ServingRowComponent"

interface ServingTableComponentProps {
  servings: Serving[]
  onSave: () => void
}

export function ServingTableComponent({servings, onSave}: ServingTableComponentProps) {
  const createNewServing = (serving: NewServing) => {
    servings.push({grams: serving.grams, item_ref: serving.item.firestoreRef});
    onSave();
  };

  const deleteServing = (index: number) => {
    servings.splice(index, 1)
    onSave();
  };

  return (
    <div>
      <Table servings={servings} onDelete={deleteServing} />
      <NewServingForm onSubmit={createNewServing} />
    </div>
  );
}

const Table = ({servings, onDelete}: {servings: Serving[], onDelete: (index: number) => void}) => (
<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Carbs</th>
          <th>Calories</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {servings.map((serving, index) => {
            return <ServingRowComponent key={index} serving={serving} onDelete={() => onDelete(index)} />
          })}
      </tbody>
    </table>
)
