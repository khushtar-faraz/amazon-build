import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleNavigation = (e) => {
    e.preventDefault();
    history.push("/signup");
  };
  const signIn = (e) => {
    e.preventDefault();
    //some firebase shit
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // console.log(response);
        toast.success("Logged in");
        history.push("/");
      })
      // .catch((error) => alert(error.message));
      .catch((error) => toast.error(error.message));
  };

  const signInAsGuest = (e) => {
    e.preventDefault();
    //some firebase shit
    auth
      .signInWithEmailAndPassword("abc@abc.com", "abcabc")
      .then((response) => {
        // console.log(response);
        toast.success("Logged in");
        history.push("/");
      })
      // .catch((error) => alert(error.message));
      .catch((error) => toast.error(error.message));
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
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn} className="login__signInButton">
            Sign in
          </button>
          <button onClick={signInAsGuest} className="login__signInButton">
            Login as Guest
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Internet-Based Ads Notice.
        </p>
        <button onClick={handleNavigation} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
