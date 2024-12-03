// Pagination.js
import React from "react";

const Pagination = ({
  villagersPerPage,
  totalVillagers,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  console.log(totalVillagers);
  console.log(villagersPerPage);

  for (let i = 1; i <= Math.ceil(totalVillagers / villagersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div id="pages">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pageItem ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="pageLink"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
