import { Client } from "../../../types/client";

type Props = {
  client: Client;
  onRemove: (id: number) => void;
};

export default function Row({ client, onRemove }: Props) {
  const handleRemove = () => {
    const result = confirm(`Tem certeza que deseja remover o cliente ${client.nome}?`);
    if (result) {
      onRemove(client.id);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${client.nome} ${client.sobreNome}`}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.cpfCnpj}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.dataRegistro}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.telefone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.status ? "Ativo" : "Inativo"}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href={`clients/edit/${client.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</a>
        <button className="text-red-600 hover:text-red-900" onClick={handleRemove}>Remover</button>
        <a href={`clients/view/${client.id}`} className="text-indigo-600 hover:text-indigo-900 ml-4">Visualizar</a>
      </td>
    </tr>
  );
}
