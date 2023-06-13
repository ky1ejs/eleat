import { Form } from "react-bootstrap";
import { FieldValues, Path, Control, Controller } from "react-hook-form";

interface FormFieldProps<T extends FieldValues = FieldValues, V extends Path<T> = Path<T>> {
  control: Control<T, V>, 
  name: V, 
  isRequired: boolean,
  formId?: string
}

export const FormField = <T extends FieldValues = FieldValues, V extends Path<T> = Path<T>> ({control, name, isRequired, formId}: FormFieldProps<T, V>) => (
  <Controller<T, V>
    control={control}
    name={name}
    rules={{required: isRequired}}
    render={({field: {onChange, value, ref}}) => (
      <Form.Control form={formId} onChange={onChange} value={value} ref={ref}/>
    )}
  />
)
