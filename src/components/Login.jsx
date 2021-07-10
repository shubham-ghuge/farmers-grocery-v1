import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/authSlice";

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
    <div className="flex-column h-70 jc-center ai-center">
      {message && <h3>{message}</h3>}
      <form
        className="flex-column my-4 ai-center"
        onSubmit={(e) => loginFormHandler(e)}
      >
        <input
          className="mb-4"
          type="email"
          placeholder="john@farmersgrocery.com"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails((curr) => ({ ...curr, email: e.target.value }))
          }
        />
        <input
          className="mb-4"
          type="password"
          placeholder="*******"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails((curr) => ({ ...curr, password: e.target.value }))
          }
        />
        <button className="btn-primary">
          {loading ? "loggin in" : "login"}
        </button>
      </form>
      <p>
        New Here? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
}
export { Login };
