import React from "react";

import "../style/FeaturedProduct.css";
import ProductCard from "./ProductCard";
import useDate from "../hooks/useDate";
import ProductCardSkelton from "./ProductCardSkelton";

function FeaturedProduct() {
  const { data, error, isLoading } = useDate("/products/featured");
  // console.log(data);
  const skeletons = [1, 2, 3];
  return (
    <section className="featured_products">
      <h2>Featured Products</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading &&
          skeletons.map((n) => {
            return <ProductCardSkelton key={n} />;
          })}
        {data &&
          data.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
    </section>
  );
}

export default FeaturedProduct;
