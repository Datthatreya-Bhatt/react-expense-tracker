import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "../Login";
import { useAuthContext } from "../../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {q
    useAuthContext.mockReturnValue({
      email: "",
      setEmail: jest.fn(),
      password: "",
      setPassword: jest.fn(),
      url: "http://fakeapi.com",
      isLoggedIn: false,
      setIsLoggedIn: jest.fn(),
    });
    useHistory.mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders Login component correctly", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });

  test("email input updates correctly", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });

    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("test@example.com");
  });

  test("password input updates correctly", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText("Password").value).toBe("password123");
  });

  test("form submission with valid credentials", async () => {
    axios.post.mockResolvedValueOnce({ data: "valid_token" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://fakeapi.com/validate", {
        email: "test@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("valid_token");
      expect(useHistory().push).toHaveBeenCalledWith("/home");
    });
  });

  test("form submission with invalid credentials", async () => {
    axios.post.mockResolvedValueOnce({ data: "failed" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });

  test("token is stored in localStorage on successful login", async () => {
    axios.post.mockResolvedValueOnce({ data: "valid_token" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("valid_token");
    });
  });

  test("Forgot password button navigates correctly", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText("Forgot password"));

    expect(useHistory().push).toHaveBeenCalledWith("/forgotPassword");
  });

  test("login button calls handleSubmit function", async () => {
    axios.post.mockResolvedValueOnce({ data: "valid_token" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test("handleSubmit handles API failure gracefully", async () => {
    axios.post.mockResolvedValueOnce({ data: "failed" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });

  test("user is redirected to home on successful login", async () => {
    axios.post.mockResolvedValueOnce({ data: "valid_token" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(useHistory().push).toHaveBeenCalledWith("/home");
    });
  });
});
