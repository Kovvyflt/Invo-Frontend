import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀ Prev
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ▶
      </button>
    </div>
  );
}
