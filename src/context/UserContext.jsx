import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setphotoUrl] = useState("");

  return (
    <UserContext.Provider
      value={{ fullName, setFullName, photoUrl, setphotoUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
