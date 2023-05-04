function Thead() {
  return (
    <thead className="pb-2 border-b border-gray-400">
      <tr>
        <th className="hidden lg:table-cell py-3">id</th>
        <th className="hidden sm:table-cell py-3">Nome</th>
        <th className="hidden md:table-cell py-3">Sobrenome</th>
        <th className="hidden lg:table-cell py-3">CPF/CNPJ</th>
        <th className="hidden md:table-cell py-3">Data de Registro</th>
        <th className="hidden md:table-cell py-3">Email</th>
        <th className="hidden lg:table-cell py-3">Status</th>
        <th className="hidden lg:table-cell py-3">Editar</th>
        <th className="hidden lg:table-cell py-3">Remover</th>
        <th className="hidden lg:table-cell py-3">Visualizar</th>
      </tr>
    </thead>
  );
}

export default Thead;
