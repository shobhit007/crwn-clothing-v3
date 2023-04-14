import "./navigation.css";
import React from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../images/crown.svg";

import { setIsCartOpen } from "../../store/cart/cart.actions";

import { selectCartCount } from "../../store/cart/cart.selectors";

import CartModal from "../../components/cart-modal/cart.modal.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const handleCartOpen = () => dispatch(setIsCartOpen());

  const cartCount = useSelector(selectCartCount);
  const currentUser = useSelector(selectCurrentUser);

  const handleUserSignOut = () => dispatch(signOutStart());

  return (
    <React.Fragment>
      <header>
        <div className="navbar">
          <a href="/">
            <Logo className="logo" />
          </a>
          <ul className="primary-navbar">
            <li>
              {!currentUser ? (
                <a href="/signin" className="nav-link uppercase">
                  Sign In
                </a>
              ) : (
                <span
                  className="cart-button uppercase"
                  onClick={handleUserSignOut}
                >
                  Log out
                </span>
              )}
            </li>
            <li>
              <span
                className="cart-button uppercase"
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
