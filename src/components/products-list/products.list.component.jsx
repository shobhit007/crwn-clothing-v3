import "./products.list.styles.css";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../api/api";

import axios from "axios";

import Product from "../product/product.component";

function ProductsList() {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState(null);
  const [currentpage, setCurrentPage] = useState(0);

  useEffect(() => {
    let subscribe = true;
    let cancleToken = axios.CancelToken.source();

    const getProductsList = async () => {
      try {
        const res = await api.get(
          "/products/list",
          {
            params: {
              country: "us",
              lang: "en",
              currentpage,
              pagesize: "15",
              categories: categoryId,
            },
          },
          { cancleToken: cancleToken.token }
        );
        if (subscribe) {
          console.log(res.data);
          alert("starting to update the state");
          setCategoryItems((preValues) => ({
            ...res.data,
            results: preValues
              ? [...preValues.results, ...res.data.results]
              : res.data.results,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    //calling method
    getProductsList();

    // cleanup function
    return () => {
      subscribe = false;
      cancleToken.cancel();
    };
  }, [categoryId, currentpage]);

  const loadMoreItems = () => setCurrentPage((v) => v + 1);

  return categoryItems ? (
    <div className="section">
      <div className="section-wrapper container">
        <div className="products-list-container">
          <div className="products-list-wrapper grid">
            {categoryItems.results.map((item) => (
              <Product key={item.code} product={item} />
            ))}
          </div>
          <div className="text-align-center mt" style={{ "--mt": "2rem" }}>
            {currentpage < categoryItems.pagination.numberOfPages && (
              <button className="load-more" onClick={loadMoreItems}>
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ProductsList;
