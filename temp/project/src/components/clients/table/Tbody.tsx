import { Client } from '@/types/client';
import Row from './Row';

type Props = {
  clients: Client[];
};

const Tbody = ({ clients }: Props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {clients.map((client) => (
        <Row client={client} key={client.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <a href={`/clients/edit/${client.id}`} className="underline">
              Edit
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button type="button" className="underline">
              Remove
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <a href={`/clients/view/${client.id}`} className="underline">
              View
            </a>
          </td>
        </Row>
      ))}
    </tbody>
  );
};

export default Tbody;
