export const PramsPropose = `
## Next.js params:
  Use tag "Image" instead of "img" and define width and height params,  
  Use the "Link" tag in place of the "a" tag, 
  Not use tag "a" inside tag "Link",
  use fetch to request to api request,
  use Environment variables to api request,
  use GetStaticProps when necessary,
  use tag "<>" inside tag "Layout",

## react-hook-form params:
  use "react-hook-form" , "zod" and "zodResolver"
  use form = useForm<Type>({resolver: zodResolver(TypeSchema)})
  import zod Schema
  import type

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

## Structure Project List:
\`\`\`
1.  components/common/Header.tsx
2.  components/common/Footer.tsx
3.  components/common/SideBar.tsx
    link to pages
4.  components/common/LoadingSpinner.tsx
5.  components/common/ErrorMessage.tsx
6.  components/common/Layout.tsx
    receive: children, title?, isLoading?, messageError?
    return (
    <div>
      <Head>
        <title>{title}</title>
      </Head> ;
      <Header/>
      <SideBar/>
      <Main>
        isLoading && 
        <div>
          {children}
          <ErrorMessage messageError={messageError}/>
        </div>       
        !isLoading && <LoadingSpinner/>
      </Main>    
      <Footer/>
    </div>    
    )
7. components/forms/client/index.tsx
      use inputText and inputSelect
8. components/forms/client/inputs/inputText.tsx
    create generic component to: nome, sobreNome, email, senha, cfpCnpj, DataNascimento, cep, telefone.
    create mask to: cfpCnpj, DataNascimento: "DD/MM/YYYY", cep, telefone
9. components/forms/client/inputs/inputSelect.tsx
    create generic component to: Uf, sexo, status
10. pages/api/client/[id].ts
    fetch GET "http://localhost:8080/client/[id]"
    21. pages/api/client/edit/[id].ts
    fetch PUT "http://localhost:8080/client/[id]"
      body: Client infos
11. pages/api/client/all.ts 
    fetch GET "http://localhost:8080/clients"
12. pages/client/[id].tsx
  Create Client,
  Edit Client,
  Use form components/ClientForm.tsx 
13. pages/client/edit/[id].tsx
  Edit data - if id is number, useEffect to fetch data about that client and set infos insides inputs form.
  New data  - if ud is string "new" show form empty.
14. pages/client/index.tsx
  Table show Client,
  For each row button edit, view and remove, 
    button remove show popup to confirm.
    button view link to pages/client/view/[id].tsx
15. pages/client/view/[id].tsx
  UseEffect to fetch data about that client, show all infos that client
16. types/endereco.ts
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
17. types/client.ts
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
18. utils/parse.ts
  function parseCPF(string "11016241674") : return string "110.162.416-74"
  function validateCPF(string "11016241674" or "110.162.416-74") : return true or false
  function parseCNPJ(string "05570714000159") : return string "05.570.714/0001-59"
  function validateCNPJ(string "05570714000159" or "05.570.714/0001-59") : return true or false
  function capitalize(string "casa") : return string "Casa"
\`\`\`

## Styles params:
create style tailwindcss inside code : responsive, pretty and modern.

## Propose:
Read thats information, you are coder assistant to make SuperMarket System project in Next.js:
i will send message with world "create" in next messages, i need use Structure project list to create a code.
Response in two steps:
one : path with a name file;
two : code.

example response:
file: components/common/Header.tsx
\`\`\`
code
\`\`\`
`