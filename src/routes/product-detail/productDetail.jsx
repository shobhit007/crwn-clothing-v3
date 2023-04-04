import "./productDetail.css";
import React, { useEffect, useState } from "react";

import { Link, useParams, useLocation } from "react-router-dom";

import api from "../../api/api";

function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const {
    state: { galleryImages, variantSizes },
  } = useLocation();

  console.log(isModalOpen);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await api.get(`/products/detail`, {
          params: {
            lang: "en",
            country: "us",
            productcode: productId,
          },
        });
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetail();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const toggleModal = () => {
        setIsmodalOpen(false);
      };

      const modal = document.querySelector(".modal");

      modal.addEventListener("click", toggleModal);

      return () => modal.removeEventListener("click", toggleModal);
    }
  }, []);

  useEffect(() => {
    isModalOpen && (document.body.style.overflow = "hidden");
    !isModalOpen && (document.body.style.overflow = "unset");
  }, [isModalOpen]);

  return product ? (
    <div className="product-detial-container">
      <div className="product-detail-wrapper">
        <div className="images-wrapper">
          <ul className="image-slider">
            {galleryImages.map((image, index) => (
              <li className="product-slide-item" key={index}>
                <img src={image.url} alt="" className="product-image-item" />
              </li>
            ))}
          </ul>
        </div>
        <div className="product-info-wrapper">
          <div className="info-container">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{`$ ${product.whitePrice.price}`}</p>
            <div className="colors-container flex">
              <span className="color-tag">Color</span>
              <div className="colors-row flex">
                <span
                  className="color-box"
                  style={{ backgroundColor: `${product.color.rgbColor}` }}
                  data-color={product.code === productId ? "active" : null}
                ></span>
              </div>
            </div>
            <div className="text-align-left">
              <button
                className="show-size"
                onClick={() => setIsmodalOpen(true)}
              >
                Show sizes
              </button>
            </div>
            <button className="add-to-cart-button">add to cart</button>
            <div className="product-links text-align-left">
              <p className="product-link-item">
                <Link to="#details" className="link">
                  Product details
                </Link>
              </p>
              <p className="product-link-item">
                <Link to="#description" className="link">
                  Description
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={isModalOpen ? "modal open" : "modal"}>
        <div
          className={
            isModalOpen ? "modal-lock modal-lock-visible" : "modal-lock"
          }
        >
          <div className="modal-header">
            <div className="header-row">
              <h2 className="fw-400">Sizes</h2>
              <button
                className="close-button"
                onClick={() => setIsmodalOpen(false)}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
          <div className="modal-content">
            {variantSizes.map((size) => (
              <div className="size-row">
                <input
                  type="button"
                  value={size.filterCode}
                  className="btn-size"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ProductDetail;
