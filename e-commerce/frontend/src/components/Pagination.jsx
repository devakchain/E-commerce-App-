import React from "react";
import "../style/Pagination.css";

function Pagination({ totalPosts, postsPerPage, onClick, currentPage }) {
  let page = [];

  for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
    page.push(i);
  }

  return (
    <>
      {page.length > 1 && (
        <ul className="pagination">
          {page.map((page) => {
            return (
              <li key={page}>
                <button
                  className={
                    parseInt(currentPage) === page
                      ? "pagination_button active"
                      : "pagination_button"
                  }
                  onClick={() => onClick(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Pagination;
