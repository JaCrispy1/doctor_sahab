import React from "react";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";

const Checkout = (props) => {
  const { state } = useLocation();
  const phone = localStorage.getItem("phone");
  const token = Math.floor(1000 + Math.random() * 9000);
  console.log(state);
  const saveNotification = () => {
    console.log(state);
    const object = {
      hospital: state.doctor.hospital,
      doctor: state.doctor,
      speciality: state.doctor.speciality,
      phone: phone,
      Date: state.date + " " + state.time,
      token: token,
      price: 1000,
    };
    console.log(object);
    const response = fetch("http://localhost:3000/api/user/addNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(object),
    });
    console.log(response);
  };

  let config = {
    // replace this key with yours
    publicKey: "test_public_key_61510e6c87904f95b1fe226b5b0612ca",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication

        saveNotification();
        alert("Payment Successful");
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
        alert("Payment Failed");
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);
  function PayWithKhalti() {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({ amount: 1000 });
  }

  return (
    <Flex direction={"column"}>
      <Text>{state.time}</Text>
      <Box>
        <Button onClick={PayWithKhalti}>Pay with Khalti</Button>
      </Box>
    </Flex>
  );
};

export default Checkout;
