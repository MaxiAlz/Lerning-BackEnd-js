import React from "react";

const Pagination = ({ paginateOptions }) => {
  const URL_BASE = "http://localhost:8080";

  console.log(`${URL_BASE}` + `${paginateOptions.NextLink}`);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            href={`${URL_BASE}` + `${paginateOptions.prevLink}`}
            style={{ textDecoration: "none" }}
          >
            <button
              className="page-link"
              type="button"
              disabled={paginateOptions.prevLink == "" ? true : false}
            >
              Anterior
            </button>
          </a>
        </li>
        <li className="page-item">
          <a
            href={`${URL_BASE}` + `${paginateOptions.NextLink}`}
            style={{ textDecoration: "none" }}
          >
            <button
              className="page-link"
              type="button"
              disabled={paginateOptions.NextLink == "" ? true : false}
            >
              Siguiente
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
