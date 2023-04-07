import "./product.style.css";

import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { name, galleryImages } = product;

  return (
    <div className="product">
      <div className="product-image-container">
        <img className="product-image" src={galleryImages[0].url} alt="" />
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
