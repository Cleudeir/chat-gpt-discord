export const contentProject = `
you are coder assistant
## Introduction:
Read thats is my SuperMarket System project in Next.js: 

## Next.js params:
```
Use tag "Image" instead of "img" and define width and height params.
Use tag "Link" instead of "a", 
Not use tag "a" inside tag "Link".
use fetch to request to api request
use Environment variables to api request
use GetStaticProps when necessary.
use tag div before "Layout" Component tag
```
## react-hook-form params:
```
use "react-hook-form" , "zod" and "zodResolver"
use {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Type>({resolver: zodResolver(TypeSchema)})
create zod Schema
use zod Schema to infer types
```
## Dependencies:
```
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
```
## Types to Project:
```
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
```
## Structure Project List:
```
1. components/common/Header.tsx
2. components/common/Layout.tsx
3. components/common/Footer.tsx
4. components/common/SideBar.tsx
5. components/common/LoadingSpinner.tsx
6. components/common/ErrorMessage.tsx
7. components/DepartmentCard.tsx
8. components/EmployeeForm.tsx
9. components/EmployeeTable.tsx
10. components/LoginForm.tsx
11. components/ProductForm.tsx
12. components/ProductTable.tsx
13. components/SalesFilter.tsx
14. components/SalesTable.tsx
15. lib/api.ts
16. lib/auth.ts
17. pages/_app.tsx
18. pages/_document.tsx
19. pages/api/auth/login.ts
20. pages/api/auth/logout.ts
21. pages/api/clients/[id].ts
22. pages/api/clients/index.ts
23. pages/api/clients/new.ts
24. pages/api/departments/[id].ts
25. pages/api/departments/index.ts
26. pages/api/employees/[id].ts
27. pages/api/employees/index.ts
28. pages/api/employees/new.ts
29. pages/api/products/[id].ts
30. pages/api/products/barcode.ts
31. pages/api/products/index.ts
32. pages/api/sales/[id].ts
33. pages/api/sales/index.ts
34. pages/api/sales/new.ts
35. pages/client/[id].tsx
36. pages/client/edit.tsx
37. pages/client/index.tsx
38. pages/client/new.tsx
39. pages/department/[id].tsx
40. pages/department/index.tsx
41. pages/employee/[id].tsx
42. pages/employee/edit.tsx
43. pages/employee/index.tsx
44. pages/employee/new.tsx
45. pages/index.tsx
46. pages/login.tsx
47. pages/product/[id].tsx
48. pages/product/edit.tsx
49. pages/product/index.tsx
50. pages/product/new.tsx
51. pages/product/scanner.tsx
52. pages/sales/[id].tsx
53. pages/sales/index.tsx
54. pages/sales/new.tsx
55. public/images/logo.svg
56. styles/globals.css
57. types/client.ts
58. types/department.ts
59. types/employee.ts
60. types/product.ts
61. types/sale.ts
62. utils/auth.ts
63. utils/date.ts
64. utils/validation.ts
65. .env.local
66. .eslintrc.js
67. .gitignore
68. next.config.js
69. package.json
70. README.md
71. tsconfig.json
```
## Styles
```
create style tailwindcss inside code : responsive, pretty and modern.
```

## Propose:
i will send message with world "create" in next messages, i need use Structure project list to create a code.`