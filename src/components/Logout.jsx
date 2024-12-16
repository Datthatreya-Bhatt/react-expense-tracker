import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Logout = ()=>{
    const history = useHistory();

    function logoutHandler(){
        localStorage.clear();
        history.push('/login');
        console.log('logout')
    }
    
    return (
        <>
            <button onClick={()=> {logoutHandler()}}>Logout</button>
        </>
    );
};


export default Logout;  