import "./product.style.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { name, galleryImages } = product;

  const productRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const curretTarget = productRef.current;

    const productNextImage = (e) => {
      imageRef.current.src = galleryImages[1].url;
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0.8,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.75,
        }
      );
    };

    const productPreviousImage = () => {
      imageRef.current.src = galleryImages[0].url;
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0.8,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.75,
        }
      );
    };

    curretTarget.onmouseenter = (e) => productNextImage(e);
    curretTarget.onmouseleave = (e) => productPreviousImage(e);

    return () => {
      curretTarget.removeEventListener("onmouseenter", productNextImage);
      curretTarget.removeEventListener("onmouseleave", productPreviousImage);
    };
  }, [galleryImages]);

  return (
    <div className="product" ref={productRef}>
      <div className="product-image-container">
        <img
          className="product-image"
          src={galleryImages[0].url}
          alt=""
          ref={imageRef}
        />
      </div>
      <div className="product-info">
        <Link
          to={`/product/${product.defaultArticle.code}`}
          className="product-title"
        >
          <h2>{name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
