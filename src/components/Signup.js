import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import "./Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    //some firebase shit
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(function (response) {
          console.log(response);
          toast.success("Logged in");
          history.push("/");
        })
        .catch(function (error) {
          toast.error(error.message);
        });
    } else {
      setError("Passwords do not match!");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-up</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />
          <h5>Password</h5>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
          <h5>Confirm password</h5>
          <input
            type="text"
            name=""
            id=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={register} className="login__signInButton">
            Sign up
          </button>
        </form>
        <h3 style={{ color: "red", marginTop: "5px" ,display:'flex',justifyContent:"center"}}>{error}</h3>
      </div>
    </div>
  );
}

export default Signup;
