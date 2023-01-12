import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useStatevalue } from "./context/react-context";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";
import Address from "./components/Address";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";

const promise = loadStripe(
  "pk_test_51KXiVISJXEQZFXR756JjkYVUdGDVn2CUuXZmEDEXYdsFLqkb5W02lVtly7KuvAUT9TAkFBzDC4QT2ubQ1L5CB5by00qqlnZClr"
);

function App() {
  const [{ user, basket }, dispatch] = useStatevalue();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      } else {
        // User is signed out.
        dispatch({
          type: "SET_USER",
          payload: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          {!user && (
            <Route path="/login">
              <Login />
            </Route>
          )}
          {!user && (
            <Route path="/signup">
              <Signup />
            </Route>
          )}
          {user ? (
            <Route path="/deliveryaddress">
              <Address />
            </Route>
          ) : (
            <Route path="/deliveryaddress">
              <Login />
            </Route>
          )}
          {user ? (
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
          ) : (
            <Route path="/orders">
              <Redirect to="/login" />
            </Route>
          )}
          {user ? (
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
          ) : (
            <Route path="/checkout">
              <Redirect to="/login" />
            </Route>
          )}
          {basket.length !== 0 && (
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
          )}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
