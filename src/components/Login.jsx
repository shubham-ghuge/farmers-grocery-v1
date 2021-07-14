import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setMessage } from "../features/authSlice";
import { Alert } from "./Alert";

function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const { loading, message, userLoginStatus } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoginStatus) {
      navigate("/cart");
    }
  }, [userLoginStatus]);

  function loginFormHandler(e) {
    e.preventDefault();
    dispatch(loginUser(userDetails));
  }

  return (
    <div className="flex-column auth-form jc-center ai-center">
      {message && (
        <Alert message={message} onClose={() => dispatch(setMessage())} />
      )}
      <h2 className="fsz-3">Login</h2>
      <form
        className="flex-column my-4 ai-center"
        onSubmit={(e) => loginFormHandler(e)}
      >
        <label className="fsz-1 flex-column fw-500">
          <span className="mb-2">Email</span>
          <input
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
            type="password"
            placeholder="*******"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((curr) => ({ ...curr, password: e.target.value }))
            }
            required
          />
        </label>
        <button className="btn-primary">
          {loading ? "loggin in" : "login"}
        </button>
        <button
          className="btn-c-primary"
          onClick={() =>
            setUserDetails({
              email: "shubhamghuge34@gmail.com",
              password: "aaaaaa",
            })
          }
        >
          Demo Login
        </button>
      </form>
      <p>
        New Here? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
}
export { Login };
