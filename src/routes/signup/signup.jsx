import "../signin/signin.style.css";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";

import { signUpStart } from "../../store/user/user.action";

import { selectUserError } from "../../store/user/user.selector";

import AuthButton from "../../components/auth-button/auth-button.component";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, displayName, confirmPassword } = formFields;
  const [isPasswordsMatched, setIsPasswordsMatched] = useState(true);
  const dispatch = useDispatch();

  const err = useSelector(selectUserError);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsPasswordsMatched(false);
    } else {
      dispatch(signUpStart(email, password, dispatch));
      setFormFields(defaultFormFields);
      setIsPasswordsMatched(true);
    }
  };

  return (
    <div className="singin-container">
      <div className="signin-wrapper">
        <div className="form-wrapper">
          <div className="form-content">
            <form onSubmit={handleSignInWithEmail}>
              <FormInput
                label="Display Name"
                type="text"
                name="displayName"
                required
                value={displayName}
                onChange={onChangeHandler}
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                required
                value={email}
                onChange={onChangeHandler}
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                required
                value={password}
                onChange={onChangeHandler}
              />
              <FormInput
                label="Confirm password"
                type="password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onChangeHandler}
              />
              {!isPasswordsMatched && (
                <span className="warning-text">Password didn't match</span>
              )}
              {err && <span className="warning-text">{err.code}</span>}
              <AuthButton type="submit" buttonText="Sign up" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
