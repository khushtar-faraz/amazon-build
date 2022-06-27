import React from "react";
import { useHistory } from "react-router-dom";
import { useStatevalue } from "../context/react-context";
import "./AddressCard.css";

function AddressCard({ address }) {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStatevalue();
  const history = useHistory();
  const buttonClickHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_DELIVERY_ADDRESS",
      payload: {
        country: address.data.country,
        fullName: address.data.fullName,
        mobile: address.data.mobile,
        pincode: address.data.pincode,
        house: address.data.house,
        street: address.data.street,
        landmark: address.data.landmark,
        city: address.data.city,
        state: address.data.state,
      },
    });
    history.push("/payment");
  };
  return (
    <div className="addressCard">
      <div className="addressCard__container">
        <h2 className="addressCard__fullName">{address.data.fullName}</h2>
        <p>{address.data.house}</p>
        <p>{address.data.street}</p>
        <p>
          {address.data.city}, {address.data.state}- {address.data.pincode}
        </p>
        <p>{address.data.country}</p>
        <button onClick={buttonClickHandler} className="addressCard__button">
          Deliver to this address
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
