import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CpfCnpjPattern } from "../../../utils/constants/patterns";
import { capitalize } from "../../../utils/parse/Capitalize";
import { validateCPF } from "../../../utils/validate/Cpf";
import { validateCNPJ } from "../../../utils/validate/Cnpj";

type Props = {
  label: string;
  name: keyof Client;
  setValue: UseFormSetValue<Client>;
  value?: string;
  required: boolean;
  error?: string;
  onBlur: VoidFunction;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputText({
  label,
  name,
  setValue,
  value,
  required,
  error,
  onBlur,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
      <label htmlFor={name} className="block text-lg font-medium uppercase tracking-wide text-gray-700">
        {capitalize(label)}
        {required && (
          <sup>
            <abbr title="Campo obrigatório">*</abbr>
          </sup>
        )}
      </label>
      <input
        type={name === "cpfCnpj" ? "text" : name === "dataNascimento" ? "date" : "text"}
        id={name}
        name={name}
        className={`block w-full px-4 py-2 mt-2 font-semibold text-gray-700 placeholder-gray-400 border rounded-lg appearance-none focus:outline-none ${error ? "border-red-500" : "border-gray-500"} focus:border-blue-400 focus:shadow-outline-blue sm:text-sm sm:leading-5`}
        ref={(e) => {
          setValue(name, e?.value);
        }}
        value={value}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        pattern={name === "cpfCnpj" ? CpfCnpjPattern : ""}
        title={name === "cpfCnpj" ? "CPF ou CNPJ inválido" : ""}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
