// Pagination.tsx

import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex h-full items-center justify-center gap-2 px-4 py-2">
      <button
        className={`flex max-w-fit items-center px-2 py-2 text-sm ${
          currentPage === 0 ? "text-gray-400" : "text-primary"
        }`}
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden md:block">Anterior</span>
      </button>
      <span className="text-sm">
        {currentPage + 1} de {totalPages}
      </span>
      <button
        className={`flex max-w-fit items-center px-2 py-2 text-sm ${
          currentPage === totalPages - 1 ? "text-gray-400" : "text-primary"
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <span className="hidden md:block">Próxima</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
