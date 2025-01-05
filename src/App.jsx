import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider
import store from "./context/store"; // Import the store

import "./App.css";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dummy from "./components/Dummy";
import UpdateProfile from "./components/UpdateProfile";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import AddExpense from "./components/AddExpense";

function App() {
  return (
    <Provider store={store}> {/* Wrap the app with Provider */}
      <AuthContextProvider>
        <Header />

        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Dummy} />
          <Route path="/updateProfile" component={UpdateProfile} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/addExpense" component={AddExpense} />
        </Switch>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
