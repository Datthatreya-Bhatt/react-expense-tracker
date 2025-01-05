import axios from "axios";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useAddExpenseContext } from "../context/AddExpenseContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);


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

  useEffect(() => {
    async function getExpense() {
      try {
        let id = localStorage.getItem("token");
        let res = await axios.get(`${url}/getById/${id}`);
        console.log(res.data[0].expense, "This is getExpense ");
      } catch (error) {
        console.log(error.message);
      }
    }
    getExpense();
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

  async function editHandler(element) {
    try {
      let res = await axios.put(`${url}/edit/${element.id}`, {
        expense: expenseEntry,
      });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async function deleteHandler(element) {
    try {
      let res = await axios.delete(`${url}/delete`);
      console.log("Expense deleted successfully");
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  return (
    <>
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

      {totalExpense > 10000 && <button>Activate Premium</button>}
      <div>
        <h5>Entries</h5>
        {expenseEntry.map((element) => {
          return (
            <div key={element.id}>
              <p>Amount: {element.amount}</p>
              <p>Description: {element.description}</p>
              <p>Category: {element.category}</p>
              <button onClick={editHandler(element)}>Edit</button>
              <button onClick={deleteHandler(element)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddExpense;
