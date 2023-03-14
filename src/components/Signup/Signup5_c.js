import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Signup5_c.scss";
import OtpInput from "react-otp-input";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMobile, setUid } from "../../features/signUpSlice";
import toast, { Toaster } from "react-hot-toast";

function Signup5_c() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  var number = "";
  const [num, setNum] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    sendOTP();
  }, []);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {}
        },
        auth
      );
    }
  };

  const sendOTP = () => {
    number = location.state.phone;
    setNum(number);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = () => {
    window.confirmationResult
      .confirm(code)
      .then(async (res) => {
        dispatch(setUid(res.user.uid));
        dispatch(setMobile(num));
        navigate("/uploadDetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signUp5_c">
      <Toaster
        toastOptions={{ duration: 3000 }}
        containerStyle={{
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: "5% 0 0 0"
        }}
      />
      <div id="recaptcha-container"></div>
      <h3 className="heading">Enter Confirmation Code</h3>
      <h5 className="info">Enter the code we sent to {num}</h5>
      <div className="userInput">
        <h6>CODE</h6>
        <OtpInput
          value={code}
          onChange={(inp) => setCode(inp)}
          numInputs={6}
          inputStyle="otpInputSingle"
          containerStyle="otpInput"
          separator={<span></span>}
        />
      </div>
      <h5 className="resendCode" onClick={sendOTP}>
        Resend Code
      </h5>
      <Button
        sx={{
          backgroundColor: code.length < 6 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: code.length < 6 ? "#c8c8c8" : "#ade6ff"
          }
        }}
        className="signUp5_cButton"
        onClick={verifyOTP}
        disabled={code.length < 6 ? true : false}
      >
        Continue
      </Button>
    </div>
  );
}

export default Signup5_c;
