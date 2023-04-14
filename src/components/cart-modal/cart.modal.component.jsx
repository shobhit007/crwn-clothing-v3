import "./cart.modal.style.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setIsCartOpen } from "../../store/cart/cart.actions";
import {
  selectCartCount,
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selectors";

import { useSelector, useDispatch } from "react-redux";

import CartItem from "../cart-item/cart.item.component";

function CartModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    isCartOpen && (document.body.style.overflow = "hidden");
    !isCartOpen && (document.body.style.overflow = "unset");
  }, [isCartOpen]);

  useEffect(() => {
    const cartModal = document.querySelector(".cart-modal");

    const handleCart = (e) => {
      if (e.target === cartModal) {
        dispatch(setIsCartOpen());
      }
    };

    cartModal.addEventListener("click", handleCart);

    return () => cartModal.removeEventListener("click", handleCart);
  }, [dispatch]);

  const handleCartOpen = () => dispatch(setIsCartOpen());

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen());
  };

  return (
    <div className={`cart-modal ${isCartOpen && "cart-modal-visible"}`}>
      <div
        className={`cart-modal-wrapper ${
          isCartOpen && "cart-modal-wrapper-open"
        }`}
      >
        <div className="cart-modal-header">
          <h2 className="fw-400 fs-600">
            Cart
            <span className="fs-500 ml" style={{ "--ml": "0.5rem" }}>
              {cartCount}
            </span>
          </h2>
          <button className="cart-modal-close-button" onClick={handleCartOpen}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="cart-modal-content">
          {cartItems.map((item) => (
            <CartItem item={item} key={item.product.code} />
          ))}

          <div className="checkout-btn-container">
            <button className="checkout-btn" onClick={goToCheckoutHandler}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
