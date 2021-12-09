import React, { useEffect } from "react";
import { TodoList } from "../../components/TodoList/TodoList";
import { AddTodo } from "../../components/AddTodo/AddTodo";
import { useSelector } from "react-redux";
import { KEY } from "../../constants";
import { Title } from "../../components/Title/Title";
import { motion } from "framer-motion";

export function Home() {
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Title />
      <motion.main
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <AddTodo />
        <TodoList todos={todos} />
      </motion.main>
    </>
  );
}
