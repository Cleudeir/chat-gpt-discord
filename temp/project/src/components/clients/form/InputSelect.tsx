import { Client } from "@/types/client";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  label: string;
  name: keyof Omit<Client, 'endereco'> | (`endereco.${keyof Endereco}`);
  form: UseFormReturn<Client>;
  options: string[];
}

const InputSelect: FC<Props> = ({ label, name, form, options }) => {
  return (
    <div className="my-4">
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...form.register(name)}
        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg shadow-sm focus:border-blue-500 focus:outline-none focus:shadow-outline-blue form-select"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
