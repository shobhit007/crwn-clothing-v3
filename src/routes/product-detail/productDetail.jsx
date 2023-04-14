import "./productDetail.css";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";

import { setFetchProductDetailsStart } from "../../store/product/product.action";
import { selectProductDetails } from "../../store/product/product.selector";

import Spinner from "../../components/spinner/spinner.component";

gsap.registerPlugin(ScrollTrigger);

const getProductImages = (product, productId) => {
  const article = product.articlesList.find((item) => item.code === productId);

  const { galleryDetails } = article;

  return galleryDetails;
};

const getProductVariantSizes = (product, productId) => {
  const article = product.articlesList.filter(
    (item) => item.code === productId
  )[0];

  const { variantsList } = article;

  return variantsList;
};

function ProductDetail() {
  const { id: productId } = useParams();
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [productSize, setProductSize] = useState("");

  const sliderRef = useRef(null);
  const slideIndicator = useRef(null);
  let indicatorIndex = 0;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const product = useSelector(selectProductDetails);

  useEffect(() => {
    if (product?.code !== productId) {
      dispatch(setFetchProductDetailsStart(productId));
    }
  }, [productId, dispatch, product]);

  useEffect(() => {
    if (product && product.code === productId) {
      const productSizes = getProductVariantSizes(product, productId);

      setProductSize(productSizes[0].size.sizeFilter);
    }
  }, [product, productId]);

  useEffect(() => {
    if (product && product.code === productId) {
      const modal = document.querySelector(".modal");

      const toggleModal = (event) => {
        if (event.target === modal) {
          setIsmodalOpen(false);
        }
      };

      window.onclick = (e) => toggleModal(e);

      return () => window.removeEventListener("click", toggleModal);
    }
  }, [product, productId]);

  useEffect(() => {
    isModalOpen && (document.body.style.overflow = "hidden");
    !isModalOpen && (document.body.style.overflow = "unset");
  }, [isModalOpen]);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    if (product && product.code === productId) {
      const galleryImages = getProductImages(product, productId);
      mm.add("(min-width: 991px)", () => {
        ScrollTrigger.create({
          trigger: ".product-detail-wrapper",
          start: "top top",
          end: `+=${(galleryImages.length - 1) * 100}%`,
          pin: ".product-info-wrapper",
          snap: {
            snapTo: 1 / (galleryImages.length - 1),
            delay: 1,
            duration: 1,
          },
        });
      });

      mm.add("(max-width: 990px)", () => {
        ScrollTrigger.create({
          trigger: ".images-wrapper",
          start: "top top",
          end: "+=150",
          pin: true,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: ".product-info-wrapper",
          scroller: ".images-wrapper",
          pin: true,
          pinSpacing: false,
        });
      });
    }
    return () => mm.revert();
  }, [product, productId]);

  useEffect(() => {
    if (product && product.code === productId) {
      const totalImages = getProductImages(product, productId).length;
      slideIndicator.current.style.width = `${(1 / totalImages) * 100}%`;
    }
  }, [product, productId]);

  const addCartItem = () =>
    dispatch(
      addItemToCart(cartItems, {
        ...product,
        images: getProductImages(product, productId),
        size: productSize,
      })
    );

  const onhandleProductSizeChange = (e) => {
    setProductSize(e.target.value);
    setIsmodalOpen((p) => !p);
  };

  const nextSlide = () => {
    const sliderWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + sliderWidth;

    // slide indicator
    indicatorIndex < getProductImages(product, productId).length - 1 &&
      indicatorIndex++;
    const indicator = slideIndicator.current;
    indicator.style.transform = `translateX(${indicatorIndex * 100}%)`;
  };

  const preSlide = () => {
    const sliderWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - sliderWidth;

    // slide indicator
    indicatorIndex > 0 && indicatorIndex--;
    const indicator = slideIndicator.current;
    indicator.style.transform = `translateX(${indicatorIndex * 100}%)`;
  };

  return product && product.code === productId ? (
    <div className="product-detial-container">
      <div className="product-detail-wrapper">
        <div className="images-wrapper">
          <ul className="image-slider" ref={sliderRef}>
            {getProductImages(product, productId).map((image) => (
              <li className="product-slide-item" key={image.id}>
                <img
                  src={image.baseUrl}
                  alt=""
                  className="product-image-item"
                />
              </li>
            ))}
          </ul>
          <button className="pre-button slider-button" onClick={preSlide}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button className="next-button slider-button" onClick={nextSlide}>
            <i className="ri-arrow-right-s-line"></i>
          </button>
          <div className="slide-indicator" ref={slideIndicator}></div>
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
              {productSize && <span className="fs-500 ml">{productSize}</span>}
            </div>
            <button className="add-to-cart-button" onClick={addCartItem}>
              add to cart
            </button>
            <div className="product-links text-align-left">
              <p className="product-link-item">
                <a href="#description" className="link">
                  Description
                </a>
              </p>
              <p className="product-link-item">
                <a href="#details" className="link">
                  Product details
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section detail-section">
        <div className="section-wrapper container">
          <div className="content-wrapper">
            <div className="content-12" id="description">
              <h3
                className="content-label fw-400 mb"
                style={{ "--mb": "0.5rem" }}
              >
                Description
              </h3>
              <p className="fs-500">{product.description}</p>
            </div>

            <div className="content-12 mt" id="details">
              <h3
                className="content-label fw-400 mb"
                style={{ "--mb": "0.5rem" }}
              >
                Product details
              </h3>

              {product.measurements && (
                <div className="measurements">
                  {product.measurements.map((measurement, index) => (
                    <p
                      key={index}
                      className="fs-500 fw-200 mb"
                      style={{ "--mb": "0.25rem" }}
                    >
                      {measurement}
                    </p>
                  ))}
                </div>
              )}

              {product.materialDetails && (
                <div className="materials mt">
                  <h3 className="content-label fw-400">Materials</h3>
                  {product.materialDetails.map((material, index) => (
                    <div key={index} className="material-container">
                      <p className="fs-500">{material.name}</p>
                      <p className="material-desc">{material.description}</p>
                    </div>
                  ))}
                </div>
              )}
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
            {getProductVariantSizes(product, productId).map((variant) => (
              <div className="size-row" key={variant.code}>
                <input
                  type="button"
                  value={variant.size.sizeFilter}
                  className="btn-size"
                  onClick={onhandleProductSizeChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProductDetail;
