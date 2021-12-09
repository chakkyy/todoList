import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { addTodo } from "../../redux/actions";
import Swal from "sweetalert2";
import "./AddTodo.scss";
import { motion } from "framer-motion";

export function AddTodo() {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must complete the text field before send!",
      });
      return;
    } else {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.currentTarget.value);
  };

  return (
    <header className="addtodo__container">
      <form onSubmit={handleAddTodo}>
        <input
          aria-label="Enter todo"
          value={input}
          className="addtodo__input"
          onChange={handleInputChange}
          type="text"
          placeholder="Add Todo..."
          data-testid="input"
        />
        <motion.button
          aria-label="add todo"
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="addtodo__btn"
        >
          <GoPlus />
        </motion.button>
      </form>
      <br />
    </header>
  );
}
