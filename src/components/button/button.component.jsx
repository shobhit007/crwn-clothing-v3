import "./button.style.css";
import React from "react";

import { Link } from "react-router-dom";

function Button({ to }) {
  return (
    <Link className="shop-now-button" to={to}>
      Shop now
    </Link>
  );
}

export default Button;
