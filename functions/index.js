const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HcM1GBiFFqFnVq951wQhObfWtFom6pRGQernfdGzrvGnJu08235E4x7HKXXzBXr1B8Kekch3jeofS9QgGZSH2eD00990AMTbR"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved. >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// firebase deploy --only functions
// npm run build
// firebase deploy --only hosting

// firebase emulators:start
// firebase emulators:start  // --only firestore
