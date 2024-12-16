import React from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const ForgotPassword = () => {
  const { email, setEmail, url } = useAuthContext();

  async function handleSubmit() {
    try {
      let res = await axios.post(`${url}/forgotPassword`, {
        email,
      });
      if(res?.data?.length){
        console.log('success');
      }
      else{
        console.log('something went wrong');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h4>Email</h4>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />

      <br />
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
};

export default ForgotPassword;
