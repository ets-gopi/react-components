import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
const stripePromise = loadStripe(
  "pk_test_51OEt4OSGSp8DnrU8UUYjMkKX9khV5cQ3sAtWkeGsCHIUXD5NhTRwuYjBRr2X1d4pU25pPWA0oTpyyQCY2Eo9NdoJ002d0BETNC"
);

const appearance = {
  theme: "stripe",
};
// Enable the skeleton loader UI for optimal loading.
const loader = "auto";

const Checkout = () => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret:
          "pi_3QMWNhIPedPoXQNK0reCJgeL_secret_MiVKGRK890GoyCR2iMq0BUYhy",
        appearance,
        loader,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
