import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // axios.defaults.baseURL = "http://localhost:3001/api/v0";
  const handleLogin = (e) => {
    e.preventDefault();
    // Check if email ends with @nitc.ac.in
    axios
      .post("/authenticate/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        
        console.log("Succesfully logged in");
        console.log(response.data)
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user_id", response.data.user.user_id);
        /*localStorage.setItem("email", response.data.user.email);*/
        localStorage.setItem("name", response.data.user.name);
        /*localStorage.setItem("phone",response.data.user.phone);*/
        localStorage.setItem("role",response.data.user.role);
        /*localStorage.setItem("year_of_study",response.data.user.year_of_study);
        localStorage.setItem("address",response.data.user.address)*/

        const userRole = response.data.user.role;
        login(userRole); 
        navigate("/home");
      })
      .catch((err) => {
        setErrMsg("Invalid username or password");
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });

    // Handle login logic here (e.g., API call to authenticate user)
  };

  return (
    <div className="auth-container">
      <div className="sign-in">
        <h2>Sign in</h2>
        <p>Use your @nitc.ac.in account</p>
        {errMsg?.length ? <p className="error">{errMsg}</p> : ""}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
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
          <div className="auth-links">
            <Link to="/forgot-password">Forgot your password?</Link>
            <Link to="/admin-login" className="admin-login">
              Admin login
            </Link>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            onClick={(e) => handleLogin(e)}
          >
            SIGN IN
          </button>
        </form>
      </div>
      <div className="sign-up">
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start your journey with us</p>
        <Link to="/register" className="sign-up-button">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Login;
