import { Col, Form } from "react-bootstrap";
import { FieldValues, Path, Control, Controller } from "react-hook-form";

export const FormField = <T extends FieldValues = FieldValues, V extends Path<T> = Path<T>>({control, name, label, isRequired}: {control: Control<T, V>, name: V, label: string, isRequired: boolean}) => (
  <>
    <Form.Group>
      <Form.Label>{label}</Form.Label>{" "}
      <Controller<T, V>
        control={control}
        name={name}
        rules={{required: isRequired}}
        render={({field: {onChange, value, ref}}) => (
          <Form.Control onChange={onChange} value={value} ref={ref}/>
        )}
      />
    </Form.Group>
  </>
)
