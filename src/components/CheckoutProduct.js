import React from "react";
import { useStatevalue } from "../context/react-context";
import "./CheckoutProduct.css";

function CheckoutProduct({
  id,
  title,
  rating,
  price,
  image,
  quantity,
  hidebutton,
}) {
  const [{}, dispatch] = useStatevalue();

  const removeButtonClickHandler = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const addToBasket = () => {
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
  };

  const filterProductFromBasketHandler = () => {
    dispatch({ type: "FILTER_FROM_BASKET", id: id });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />

      <div className="checkoutProduct__info">
        <div className="checkoutProduct__title">
          <p>{title}</p>
        </div>
        <div className="checkoutProduct__price">
          <strong>${price}</strong>
        </div>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <div className="checkoutProduct__controlButtons">
          <button
            onClick={removeButtonClickHandler}
            style={{ cursor: "pointer" }}
          >
            -
          </button>

          <button>{quantity}</button>
          <button onClick={addToBasket} style={{ cursor: "pointer" }}>
            +
          </button>
        </div>
        {!hidebutton && (
          <button onClick={filterProductFromBasketHandler}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
