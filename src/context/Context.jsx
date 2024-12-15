import React, { createContext, useState, useContext } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const url = "http://localhost:3000";
  return (
    <Context.Provider
      value={{
        email,
        password,
        confirmPassword,
        setEmail,
        setPassword,
        setConfirmPassword,
        url,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useMyContext = () => useContext(Context);

export { ContextProvider, useMyContext };
