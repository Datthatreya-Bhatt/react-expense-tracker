import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddExpense from "../AddExpense";
import { useAuthContext } from "../../context/AuthContext";
import { useAddExpenseContext } from "../../context/AddExpenseContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../context/store";  


jest.mock("axios");

describe("AddExpense Component", () => {
  
    
  beforeEach(() => {
    useAuthContext.mockReturnValue({ url: "http://fakeapi.com" });
    useAddExpenseContext.mockReturnValue({
      amount: "",
      setAmount: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      category: "Food",
      setCategory: jest.fn(),
      expenseEntry: [],
      setExpenseEntry: jest.fn(),
    });
  });

  test("renders AddExpense component correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("form inputs update correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "100" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Food expense" } });

    expect(screen.getByPlaceholderText("Amount").value).toBe("100");
    expect(screen.getByPlaceholderText("Description").value).toBe("Food expense");
  });

  test("submit adds expense and resets inputs", async () => {
    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "100" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Food expense" } });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(useAddExpenseContext().setExpenseEntry).toHaveBeenCalledWith([
        { id: expect.any(String), amount: "100", description: "Food expense", category: "Food" },
      ]);
      expect(screen.getByPlaceholderText("Amount").value).toBe("");
      expect(screen.getByPlaceholderText("Description").value).toBe("");
    });
  });

  test("CSV download button appears if total expense exceeds 10000", () => {
    useAddExpenseContext.mockReturnValue({
      ...useAddExpenseContext(),
      expenseEntry: [
        { amount: 5000, description: "Food", category: "Food" },
        { amount: 6000, description: "Rent", category: "Housing" },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Download File")).toBeInTheDocument();
  });

  test("Activate Premium button appears if total expense exceeds 10000", () => {
    useAddExpenseContext.mockReturnValue({
      ...useAddExpenseContext(),
      expenseEntry: [
        { amount: 5000, description: "Food", category: "Food" },
        { amount: 6000, description: "Rent", category: "Housing" },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Activate Premium")).toBeInTheDocument();
  });

  test("API POST request when adding an expense", async () => {
    axios.post.mockResolvedValueOnce({ data: "Expense added" });

    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "50" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Miscellaneous" } });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://fakeapi.com/addExpense/fake-id", {
        expense: [{ id: expect.any(String), amount: "50", description: "Miscellaneous", category: "Food" }],
      });
    });
  });

  test("verifyUser redirects to login if no user found", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain("/login");
    });
  });

  test("theme toggles when Activate Premium is clicked", () => {
    useAddExpenseContext.mockReturnValue({
      ...useAddExpenseContext(),
      expenseEntry: [
        { amount: 5000, description: "Food", category: "Food" },
        { amount: 6000, description: "Rent", category: "Housing" },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("Activate Premium"));

    expect(store.getState().theme.isDarkTheme).toBe(true);
  });

  test("expense entries are displayed correctly", () => {
    useAddExpenseContext.mockReturnValue({
      ...useAddExpenseContext(),
      expenseEntry: [
        { amount: 100, description: "Food", category: "Food", id: "1" },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <AddExpense />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Amount: 100")).toBeInTheDocument();
    expect(screen.getByText("Description: Food")).toBeInTheDocument();
    expect(screen.getByText("Category: Food")).toBeInTheDocument();
  });
});
