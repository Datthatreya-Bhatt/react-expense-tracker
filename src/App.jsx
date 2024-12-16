import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dummy from "./components/Dummy";
import UpdateProfile from "./components/UpdateProfile";
import { UserContextProvider } from "./context/UserContext";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
      <Header/>

        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Dummy} />
          <Route path="/updateProfile" component={UpdateProfile} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </AuthContextProvider>
    </UserContextProvider>
  );
}

export default App;
