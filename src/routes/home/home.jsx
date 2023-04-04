import React from "react";

import "./home.css";

import ProductsPreview from "../../components/products-preview/products.preview.component";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home--hero-section"></div>
      <ProductsPreview />
    </React.Fragment>
  );
};

export default Home;
