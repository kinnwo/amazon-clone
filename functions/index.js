const functions = require("firebase-functions");
const express = require("express");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const cors = require("cors");
const { request, response } = require("express");

const stripe = require("stripe")(
  "sk_test_51Ji9cpSB4iYJmgF1JCEWwfk3IIICbGFQqCDFYhvzh4RiZ5yn2p9RWC3iAlCzpZZc6sKKZEq6bvUnTYzskyScF8rd00b092HGVX"
);

//API

// app config
const app = express();

//  Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("boom>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen cmd
exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-56324/us-central1/api
