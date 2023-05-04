import { use, useEffect, useState } from "react";

function Pagination({data, currentData,  setCurrentData}) {
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 30;
    const [pageNumbers,  setPageNumbers]= useState(null);
    useEffect(() => {
        const indexOfLastClient = currentPage * clientsPerPage;
        const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        setCurrentData(data.slice(indexOfFirstClient, indexOfLastClient));        
        const numPages = Math.ceil(data.length / clientsPerPage);
        const pages = []
        for (let i = 1; i <= numPages; i++) {
            pages.push(i);
        }
        setPageNumbers(pages)
        console.log("pages", pages), data.slice(indexOfFirstClient, indexOfLastClient);
        console.log("currentPage", currentPage)
    },[currentPage])

    return (
      <div className="flex justify-center my-4 text-xl font-medium">
        {pageNumbers && pageNumbers.map((number) => (
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
}

export default Pagination;