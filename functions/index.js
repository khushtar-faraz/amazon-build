const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51KXiVISJXEQZFXR7pW33Q4KgpFrLjHeOde40Yyh15knSSqi8UawruHZgvfyJPTRiJQ1B2RlOywBDs42Gv6esHvPq00VxxObKzy");

// API http://localhost:5001/clone-c64da/us-central1/api

// -App config
const app = express();

// -Middlewares
app.use(cors({origin: "*"}));
app.use(express.json());

// -API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received for the amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: total,
    currency: "usd",
    payment_method_types: ["card"],
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// -Listen command
exports.api = functions.https.onRequest(app);
