import React from "react";

import "../style/ProductsSidebar.css";
import LinkWithIcon from "./LinkWithIcon";

import useDate from "../hooks/useDate";

function ProductsSidebar() {
  const { data: categories, error } = useDate("/category");
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => {
            return (
              <LinkWithIcon
                id={category._id}
                key={category._id}
                title={category.name}
                link={`/products?category=${category.name}`}
                emoji={`http://localhost:3000/category/${category.image}`}
                sidebar={true}
              />
            );
          })}
      </div>
    </aside>
  );
}

export default ProductsSidebar;
