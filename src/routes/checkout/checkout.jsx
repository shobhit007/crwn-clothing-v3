import "./checkout.style.css";
import React from "react";

import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selectors";

import CartItem from "../../components/cart-item/cart.item.component";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout-section">
      <div className="checkout-container">
        <h1 className="mb ff-noir fs-700 checkout-heading">Checkout</h1>
        <div className="checkout-wrapper">
          {cartItems.map((item) => (
            <CartItem item={item} key={item.product.code} />
          ))}
        </div>
        <div
          className="checkout-price text-align-right mt"
          style={{ "--mt": "2rem" }}
        >
          <p className="checkout-total fs-600">{`Total: $ ${cartTotal.toFixed(
            2
          )}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
