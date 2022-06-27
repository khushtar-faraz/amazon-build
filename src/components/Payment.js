import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStatevalue } from "../context/react-context";
import { getBasketTotal } from "../context/reducer";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user, deliveryAddress }, dispatch] = useStatevalue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE CLIENT SECRET IS >>>", clientSecret);

  const handleSubmit = async (e) => {
    //some stripe magic will happen here
    e.preventDefault();
    setProcessing(true);
    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((payload) => {
        console.log(payload.paymentIntent);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(payload.paymentIntent.id)
          .set({
            basket: basket,
            amount: payload.paymentIntent.amount,
            created: payload.paymentIntent.created,
          });
        setProcessing(false);
        setSucceeded(true);
        setError(null);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <h2>{deliveryAddress.fullName}</h2>
            <p>{deliveryAddress.house}</p>
            <p>{deliveryAddress.street}</p>
            <p>
              {deliveryAddress.city}, {deliveryAddress.state}-
              {deliveryAddress.pincode}
            </p>
            <p>{deliveryAddress.country}</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
                key={item.id}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={disabled || processing || succeeded}>
                  <span>{processing ? <p>processing...</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
