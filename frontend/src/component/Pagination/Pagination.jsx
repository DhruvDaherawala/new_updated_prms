import React, { useState } from 'react';

const itemsPerPage = 5;

export default function PaginatedList({ properties, childProperties, currentPage, renters, totalPages, onPageChange }) {
  // const paginatedItems = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // const paginatedChildItem = childProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded mr-2"
        >
          Prev
        </button>

        {/* Current Page Info */}
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
