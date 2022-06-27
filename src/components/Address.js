import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStatevalue } from "../context/react-context";
import "./Address.css";
import { db } from "../firebase";
import AddressCard from "./AddressCard";

function Address() {
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [fetchedAddresses, setFetchedAddresses] = useState([]);
  const [{ user }, dispatch] = useStatevalue();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("DeliveryAddresses")
        .onSnapshot((snapshot) =>
          setFetchedAddresses(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_DELIVERY_ADDRESS",
      payload: {
        country,
        fullName,
        mobile,
        pincode,
        house,
        street,
        landmark,
        city,
        state,
      },
    });
    db.collection("users")
      .doc(user?.uid)
      .collection("DeliveryAddresses")
      .doc()
      .set({
        country,
        fullName,
        mobile,
        pincode,
        house,
        street,
        landmark,
        city,
        state,
      });
    setCountry("");
    setFullName("");
    setMobile("");
    setPincode("");
    setHouse("");
    setStreet("");
    setState("");
    setLandmark("");
    setCity("");
    history.push("/payment");
  };
  return (
    <div className="address">
      <div className="address__innerNav">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/checkout/checkout-spc-address-banner._CB485947649_.gif"
          alt=""
        />
      </div>
      <div id="address__content">
        <div className="address__innerWidget">
          <h1 className="address__mainHeading">Select a delivery address</h1>
          <p>
            Is the address you'd like to use displayed below? If so, click the
            corresponding "Deliver to this address" button. Or you can enter a
            new delivery address.
          </p>
          <hr />
          <div className="address__container">
            {fetchedAddresses?.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>
          <hr />
        </div>
        <div>
          <div className="address__formContainer">
            <h2>Add a new address</h2>
            <form action="">
              <span>Country</span>
              <br />
              <input
                className="address__inputFields"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>Full Name</span>
              <br />
              <input
                className="address__inputFields"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>Mobile Number</span>
              <br />
              <input
                className="address__inputFields"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>Pincode</span>
              <br />
              <input
                className="address__inputFields"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="6 digits [0-9] PIN code"
              />
              <br />
              <span>Flat, House no., Building, Company, Apartment</span>
              <br />
              <input
                className="address__inputFields"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>Area, Street, Sector, Village</span>
              <br />
              <input
                className="address__inputFields"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>Landmark</span>
              <br />
              <input
                className="address__inputFields"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>City/Town</span>
              <br />
              <input
                className="address__inputFields"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <span>State</span>
              <br />
              <input
                className="address__inputFields"
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <br />
              <button
                onClick={formSubmitHandler}
                className="address__primaryButton"
              >
                Use this address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
