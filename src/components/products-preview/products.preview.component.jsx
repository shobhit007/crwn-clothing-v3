import "./products.preview.style.css";
import React, { useEffect, useState } from "react";
// import api from "../../api/api";

import { data } from "../../shopData";

import Product from "../product/product.component";
import { Link } from "react-router-dom";

function ProductsPreview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // const options = {
    //   params: {
    //     country: "us",
    //     lang: "en",
    //     currentpage: "3",
    //     pagesize: "4",
    //     categories: "men_newarrivals_all",
    //     concepts: "H&M MAN",
    //   },
    // };
    // api
    //   .get("/products/list", options)
    //   .then(function (response) {
    //     console.log(response);
    //     setProducts(response.data.results);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    setProducts(data);
  }, []);
  return (
    <div className="section">
      <div className="section-wrapper ">
        <div className="product-preview-wrapper">
          <div className="product-preview-info flex">
            <p className="product-info-title">New Arrival</p>
            <Link className="product-info-link" to="/shop/men_newarrivals_all">
              View all
            </Link>
          </div>
          <div className="products-preview-container">
            {products.map((item) => (
              <Product product={item} key={item.code} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPreview;
