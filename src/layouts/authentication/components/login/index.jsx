import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";
import warehouse from "./warehouse.png";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (email === "admin@gmail.com" && password === "Admin@123") {
      e.preventDefault();
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-info">
        <h1 className="login-title">WarehouseWorx</h1>
        <p className="login-tagline">make warehouse management easy</p>
      </div>

      <div className="login-box">
        <div className="login-header">
          <img src={warehouse} alt="Logo" className="logo" />
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Warehouse Manager Id"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="sign-in-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
