import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Products;
