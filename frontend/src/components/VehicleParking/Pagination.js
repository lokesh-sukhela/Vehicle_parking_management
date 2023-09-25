import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
        >
          <button style={{ background: '#87CEEB ', border: 'none', color: 'white' }}
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
