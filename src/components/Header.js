import React from "react";
import "./Header.css";
// import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStatevalue } from "../context/react-context";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const [{ basket, user }] = useStatevalue();
  const history = useHistory();

  const profileClickHandler = () => {
    if (user) {
      auth.signOut();
      toast.success("Logged out");
      history.push("/");
    }
  };

  const basketTotalItems = basket?.reduce(
    (amount, item) => item.quantity + amount,
    0
  );
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        {/* <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" /> */}
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">
            Hello, {!user ? "Guest" : user?.email}
          </span>
          <Link to={!user && "/login"}>
            <span
              onClick={profileClickHandler}
              className="header__optionLineTwo"
            >
              {!user ? "Sign In" : "Sign Out"}
            </span>
          </Link>
        </div>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        {/* <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div> */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basketTotalItems || "0"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
