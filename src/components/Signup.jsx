import React, { useState } from "react";
import { useMyContext } from "../context/Context";
import axios from "axios";

function Signup() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    url,
  } = useMyContext();

  async function handleSubmit() {
    try {
      let message = "";
      if (
        email.trim().length &&
        password.trim().length &&
        confirmPassword.trim().length
      ) {
        if (!email.includes("@")) {
          message = "Enter valid email";
          alert(message);
          return message;
        }
        if (confirmPassword === password) {
          const res = await axios.post(`${url}/create`, {
            id: Date.now(),
            email,
            password,
          });
          message = "success";
          console.log("User has successfully signed up.");
        } else {
          message = "Password does not match with confirmed password.";
        }
      } else {
        console.log(email, password, confirmPassword);
        message = "Please enter all required field.";
      }

      alert(message);
      return message;
    } catch (error) {
      alert(`${error?.message || "something went wrong"}`);
    }
  }

  return (
    <>
      <h4>Email</h4>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />
      <h4>Password</h4>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <h4>Confirm Password</h4>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />{" "}
      <br />
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
}

export default Signup;
