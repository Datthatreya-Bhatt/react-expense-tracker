import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const {
    email,
    setEmail,
    setPassword,
    password,
    url,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuthContext();
  const history = useHistory();

  async function handleSubmit() {
    try {
      let res = await axios.post(`${url}/validate`, {
        email,
        password,
      });
      if (res?.data === "failed") {
        alert("Failed");
        return res.data;
      }

      if (res?.data?.length) {
        const verifyEmailRes = await axios.get(`${url}/verifyEmail`);
        if (verifyEmailRes?.data?.length) {
          localStorage.setItem("token", res.data);
          setIsLoggedIn(true);
          history.push("/home");
        }
      }
    } catch (error) {
      console.log(error.message || "something went wrong in login component");
    }
  }

  return (
    <>
      <h4>Email</h4>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />
      <h4>Password</h4>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <br />
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
};

export default Login;
