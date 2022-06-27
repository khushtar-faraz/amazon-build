import React from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { useStatevalue } from "../context/react-context";
import { getBasketTotal } from "../context/reducer";
import "./Subtotal.css";

function Subtotal() {
  const [{ basket }] = useStatevalue();
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" id="" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        className={basket.length === 0 ? "disabled" : ""}
        disabled={basket.length === 0}
        onClick={(e) => history.push("/deliveryaddress")}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
