import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup5.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Signup5() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");

  const recordNumber = () => {
    navigate("/signup5_c", { state: { phone: "+" + number } });
  };

  return (
    <div className="signUp5">
      <h3 className="heading">Whats your mobile number?</h3>
      <h5 className="info">We'll send you a text verification code.</h5>
      <div className="userInput">
        <h6>MOBILE</h6>
        <PhoneInput
          country={"in"}
          value={number}
          onChange={(phone) => setNumber(phone)}
        />
      </div>
      <Button
        sx={{
          backgroundColor: number.length < 12 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: number.length < 12 ? "#c8c8c8" : "#ade6ff"
          }
        }}
        className="signUp5Button"
        onClick={recordNumber}
        disabled={number.length < 12 ? true : false}
      >
        Continue
      </Button>
    </div>
  );
}

export default Signup5;
