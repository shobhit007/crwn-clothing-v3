import "./products.list.styles.css";
import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setFetchProductsStart } from "../../store/product/product.action";

import { selectProductsList } from "../../store/product/product.selector";

import Product from "../product/product.component";

import Spinner from "../spinner/spinner.component";

function ProductsList() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const productsData = useSelector(selectProductsList);

  useEffect(() => {
    if (productsData?.categoryCode !== categoryId) {
      dispatch(setFetchProductsStart(categoryId, 0));
    }
  }, [categoryId, dispatch, productsData]);

  return productsData && productsData.categoryCode === categoryId ? (
    <div className="section">
      <div className="section-wrapper container">
        <div className="products-list-container">
          <div className="products-list-wrapper grid">
            {productsData.results.map((item) => (
              <Product key={item.code} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProductsList;
