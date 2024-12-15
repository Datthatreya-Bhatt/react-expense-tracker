import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";





const Dummy = ()=>{

    const {isLoggedIn} = useAuthContext();
    const history = useHistory();
    if(!isLoggedIn){
        return <Redirect to="/login"/>
    }

    function submitHandler(){
        history.push('/updateProfile');
    }

    return (
        <>
            <h4>Welcome to Expense Tracker</h4>
            <button onClick={submitHandler()}>Your profile is incomplete, Complete Now!</button>
        </>
    );
};


export default Dummy;