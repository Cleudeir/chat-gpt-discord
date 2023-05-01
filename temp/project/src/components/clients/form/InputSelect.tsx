import { FunctionComponent } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Zodenum } from "zod";

type Props = {
  label: string;
  register: UseFormRegister<FieldValues>;
  options: Zodenum<any>;
};

const InputSelect: FunctionComponent<Props> = ({ label, register, options }) => {
  return (
    <div>
      <label>
        {label}
        <select {...register} className="block w-full p-2 mt-1 bg-gray-100 rounded-lg" placeholder={label}>
          {options.enum.map((option: any) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default InputSelect;

