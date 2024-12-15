import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dummy from "./components/Dummy";

function App() {
  return (
    <AuthContextProvider>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Dummy} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
