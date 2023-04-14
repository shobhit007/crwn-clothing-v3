import React from "react";

import "./home.css";

import ProductsPreview from "../../components/products-preview/products.preview.component";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home--hero-section">
        <div className="hero-section-container text-align-center">
          <div className="hero-section-content">
            <h1 className="slogn">
              Brighther days - thoughtfully designed and carefully made
            </h1>
            <Link to="/shop" className="btn-shopnow uppercase">
              Shop now
              <span
                className="material-symbols-outlined ml"
                style={{ "--ml": "0.5rem" }}
              >
                arrow_right_alt
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ProductsPreview />
    </React.Fragment>
  );
};

export default Home;
