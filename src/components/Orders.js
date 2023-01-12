import React, { useEffect, useState } from "react";
import { useStatevalue } from "../context/react-context";
import { db } from "../firebase";
import Order from "./Order";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStatevalue();
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders.length > 0 ? (
          orders?.map((order) => <Order order={order} />)
        ) : (
          <h2
            style={{
              marginTop: "20%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            No orders to display!
          </h2>
        )}
      </div>
    </div>
  );
}

export default Orders;
