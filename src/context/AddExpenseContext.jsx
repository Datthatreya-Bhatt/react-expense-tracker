import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import necessary hooks
import { addExpense, setExpenses } from "../context/expensesSlice"; // Import actions

const AddExpenseContext = createContext();

const AddExpenseContextProvider = ({ children }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses); // Access expenses from Redux

  const handleAddExpense = () => {
    const expense = {
      amount: Number(amount),
      description,
      category,
    };
    dispatch(addExpense(expense)); // Dispatch action to add expense
  };

  return (
    <AddExpenseContext.Provider
      value={{
        amount,
        setAmount,
        description,
        setDescription,
        category,
        setCategory,
        expenses,
        handleAddExpense,
      }}
    >
      {children}
    </AddExpenseContext.Provider>
  );
};

const useAddExpenseContext = () => useContext(AddExpenseContext);

export { AddExpenseContextProvider, useAddExpenseContext };
