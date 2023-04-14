import "./auth-button.style.css";
import React from "react";

function AuthButton({ buttonType, buttonText, ...otherProps }) {
  return (
    <button
      className={`btn-auth ${buttonType ? "btn-google-auth" : ""}`}
      {...otherProps}
    >
      {buttonText}
    </button>
  );
}

export default AuthButton;
