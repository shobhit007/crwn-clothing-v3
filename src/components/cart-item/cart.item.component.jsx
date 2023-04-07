import "./cart.item.style.css";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.actions";

import { selectCartItems } from "../../store/cart/cart.selectors";

function CartItem({ item }) {
  const { product, quantity } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleAddItemToCart = (product) =>
    dispatch(addItemToCart(cartItems, product));
  const handleRemoveItemToCart = (product) =>
    dispatch(removeItemFromCart(cartItems, product));
  const handleClearItemToCart = (product) =>
    dispatch(clearItemFromCart(cartItems, product));

  return (
    <div className="cart-product-card">
      <div className="cart-product-wrapper">
        <div className="cart-product--image">
          <img src={product.images[0].baseUrl} alt="" />
        </div>
        <div className="cart-product-content">
          <div className="cart-product-content--top">
            <h3 className="fs-600 fw-400">{product.name}</h3>
            <p className="fs-500 mt">{`$ ${
              product.whitePrice.price * quantity
            }`}</p>
          </div>
          <div className="cart-product-content-bottom">
            <div className="quantity-buttons">
              <button
                className="btn-quantity"
                onClick={() => handleRemoveItemToCart(product)}
              >
                <i className="ri-subtract-line"></i>
              </button>
              <div className="cart-product-quantity">
                <p>{quantity}</p>
              </div>
              <button
                className="btn-quantity"
                onClick={() => handleAddItemToCart(product)}
              >
                <i className="ri-add-line"></i>
              </button>
            </div>

            <button
              className="btn-cart-product-remove"
              onClick={() => handleClearItemToCart(product)}
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
