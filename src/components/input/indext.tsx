import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  error?: string;
  rules?: RegisterOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  type: string;
  placeholder: string;
}

const Input = ({
  name,
  placeholder,
  type,
  error,
  register,
  rules,
}: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
        className="w-full border-2 rounded-md h-11 px-2"
      />
      {error && <p className="my-1 text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
