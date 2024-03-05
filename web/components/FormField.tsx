import {
  FieldValues,
  Path,
  Control,
  Controller,
  FieldValue,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";

type FormFieldProps<
  T extends FieldValues = FieldValues,
  V extends Path<T> = Path<T>,
> = {
  control: Control<T, V>;
  name: V;
  isRequired?: boolean;
  formId?: string;
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const FormField = <
  T extends FieldValues = FieldValues,
  V extends Path<T> = Path<T>,
>(
  props: FormFieldProps<T, V>,
) => {
  const { control, name, isRequired, formId, label } = props;
  return (
    <Controller<T, V>
      control={control}
      name={name}
      rules={{ required: isRequired ?? false }}
      render={({ field: { onChange, value, ref } }) => (
        <div>
          {label && <label className="ml-2 block">{label}</label>}
          <input
            {...props}
            className="m-2 rounded-md border-2 p-2"
            form={formId}
            onChange={onChange}
            value={value}
            ref={ref}
          />
        </div>
      )}
    />
  );
};

type NewProps<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  isRequired?: boolean;
  label?: string;
};

export const NewField = <TFieldValues extends FieldValues>({
  name,
  register,
  isRequired,
  label,
}: NewProps<TFieldValues>) => {
  return (
    <div>
      {label && <label className="ml-2 block">{label}</label>}
      <input className="m-2 rounded-md border-2 p-2" {...register(name)} />
    </div>
  );
};
