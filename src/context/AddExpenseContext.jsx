import React, { createContext, useContext, useState } from "react";

const AddExpenseContext = createContext();
const AddExpenseContextProvider = ({ children }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenseEntry, setExpenseEntry] = useState([]);

  return (
    <AddExpenseContext.Provider
      value={{
        amount,
        setAmount,
        description,
        setDescription,
        category,
        setCategory,
        expenseEntry,
        setExpenseEntry,
      }}
    >
      {children}
    </AddExpenseContext.Provider>
  );
};

const useAddExpenseContext = ()=> useContext(AddExpenseContext);

export { AddExpenseContextProvider, useAddExpenseContext };
