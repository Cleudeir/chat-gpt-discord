import InputText from "./InputText";
import InputSelect from "./InputSelect";

type FormProps = {
  onSubmit: (data: any) => void;
  initialValues?: any;
}

type FormData = {
  nome: string;
  sobreNome: string;
  email: string;
  senha: string;
  cpfCnpj: string;
  dataNascimento: string;
  sexo: string;
  cep: string;
  telefone: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  status: boolean;
};

// Zod schema for form validation
const schema = z.object({
  nome: z.string().nonempty({ message: "O campo Nome é obrigatório" }),
  sobreNome: z.string().nonempty({message: "O campo Sobrenome é obrigatório" }),
  cpfCnpj: z.string().refine((val) => val.length === 14 || val.length === 18, {
    message: "O campo CPF/CNPJ deve ter 11 ou 14 caracteres",
  }),
  dataNascimento: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Data de nascimento inválida",
  }),
  email: z.string().email({ message: "Insira um e-mail válido" }),
  senha: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/,
      "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ),
  cep: z.string().refine((val) => val.length === 9, {
    message: "O CEP deve ter 8 caracteres",
  }),
  endereco: enderecoSchema,
  telefone: z.string().nonempty({
    message: "O campo Telefone é obrigatório",
  }),
  status: z.boolean(),
  sexo: z.string(),
});

export default function Form({ onSubmit, initialValues = {} }: FormProps) {
  const resolver = zodResolver(schema);
  const { register, handleSubmit, formState, reset, setValue } = useForm<FormData>({
    resolver,
    defaultValues: initialValues,
  });

  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <h2 className="text-xl text-center font-semibold mb-2">Dados Pessoais</h2>
      <div className="mb-3">
        <InputText
          label="Nome"
          {...register("nome", { required: true })}
          error={errors?.nome?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Sobrenome"
          {...register("sobreNome", { required: true })}
          error={errors?.sobreNome?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="CPF/CNPJ"
          {...register("cpfCnpj", { required: true })}
          error={errors?.cpfCnpj?.message}
          mask={(value: string) => CPFCNPJ(value)}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Data de Nascimento"
          type="date"
          {...register("dataNascimento", { required: true })}
          error={errors?.dataNascimento?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Email"
          type="email"
          {...register("email", { required: true })}
          error={errors?.email?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Senha"
          type="password"
          {...register("senha", { required: true })}
          error={errors?.senha?.message}
        />
      </div>
      <hr className="border-gray-300 mb-5" />
      <h2 className="text-xl text-center font-semibold mb-2">Endereço</h2>
      <div className="mb-3">
        <InputText
          label="CEP"
          {...register("cep", { required: true })}
          error={errors?.cep?.message}
          mask={(value: string) => value.replace(/^(\d{5})(\d{3})$/, "$1-$2")}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const { value } = e.target;
            fetch(`https://viacep.com.br/ws/${value}/json/`)
            .then(response => response.json())
            .then(data => {
              if (!data.erro) {
                const { logradouro, bairro, localidade, uf } = data;
                setValue('endereco', {
                  logradouro,
                  bairro,
                  localidade,
                  uf,
                  numero: "",
                  complemento: ""
                });
              }
            });
          }}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Logradouro"
          {...register("endereco.logradouro", { required: true })}
          error={errors?.endereco?.logradouro?.message}
          readOnly
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Número"
          {...register("endereco.numero")}
          error={errors?.endereco?.numero?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Complemento"
          {...register("endereco.complemento")}
          error={errors?.endereco?.complemento?.message}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Bairro"
          {...register("endereco.bairro", { required: true })}
          error={errors?.endereco?.bairro?.message}
          readOnly
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Localidade"
          {...register("endereco.localidade", { required: true })}
          error={errors?.endereco?.localidade?.message}
          readOnly
        />
      </div>
      <div className="mb-3">
        <InputSelect
          label="Estado"
          {...register("endereco.uf", { required: true })}
          error={errors?.endereco?.uf?.message}
          options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((ufs) => ({ value: ufs, label: ufs }))}
        />
      </div>
      <div className="mb-3">
        <InputText
          label="Telefone"
          {...register("telefone", { required: true })}
          error={errors?.telefone?.message}
          mask={(value: string) => value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}
        />
      </div>
      <div className="mb-3">
        <InputSelect
          label="Sexo"
          {...register("sexo", { required: true })}
          error={errors?.sexo?.message}
          options={[
            { value: "M", label: "Masculino" },
            { value: "F", label: "Feminino" },
            { value: "N", label: "Não Informado" },
          ]}
        />
      </div>
      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("status")}
            className="form-checkbox text-purple-500"
          />
          <span className="ml-2 text-gray-700">Ativo</span>
        </label>
      </div>
      <div className="flex items-center justify-end">
        <button
          disabled={isSubmitting}
          className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {isSubmitting ? "Enviando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
