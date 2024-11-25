import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    axios
      .post("/authenticate/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log("Admin login successful");
        console.log(response.data);

        // Save access token and admin role
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("admin_id", response.data.user.user_id);
        localStorage.setItem("role", response.data.user.role);

        // Redirect to admin panel
        navigate("/admin-panel");
      })
      .catch((err) => {
        console.error("Admin login failed:", err);
        setErrMsg("Invalid email or password");
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="auth-container">
      <div className="sign-in">
        <h2>Admin Login</h2>
        <p>Enter your admin credentials to log in</p>
        {errMsg?.length ? <p className="error">{errMsg}</p> : ""}
        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="sign-in-button"
            onClick={(e) => handleAdminLogin(e)}
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="sign-up">
        <h2>Hello, Admin!</h2>
        <p>Welcome to the admin dashboard. Enter your details to continue.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
