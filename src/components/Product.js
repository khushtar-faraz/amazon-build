import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useStatevalue } from "../context/react-context";
import "./Product.css";
function Product({ id, title, rating, price, image }) {
  const [{ user, basket }, dispatch] = useStatevalue();
  const history = useHistory();

  console.log("This is the basket>>>", basket);
  const addToBasket = () => {
    if (user) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id,
          title,
          rating,
          price,
          image,
          quantity: 1,
        },
      });
      toast.success("Added to basket");
    } else {
      history.push("/login");
    }
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
