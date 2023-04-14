import "./form-input.style.css";
import React from "react";

function FormInput({ label, ...otherProps }) {
  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      {label && (
        <label
          className={`form-input-label ${
            otherProps.value.length ? "shrink-label" : null
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
