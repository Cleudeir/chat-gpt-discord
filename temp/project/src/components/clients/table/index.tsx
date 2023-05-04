import { useState } from "react";
import { Client } from "../../../types/client";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from "./pagination";

interface Props {
  data: Client[];
}

const Table = ({ data }: Props) => {
  const [currentData, setCurrentData] = useState(null);

  return (
    <>
      {currentData && (       
          <table className="text-center">
            <Thead />
            <Tbody data={currentData} />
          </table>       
      )}
      <Pagination data={data} currentData={currentData} setCurrentData={setCurrentData} />
    </>
  );
};

export default Table;
