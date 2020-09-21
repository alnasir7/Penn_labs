import React from "react";

const Pagination = ({
   
  currentPage,
  pageSize,
  data,
  length,
  changeCurrentPage,
}) => {
  const pagesNumber = Math.ceil(length / pageSize)  || 1;
  const pages = [];
  for (var i = 1; i <= pagesNumber; i++) {
    pages.push(i);
  }
  

  return (
    <nav className="mt-4" aria-label="...">
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => changeCurrentPage(page)}
            key={index}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;