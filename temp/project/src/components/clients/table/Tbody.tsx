import { useState } from "react";
import Row from "./Row";
import { ClientType } from "../../../types/client";

interface Props {
  clients: ClientType[];
}

const Tbody = ({ clients }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 30;

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const renderRows = () => {
    return currentClients.map((client) => (
      <Row key={client.id} client={client} />
    ));
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const numPages = Math.ceil(clients.length / clientsPerPage);
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex justify-center my-4 text-xl font-medium">
        {pageNumbers.map((number) => (
          <a
            href="#"
            key={number}
            className={`mx-2 ${
              currentPage === number ? "text-blue-700 underline" : "text-blue-400"
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </a>
        ))}
      </div>
    );
  };

  return (
    <>
      <table className="w-full text-center">
        <thead>
          <tr className="pb-2 border-b border-gray-400">
            <th className="hidden lg:table-cell py-3">#</th>
            <th className="hidden sm:table-cell py-3">Nome</th>
            <th className="hidden md:table-cell py-3">Sobrenome</th>
            <th className="hidden lg:table-cell py-3">CPF/CNPJ</th>
            <th className="hidden md:table-cell py-3">Data de Registro</th>
            <th className="hidden lg:table-cell py-3">Status</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      {renderPagination()}
    </>
  );
};

export default Tbody;
