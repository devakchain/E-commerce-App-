import React from "react";
import "../style/Table.css";

function Table({ headings, children }) {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </thead>
      {children}
    </table>
  );
}

export default Table;
