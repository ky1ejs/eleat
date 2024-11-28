
const InputField = ({ onChange, label, type }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, label: string; type?: string }) => (
  <div>
    <label>{label}</label><br />
    <input className="rounded w-full h-8 text-black pl-2 focus:outline-none bg-gray-300" type={type} onChange={onChange}></input>
  </div>
);

export default InputField;
