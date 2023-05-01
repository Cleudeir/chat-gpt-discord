import React from "react";
import { useRouter } from "next/router";
import range from "lodash/range";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePageClick = (pageNumber: number) => {
    router.push(`${router.pathname}?page=${pageNumber}`);
  };

  const getPageNumbers = () => {
    let pageNumbers = [];

    if (totalPages <= 7) {
      pageNumbers = range(1, totalPages + 1);
    } else if (currentPage <= 4) {
      pageNumbers = [...range(1, 6), "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      pageNumbers = [1, "...", ...range(totalPages - 4, totalPages + 1)];
    } else {
      pageNumbers = [1, "...", ...range(currentPage - 1, currentPage + 2), "...", totalPages];
    }

    return pageNumbers;
  };

  const renderPageNumbers = () => {
    return getPageNumbers().map((pageNumber, index) => {
      const isActive = pageNumber === currentPage;

      const handleButtonClick = () => {
        if (pageNumber !== "...") {
          handlePageClick(pageNumber);
        }
      };

      return (
        <a
          key={index}
          className={`block py-1 px-3 border border-gray-400 rounded-lg text-gray-800 ${
            isActive ? "bg-gray-600 text-white cursor-default" : "hover:bg-gray-300 cursor-pointer"
          } ${pageNumber === "..." ? "opacity-50 cursor-default" : ""}`}
          onClick={handleButtonClick}
        >
          {pageNumber}
        </a>
      );
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-wrap justify-center">
        {currentPage > 1 && (
          <a className="block py-1 px-3 border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-300" onClick={() => handlePageClick(currentPage - 1)}>
            {"<<"}
          </a>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages && (
          <a className="block py-1 px-3 border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-300" onClick={() => handlePageClick(currentPage + 1)}>
            {">>"}
          </a>
        )}
      </div>
    </div>
  );
};

export default Pagination;

