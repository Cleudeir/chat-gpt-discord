import UnixToDate from "@/utils/parse/UnixToDate";
import { Client } from "../../../types/client";
import parseCpfCnpj from "../../../utils/parse/CpfCnpj";
import Link from "next/link";
type Props = {
  client: Client;
  onRemove: (id: number) => void;
};

export default function Row({ client, onRemove }: Props) {
  const handleRemove = () => {
    const result = confirm(
      `Tem certeza que deseja remover o cliente ${client.nome}?`
    );
    if (result) {
      onRemove(client.id);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.nome}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.sobrenome}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {parseCpfCnpj(client.cpfCnpj)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {UnixToDate(client.dataRegistro)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {client.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {client.status ? "Ativo" : "Inativo"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`clients/edit/${client.id}`}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          Editar
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={handleRemove}
        >
          Remover
        </button>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`clients/view/${client.id}`}
          className="text-indigo-600 hover:text-indigo-900 ml-4"
        >
          Visualizar
        </Link>
      </td>
    </tr>
  );
}
