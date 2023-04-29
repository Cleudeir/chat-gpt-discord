export const PramsPropose = `
## Next.js params:
Use tag "Image" instead of "img" and define width and height params,
Use tag "Link" instead of "a", 
Not use tag "a" inside tag "Link",
use fetch to request to api request,
use Environment variables to api request,
use GetStaticProps when necessary,
use tag div before "Layout" Component tag,
not use tag "a".
## react-hook-form params:
use "react-hook-form" , "zod" and "zodResolver"
use {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Type>({resolver: zodResolver(TypeSchema)})
create zod Schema
use zod Schema to infer types
## Dependencies params:
"@types/node"
"@types/react"
"@types/react-dom"
"autoprefixer"
"eslint"
"eslint-config-next"
"next"
"postcss"
"react"
"react-dom"
"react-hook-form"
"tailwindcss"
"typescript"
"zod"
"@hookform/resolvers"
"react-icons"

## Types to Project:
Client params: {
  id,
  FirstName,
  surname,
  CPF,
  RG,
  birthDate,
  role,
  sector,
  gender,
  email,
  password,
  cellPhone,
  street,
  HouseNumber,
  complement,
  neighborhood,
  CEP,
  city,
  state,
  status
}
Sales params :{
  id,
  SellCode,
  date,
  totalSellValue
  description,
  validate,
  formPayment,
  typePayment,
  creditCardFlag
} 
Product params :{
  id,
  barcode,
  description,
  validate,
  description,
  image,
  CostPrice,
  salePrice,
  quantity,
  volume,
  brand,
  Department
  shelf,
}

## Structure Project List:
\`\`\`
1.  components/common/Header.tsx
2.  components/common/Layout.tsx
3.  components/common/Footer.tsx
4.  components/common/SideBar.tsx
5.  components/common/LoadingSpinner.tsx
6.  components/common/ErrorMessage.tsx
15. components/ClientForm.tsx. 
21. pages/api/clients/[id].ts
22. pages/api/clients/all.ts 
35. pages/client/[id].tsx
  Create Client,
  Edit Client,
  Use form components/ClientForm.tsx. 
36. pages/client/edit/[id].tsx
  Edit data - if id is number, useEffect to fetch data about that client and set infos insides inputs form.
  New data  - if ud is string "new" show form empty.
37. pages/client/index.tsx
  Table show Client,
  For each row button edit, view and remove, 
    button remove show popup to confirm.
    button view link to pages/client/view/[id].tsx
38. pages/client/view/[id].tsx
  UseEffect to fetch data about that client, show all infos that client
56. types/endereco.ts
  Example endereco: {
    logradouro: "Segunda Avenida",
    numero: "456",
    complemento: "Andar 3",
    bairro: "Centro",
    cep: "35.367-000",
    localidade: "Los Angeles",
    uf: "MG",
  }
  create zod schema
  create type
57. types/client.ts
  Example Client = {
    id: 1,
    nome: "John",
    sobreNome: "Doe",
    cpfCnpj: "05.570.714/0001-59",   
    dataNascimento: "02/02/1992",
    dataRegistro: "01/01/1990",
    sexo: "homem",
    email: "john.doe@example.com",
    senha: "password123*A",
    telefone: "(31) 9 9218 1669",
    endereco: enderecoSchema,
    status: true,
  }
  create zod schema
  create type
62. utils/parse.ts
  fucntion parseCPF(string "11016241674") : return string "110.162.416-74"
  fucntion validateCPF(string "11016241674" or "110.162.416-74") : return true or false
  fucntion parseCNPJ(string "05570714000159") : return string "05.570.714/0001-59"
  fucntion validateCNPJ(string "05570714000159" or "05.570.714/0001-59") : return true or false
  fucntion capitalize(string "casa") : return string "Casa"
\`\`\`

##pages/api/*
use fetch to request
back end baseUrl = "http://localhost:8080/"

##lib/api.ts
create face data to response requests

## Styles params:
create style tailwindcss inside code : responsive, pretty and modern.

## Code length
code is not longer than 2000 characters
if the code is greater than 2000 characters, suggest creating new components to divide code.

## Propose:
Read thats information, you are coder assistant to make SuperMarket System project in Next.js:
i will send message with world "create" in next messages, i need use Structure project list to create a simple minified code.
Response in two steps:
one : path with a name file;
two : code.

example response:
file: components/common/Header.tsx
\`\`\`
code
\`\`\`
`