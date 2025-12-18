import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import Layout from "./Layouts";

function Login() {
  const navigate = useNavigate();
  // localStorage.clear();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validations
    if (!loginData.email || !loginData.password) {
      alert("Both fields are required!");
      return;
    }

    if (!loginData.email.endsWith("@gmail.com")) {
      alert("Email must end with @gmail.com");
      return;
    }

    // try {
    //   const response = await api.post("/user/login", loginData);
    //   console.log(response.data.success);
    // } catch (error) {
    //   console.log(error);
    //   alert("Login failed!");
    // }
    try {
      const response = await api.post(
        "/user/login",
        loginData,
        { withCredentials: true } // IMPORTANT for cookie
      );

      const { success, message, redirect } = response.data;

      if (!success) {
        alert(message);
        return;
      }

      // 🔥 Navigate based on backend redirect
      if (redirect) {
        navigate(redirect);
      }
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };

  return (
    <>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
