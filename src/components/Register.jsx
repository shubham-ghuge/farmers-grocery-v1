import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser, setMessage } from "../features/authSlice";
import { Alert } from "./Alert";

function Register() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    confirmPassword: "",
    password: "",
  });
  const { loading, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function registerFormHandler(e) {
    e.preventDefault();
    const checkValidations =
      userDetails.name.length >= 4 &&
      userDetails.password.length >= 6 &&
      userDetails.password === userDetails.confirmPassword;
    if (checkValidations) {
      dispatch(
        registerUser({
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
        })
      );
    }
  }

  return (
    <div className="flex-column auth-form jc-center ai-center">
      {message && (
        <Alert message={message} onClose={() => dispatch(setMessage())} />
      )}
      <h2 className="fsz-3">Register</h2>
      <form
        className="flex-column my-4 ai-center"
        onSubmit={(e) => registerFormHandler(e)}
      >
        <label className="fsz-1 flex-column fw-500">
          <span className="mb-2">Name</span>
          <input
            className="mb-4"
            type="text"
            placeholder="john doe"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails((curr) => ({ ...curr, name: e.target.value }))
            }
            required
          />
        </label>
        {userDetails.name.length !== 0 && userDetails.name.length < 4 && (
          <span className="c-danger text-sm">name must be 4 characters</span>
        )}
        <label className="fsz-1 flex-column fw-500">
          <span className="mb-2">Email</span>
          <input
            className="mb-4"
            type="email"
            placeholder="john@farmersgrocery.com"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((curr) => ({ ...curr, email: e.target.value }))
            }
            required
          />
        </label>
        <label className="fsz-1 flex-column fw-500">
          <span className="mb-2">Password</span>
          <input
            className="mb-4"
            type="password"
            placeholder="Enter Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((curr) => ({ ...curr, password: e.target.value }))
            }
            required
          />
        </label>
        {userDetails.password.length !== 0 &&
          userDetails.password.length < 6 && (
            <span className="c-danger text-sm">
              password must be 6 characters
            </span>
          )}
        <label className="fsz-1 flex-column fw-500">
          <span className="mb-2">Confirm Password</span>
          <input
            className="mb-4"
            type="password"
            placeholder="Enter confirm Password"
            value={userDetails.confirmPassword}
            onChange={(e) =>
              setUserDetails((curr) => ({
                ...curr,
                confirmPassword: e.target.value,
              }))
            }
            required
          />
        </label>
        {userDetails.confirmPassword.length !== 0 &&
          userDetails.password !== userDetails.confirmPassword && (
            <span className="c-danger text-sm">password doesn't match</span>
          )}
        <button className="btn-primary">
          {loading ? "signing in..." : "register"}
        </button>
      </form>
      <p>
        already have an account?<Link to="/auth">Login</Link>
      </p>
    </div>
  );
}
export { Register };
