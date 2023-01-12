import React from "react";
import { useStatevalue } from "../context/react-context";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }] = useStatevalue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_NotApproved._TTW_.jpg"
          alt=""
          className="checkout__ad"
        />
        <div>
          {user && <h3>Hello {user?.email}</h3>}
          <h2 className="checkout__title">Your shopping basket:</h2>
        </div>
        {basket.length > 0 ? (
          basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              image={item.image}
              key={item.id}
              quantity={item.quantity}
            />
          ))
        ) : (
          <h1 className="checkout__empty">Your cart is empty!!</h1>
        )}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
