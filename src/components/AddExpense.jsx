import axios from "axios";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useAddExpenseContext } from "../context/AddExpenseContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../context/themeSlice"; 

const AddExpense = () => {
  const { url } = useAuthContext();
  const {
    amount,
    setAmount,
    description,
    setDescription,
    category,
    setCategory,
    expenseEntry,
    setExpenseEntry,
  } = useAddExpenseContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme); 

  const totalExpense = expenseEntry.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    async function verifyUser() {
      try {
        let id = localStorage.getItem("token");
        let res = await axios.get(`${url}/getById/${id}`);
        if (!res?.data?.length) {
          history.push("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    verifyUser();
  }, []);

  useEffect(() => {
    async function addExpense() {
      try {
        let id = localStorage.getItem("token");
        let res = await axios.post(`${url}/addExpense/${id}`, {
          expense: expenseEntry,
        });
        console.log(res.data, "This is res in addExpense");
      } catch (error) {
        console.log(error.message);
      }
    }
    addExpense();
  }, [expenseEntry]);

  async function handleSubmit() {
    try {
      setExpenseEntry([
        ...expenseEntry,
        { id: `${Date.now()}`, amount, description, category },
      ]);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  }

  // Handle CSV download
  const handleDownload = () => {
    const csvContent = "Amount,Description,Category\n" + expenseEntry.map((expense) => 
      `${expense.amount},${expense.description},${expense.category}`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    link.click();
  };

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <h4>Amount</h4>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <h4>Description</h4>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h4>Category</h4>
      <select name="Category" onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
      </select>

      <br />
      <button onClick={() => handleSubmit()}>Add</button>

      {totalExpense > 10000 && (
        <button onClick={() => dispatch(toggleTheme())}>Activate Premium</button>
      )}

      {totalExpense > 10000 && (
        <button onClick={handleDownload}>Download File</button>
      )}

      <div>
        <h5>Entries</h5>
        {expenseEntry.map((element) => {
          return (
            <div key={element.id}>
              <p>Amount: {element.amount}</p>
              <p>Description: {element.description}</p>
              <p>Category: {element.category}</p>
              <button onClick={() => editHandler(element)}>Edit</button>
              <button onClick={() => deleteHandler(element)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddExpense;
