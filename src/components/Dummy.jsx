import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";





const Dummy = ()=>{

    const {isLoggedIn} = useAuthContext();
    if(!isLoggedIn){
        return <Redirect to="/login"/>
    }

    return (
        <>
            <h4>Welcome to Expense Tracker</h4>
        </>
    );
};


export default Dummy;