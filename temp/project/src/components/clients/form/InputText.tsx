import React, { FC } from 'react';
import { UseFormRegisterReturn, UseFormReturn, FieldValues } from 'react-hook-form';
import { Client } from '@/types/client';
import { Endereco } from '@/types/endereco';

interface InputTextProps {
  label: string;
  name: keyof Omit<Client, 'endereco'> | (`endereco.${keyof Endereco}`);
  form: UseFormReturn<Client>;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const InputText: FC<InputTextProps> = ({
  label,
  name,
  form,
  placeholder,
  required = true,
  type = 'text',
}: InputTextProps): JSX.Element => {
  const { errors } = form.formState;

  return (
    <div className="form-group w-full p-2">
      <label htmlFor={`${name}-input`} className="block text-gray-700 font-bold mb-2">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        {...form.register(name, { required })}
        type={type}
        id={`${name}-input`}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors && errors[name] ? 'border-red-500' : ''
        }`}
      />
      {errors && errors[name] && (
        <div className="text-red-500 text-sm mt-1">{errors[name].message}</div>
      )}
    </div>
  );
};

export default InputText;