import React from "react";

const Pagination = ({
   
  currentPage,
  pageSize,
  data,
  length,
  changeCurrentPage,
}) => {

    //This component shows the number of pages available based on the page size and course list size. It allows the user
    // to change the page and passes the data back to the parent comonents

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