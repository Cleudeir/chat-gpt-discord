export const PramsPropose = `
## javaScript params:
use ES6
use Function Declaration

## Next.js params:
  use React function component
  Use tag "Image" instead of "img" and define width and height params,  
  not Use tag "Link",  
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
      <main>
        isLoading && 
        <div>
          {children}
          <ErrorMessage messageError={messageError}/>
        </div>       
        !isLoading && <LoadingSpinner/>
      </main>    
      <Footer/>
    </div>    
    )
7. components/client/form/index.tsx
  use inputText and inputSelect
    
8. components/client/forms/inputs/inputText.tsx
    create generic component to: nome, sobreNome, email, senha, cfpCnpj, DataNascimento, cep, telefone.
    create mask to: cfpCnpj, DataNascimento: "DD/MM/YYYY", cep, telefone
9. components/client/forms/inputs/inputSelect.tsx
    create generic component to: Uf, sexo, status

10. components/client/Tbody.tsx

11. pages/api/client/[id].ts
    return fetch GET "http://localhost:8080/client/[id]"

12. pages/api/client/edit/[id].ts
    return fetch PUT "http://localhost:8080/client/[id]"
    body: infos

13. pages/api/client/new/[id].ts
return fetch POST "http://localhost:8080/client/[id]"
body: infos

14. pages/api/client/all.ts 
    return fetch GET "http://localhost:8080/clients?limit=500"

15. pages/client/edit/[id].tsx
  use components/client/form/index.tsx 
  use useEffect to fetch "pages/api/client/[id]" data about that client and setValues insides inputs form
  create and use a function to fetch PUT "pages/api/client/edit/[id]" to send client infos edited

16. pages/client/view/[id].tsx
  use useEffect to fetch "pages/api/client/[id]" data about that client, show all infos that client.

17. pages/client/new.tsx
  use components/client/Form.tsx
  create and use a function to fetch PUT "pages/api/client/new/[id]" to send client infos to create new.

18. pages/client/index.tsx
  use useEffect to fetch "pages/api/client/clients" data about that client, show all infos in a Table,  show Client 30 per Table page.
  use components/client/Tbody.tsx
  For each row include buttons to:
    edit link to pages/client/view/[id].tsx;
    remove, button show popup to confirm;
    view link to pages/client/view/[id].tsx;
19. types/endereco.ts
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
20. types/client.ts
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
  create zod schema with hard validation
  create type
21. utils/parse.ts
  function parseCPFCNPJ(string "11016241674" or  string "05570714000159") : return string "110.162.416-74" or return string "05.570.714/0001-59"
  function validateCPF(string "11016241674" or "110.162.416-74") : return true or false 
  function validateCNPJ(string "05570714000159" or "05.570.714/0001-59") : return true or false
  function capitalize(string "casa") : return string "Casa"
  parseUnixToDate(unixDate: string) : return string "DD/MM/YYYY"
  parseDateToUnix(string "DD/MM/YYYY) : return unixDate: string"
\`\`\`

## react-hook-form params:
  use "react-hook-form" , "zod" and "zodResolver"
  use form = useForm<Type>({resolver: zodResolver(TypeSchema)})
  import zod Schema
  import type

## <link> params:
Replace all tag "Link" to tag "a"

## Styles params:
create style tailwindcss inside code : responsive, pretty and modern.

## Propose:
Read thats information, you are coder assistant to make SuperMarket System project in Next.js:
i will send message with world "create" in next messages, i need use Structure project list to create a code.
Not is need comment.
Response in two steps:
one : path with a name file;
two : code.

example response:
file: components/common/Header.tsx
\`\`\`javascript
code
\`\`\`
`