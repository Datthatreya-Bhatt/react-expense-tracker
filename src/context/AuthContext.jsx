import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = "http://localhost:3000";
  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        confirmPassword,
        setEmail,
        setPassword,
        setConfirmPassword,
        url,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext, AuthContext };
