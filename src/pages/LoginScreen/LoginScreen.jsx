import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import users from "../../users";
import "./LoginScreen.scss";
import { motion } from "framer-motion";

export const LoginScreen = ({ setIsLoggedIn, isLoggedIn }) => {
  let history = useHistory();

  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    const user = users.find((user) => user.username === username);
    const pass = users.find((user) => user.password === password);
    if (!user || !pass) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User or password are incorrect",
      });
    }

    if (user && pass) {
      localStorage.setItem("accessToken", "token");
      Swal.fire("Entering", "", "success");
      setIsLoggedIn(true);
      history.push("/");
    }
  };

  return (
    <div className="login__container">
      <form onSubmit={handleLoginSubmit} className="login__form">
        <motion.h1
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="form__title"
        >
          Welcome! 👋
        </motion.h1>
        <motion.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 2 }}
          className="login__inputs"
        >
          <label htmlFor="username">
            <span>Username</span>
            <input
              autoComplete="off"
              className="login__input"
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <input
              autoComplete="off"
              className="login__input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </label>
        </motion.div>
        <button className="login__btn" type="submit">
          Login
        </button>
      </form>
      <div className="login__info">
        <p>Username: user </p>
        <p>Password: user</p>
      </div>
    </div>
  );
};
