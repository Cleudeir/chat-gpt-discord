export const corParams = `
## Next.js params:
  use ES6
  use Function Declaration
  use React function component
  Use tag "Image" instead of "img" and define width and height params,  
  use fetch to request to api request,
  use Environment variables to api request,
  use GetStaticProps when necessary,
  use tag "<>" inside tag "Layout",

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

## Structure Project List itens:
\`\`\`
1.  components/common/Header.tsx
This is the Header component that displays the logo and navigation links for the application
2.  components/common/Footer.tsx
3.  components/common/SideBar.tsx
Creates Sidebar component that shows links to Home, Clients, employees, products and selves, Pages using tag 'a'
4.  components/common/LoadingSpinner.tsx
The LoadingSpinner component displays a spinning icon while the content is being loaded. It uses the "react-icons/fa" package to render an animated spinner icon.
5.  components/common/ErrorMessage.tsx
This is the ErrorMessage component that displays a red box with an error message if a messageError prop is passed to it.
6.  components/common/Layout.tsx
This is the Layout component that displays the application header, sidebar, and main content. It receives props such as the page title, a boolean indicating if the page is loading, and an error message to display. If the page is loading, it shows a spinner, otherwise it shows the main content with an error message if there is any. It uses the Header, Sidebar, LoadingSpinner, and ErrorMessage components. The main content is wrapped in a div with className "text-center mt-4".   
7. components/clients/form/index.tsx
The ClientForm component receives a defaultValues prop of type ClientType that represents the client object with default values. The useForm hook is used to define the form and validate its values using the zodResolver with the ClientSchema. The component renders several InputText and InputSelect components, passing a label, a name, possible options for InputSelect, and the form object. It also includes a submit button, that calls a submit function that is not used in this case.
8. components/clients/form/InputText.tsx
InputText component with label and input fields to handle name, sobrenome, email, senha, cpfCnpj, DataNascimento, CEP. entry with hard validation.
9. components/clients/form/InputSelect.tsx
This is the InputSelect component. It takes in props such as a label and a name (for registration with react-hook-form) and an array of options to display in the select dropdown. It uses react-hook-form's UseFormRegister to register the input with the form. The dropdown is styled using Tailwind to match the design of the rest of the application.
10. components/clients/table/Row.tsx
The Row component receives a client object and a function to handle the remove event. It displays the client's information and buttons to edit, remove, and view the client. The Edit and View buttons use an anchor tag with an href attribute to link to the edit and view page of the client, respectively.
11. components/clients/table/Tbody.tsx
import components/clients/table/Row.tsx
12. components/fake/clients.ts
This file exports an array of fake clients with hard-coded data, used for demo and testing purposes.
13. pages/api/clients/view/[id].ts
This file exports a function that handles the API request to get client information from the fakeClients array based on a given id. It uses the NextApiRequest and NextApiResponse types from the 'next' package to handle the GET request and return a JSON response with the client information or a string with an error message if the client is not found or the method is not allowed.
14. pages/api/clients/edit/[id].ts
    import type Client pages/clients/index.tsx
    return infos edit client
15. pages/api/clients/new/[id].ts
    import type Client pages/clients/index.tsx    
    return infos new client
16. pages/api/clients/index.ts 
    import type Client pages/clients/index.tsx
    import and return array fakeClients :components/fake/clients.tsx 

17. pages/clients/edit/[id].tsx
  import type Client pages/clients/index.tsx 
  use components/clients/form/index.tsx 
  use useEffect to fetch "pages/api/clients/[id]" data about that client and setValues insides inputs form
  create and use a function to fetch PUT "pages/api/clients/edit/[id]" to send client infos edited

18. pages/clients/view/[id].tsx
  import type Client pages/clients/index.tsx 
  use useEffect to fetch "pages/api/clients/view/[id]" data about that client, show all infos that client.

19. pages/clients/new.tsx
  import type Client pages/clients/index.tsx 
  use components/clients/form/index.tsx
  create and use a function to fetch PUT "pages/api/clients/new/[id]" to send client infos to create new.

20. pages/clients/index.tsx
  import type Client pages/clients/index.tsx 
  use useEffect to fetch "pages/api/client" get data.
  Show all infos in a Table,  show client 30 per Table page.
  use components/clients/table/Tbody.tsx
  For each row include buttons to:
    edit link to pages/clients/edit/[id].tsx;
    remove, button show popup to confirm;
    view link to pages/clients/view/[id].tsx;
21. types/endereco.ts
  Example endereco: {
    logradouro: "Segunda Avenida",
    numero: "456",
    complemento: "Andar 3",
    bairro: "Centro",
    cep: "35.367-000",
    localidade: "Los Angeles",
    uf: "MG",
  }
  create zod schema with hard validation
  create type
22. types/client.ts
  Example Client = {
    id: 1,
    nome: "John",
    sobrenome: "Doe",
    cpfCnpj: "05.570.714/0001-59",   
    dataNascimento: "02/02/1992",
    dataRegistro: "01/01/1990",
    sexo: "homem",
    email: "john.doe@example.com",
    senha: "password123*A",
    endereco: enderecoSchema,
    status: true,
  }
  create zod schema with hard validation
  create type
23. utils/parse/CpfCnpj.ts
  function CPFCNPJ(string "11016241674" or  string "05570714000159") : return string "110.162.416-74" or return string "05.570.714/0001-59"
24. utils/parse/Capitalize.ts  
  function capitalize(string "casa") : return string "Casa"
25. utils/parse/UnixToDate.ts  
  UnixToDate(unixDate: string) : return string "DD/MM/YYYY"
26. utils/parse/DateToUnix.ts  
  DateToUnix(string "DD/MM/YYYY) : return unixDate: string"
27. utils/validate/Cpf.ts  
  function validateCPF(string "11016241674" or "110.162.416-74") : return true or false 
28. utils/validate/Cnpj.ts  
  function validateCNPJ(string "05570714000159" or "05.570.714/0001-59") : return true or false  
29. pages/index.ts
\`\`\`

## react-hook-form params:
  use "react-hook-form" , "zod" and "zodResolver"
  use form = useForm<Type>({resolver: zodResolver(TypeSchema)})
  import zod Schema
  import type

## Styles params:
create style tailwindcss inside code : responsive, pretty and modern.
`
export const proposeCoderBot = `
## Propose:
Read thats information, you are coder assistant to make SuperMarket System project in Next.js:
i will send message with world "create" in next messages, i need use Structure project list to create a hard code, each item that list is a item.
Response in two steps:
one : path with a name file;
two : code;
three : resume

example response:
file: components/common/Header.tsx
\`\`\`javascript
code
\`\`\`
Resume: ""
`

export const proposeCoder = `
## Propose:
Read thats information, you are coder assistant to make SuperMarket System project in Next.js:
`