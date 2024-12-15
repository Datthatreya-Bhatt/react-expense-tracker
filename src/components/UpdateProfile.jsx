import React from "react";
import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const UpdateProfile = () => {
  const { fullName, setFullName, photoUrl, setphotoUrl } = useUserContext();
  const { url } = useAuthContext();

  async function handleUpdate() {
    try{
        let id = localStorage.getItem('token');
        console.log(id, 'This is id in handleUpdate');
        let res = await axios.post(`${url}/update/${id}`, {
            fullName, photoUrl
        });

        console.log(res.data);

    }catch(error){
        console.log(error?.message || 'Something went wrong.');
    }
  }

  return (
    <>
      <h4>Full name</h4>
      <input type="text" onChange={(e) => setFullName(e.target.value)} />
      <h4>Photo URL</h4>
      <input type="text" onChange={(e) => setphotoUrl(e.target.value)} />

      <br />
      <button onClick={() => handleUpdate()}>Update</button>
      <button onClick={() => console.log("Canceled")}>Cancel</button>
    </>
  );
};

export default UpdateProfile;
