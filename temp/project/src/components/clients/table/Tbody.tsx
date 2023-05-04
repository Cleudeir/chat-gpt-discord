import { Client } from "@/types/client";
import Row from "./Row";

interface Props {
    data: Client[];
  }
  
function Tbody({data}: Props) {
  return (
    <tbody className="pb-2 border-b border-gray-400">
      {data.map((item: { id: any; }) => (
        <Row
          key={item.id}
          client={item}
          onRemove={function (id: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </tbody>
  );
}

export default Tbody;
