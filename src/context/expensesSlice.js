import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
