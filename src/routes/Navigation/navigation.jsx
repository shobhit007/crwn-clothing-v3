import "./navigation.css";
import React from "react";

import { Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../images/crown.svg";

const Navigation = () => {
  return (
    <React.Fragment>
      <header>
        <div className="navbar">
          <a href="/">
            <Logo className="logo" />
          </a>
          <ul className="primary-navbar">
            <li>
              <a href="/" className="nav-link">
                Shop
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Sign In
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Cart
              </a>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default Navigation;
