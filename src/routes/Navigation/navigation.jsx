import "./navigation.css";
import React from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../images/crown.svg";

import { setIsCartOpen } from "../../store/cart/cart.actions";

import { selectCartCount } from "../../store/cart/cart.selectors";

import CartModal from "../../components/cart-modal/cart.modal.component";

const Navigation = () => {
  const dispatch = useDispatch();
  const handleCartOpen = () => dispatch(setIsCartOpen());

  const cartCount = useSelector(selectCartCount);

  return (
    <React.Fragment>
      <header>
        <div className="navbar">
          <a href="/">
            <Logo className="logo" />
          </a>
          <ul className="primary-navbar">
            <li>
              <a href="/shop" className="nav-link">
                Shop
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Sign In
              </a>
            </li>
            <li>
              <span
                className="cart-button"
                onClick={handleCartOpen}
              >{`Cart (${cartCount})`}</span>
            </li>
          </ul>
        </div>
        <CartModal />
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default Navigation;
