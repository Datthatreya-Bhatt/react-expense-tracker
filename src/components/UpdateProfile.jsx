import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const UpdateProfile = () => {
  const { fullName, setFullName, photoUrl, setphotoUrl } = useUserContext();
  const { url } = useAuthContext();

  useEffect(()=>{
    try {
        
        async function getData(){
            const id = localStorage.getItem('token');
            let res = await axios.get(`${url}/getByid/${id}`);
            if(res.data?.length){
                let data = res.data[0];
                setFullName(data?.fullName || '');
                setphotoUrl(data?.photoUrl || '');
            }
        };
        getData();
    } catch (error) {
        console.log(error);
    }
  }, []);

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
      <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}/>
      <h4>Photo URL</h4>
      <input type="text" onChange={(e) => setphotoUrl(e.target.value)} value={photoUrl}/>

      <br />
      <button onClick={() => handleUpdate()}>Update</button>
      <button onClick={() => console.log("Canceled")}>Cancel</button>
    </>
  );
};

export default UpdateProfile;
