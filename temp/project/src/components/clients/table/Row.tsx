import type { Client } from '../../../types/client';

type Props = {
  client: Client;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const Row = ({ client, onEdit, onRemove }: Props) => {
  const handleEdit = () => {
    onEdit(client.id);
  };

  const handleRemove = () => {
    const confirmation = confirm(`Are you sure you want to remove ${client.nome}?`);
    if (confirmation) {
      onRemove(client.id);
    }
  };

  return (
    <tr>
      <td>{client.nome}</td>
      <td>{client.sobreNome}</td>
      <td>{client.cpfCnpj}</td>
      <td>{UnixToDate(client.dataNascimento)}</td>
      <td>{client.email}</td>
      <td>{client.telefone}</td>
      <td>{client.endereco.localidade}</td>
      <td>{client.endereco.uf}</td>
      <td>{client.status ? 'Active' : 'Inactive'}</td>
      <td>
        <a onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} className="text-green-500 mx-2 hover:text-green-600" />
        </a>
        <a onClick={handleRemove}>
          <FontAwesomeIcon icon={faTrash} className="text-red-500 mx-2 hover:text-red-600" />
        </a>
        <a href={`/clients/view/${client.id}`}>
          <FontAwesomeIcon icon={faEye} className="text-blue-500 mx-2 hover:text-blue-600" />
        </a>
      </td>
    </tr>
  );
};

export default Row;
