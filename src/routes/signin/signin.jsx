import "./signin.style.css";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import { Link } from "react-router-dom";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import AuthButton from "../../components/auth-button/auth-button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart(email, password));
    setFormFields(defaultFormFields);
  };

  const handleGoogleSignIn = () => dispatch(googleSignInStart());

  return (
    <div className="singin-container">
      <div className="signin-wrapper">
        <div className="form-wrapper">
          <div className="form-content">
            <form onSubmit={handleSignInWithEmail}>
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
              <AuthButton type="submit" buttonText="Sign in" />
              <AuthButton
                type="button"
                buttonText="Sign in with Google"
                buttonType="google"
                onClick={handleGoogleSignIn}
              />
            </form>
            <div className="mt">
              <Link to="/signup" className="navigation-link text-color-black">
                Don't have an account? Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
