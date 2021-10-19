import React from "react";
import { Alert } from "@mui/material";
import styles from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { signin } from "../api";
import { getToken, setToken } from "../util";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { isAuth } = useContext(AuthContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = await signin({ email, password });
    if (token.error) {
      console.log("don't save");
      setError(token.error.message);
    } else {
      console.log("token saved");
      setToken(token);
      console.log(getToken());
      isAuth.current = true;
      setEmail("");
      setPassword("");
      history.push("/");
    }
  };

  // if (getToken()) {
  //   history.push("/");
  // }
  return (
    <div className={styles.formContainer}>
      {error && (
        <Alert
          onClose={() => {
            setError("");
          }}
          severity="error"
        >
          {error}
        </Alert>
      )}
      <form className={styles.loginForm}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          value={email}
          className={styles.inputField}
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          value={password}
          className={styles.inputField}
          type="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className={styles.button} onClick={submitHandler}>
          Login
        </button>
        <p className={styles.link}>
          Don't Have an Account? <Link to="/Register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
