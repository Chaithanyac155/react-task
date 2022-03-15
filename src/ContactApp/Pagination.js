import React from "react";

function Pagination({
  contactsPerPage,
  totalContacts,
  paginate,
  currentPage,
  setCurrentPage
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (type) => {
    if (type === "prev") {
      if (currentPage === 1) {
        setCurrentPage(currentPage);
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else if (type === "next") {
      if (pageNumbers.length === currentPage) {
        setCurrentPage(currentPage);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };
  return (
    <div className="container" style={{ marginTop: "35px" }}>
      <ul className="ul_pagination">
        <li className="li_content">
          <a
            href="#"
            className={`${currentPage === 1 && "disableEvent"}`}
            onClick={() => handleClick("prev")}
          >
            Prev
          </a>
        </li>
        {pageNumbers.map((num, index) => (
          <li key={num} className={`${currentPage === num ? "active" : null}`}>
            <a href="#" onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ))}
        <li className="li_content">
          <a
            href="#"
            className={`${
              currentPage === pageNumbers.length && "disableEvent"
            }`}
            onClick={() => handleClick("next")}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
