import UnixToDate from "@/utils/parse/UnixToDate";
import { Client } from "../../../types/client";
import parseCpfCnpj from "../../../utils/parse/CpfCnpj";
import Link from "next/link";
import { FiEdit, FiEdit3, FiMaximize2, FiX } from "react-icons/fi";
import { FaChessBishop } from "react-icons/fa";
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
      <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.id}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.nome}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {client.sobrenome}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
        {parseCpfCnpj(client.cpfCnpj)}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
        {UnixToDate(client.dataRegistro)}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
        {client.email}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
        {client.status ? "Ativo" : "Inativo"}
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-center text-sm font-medium">
        <Link
          href={`clients/edit/${client.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <FiEdit3 size={24} />
        </Link>
      </td>
      <td className="px-8 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={handleRemove}
        >
          <FiX  size={24} />
        </button>
      </td>

      <td className="px-8 py-4 whitespace-nowrap text-center text-sm font-medium">
        <Link
          href={`clients/view/${client.id}`}
          className="text-indigo-600 hover:text-indigo-900 "
        >
          <FiMaximize2 size={24}/>
        </Link>
      </td>
    </tr>
  );
}
