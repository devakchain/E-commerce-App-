import React from "react";
import "../style/ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";

function ProductsPage() {
  return (
    <section className="products_page">
      <ProductsSidebar />
      <ProductsList />
    </section>
  );
}

export default ProductsPage;
