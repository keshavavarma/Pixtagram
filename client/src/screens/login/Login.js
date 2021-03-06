import React from "react";
import { Alert } from "@mui/material";
import styles from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { signin } from "../../api";
import { setToken } from "../../util";
import { AuthContext } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const { isAuth } = useContext(AuthContext);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await signin({ email, password });
    if (token.error) {
      setError(token.error.message);
      setLoading(false);
    } else {
      setToken(token);
      isAuth.current = true;
      setLoading(false);
      setEmail("");
      setPassword("");
      history.push("/");
    }
  };

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
        <button
          disabled={loading}
          className={styles.button}
          onClick={submitHandler}
        >
          {loading ? (
            <CircularProgress color="inherit" fontSize="small" />
          ) : (
            "Login"
          )}
        </button>
        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            setEmail("sheldon@gmail.com");
            setPassword("sheldoncooper");
          }}
        >
          Guest Credentials
        </button>
        <p className={styles.link}>
          Don't Have an Account? <Link to="/Register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
