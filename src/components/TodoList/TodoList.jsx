import React, { useState } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.scss";
import { useDispatch } from "react-redux";
import { clearCompleted } from "../../redux/actions";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";

export function TodoList({ todos }) {
  const [sort, setSort] = useState("all");
  const dispatch = useDispatch();

  const handleClearCompleted = () => {
    Swal.fire({
      icon: "success",
      title: "Your taks has been deleted",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(clearCompleted());
  };

  return (
    <section className="grid__main">
      <div className="grid__buttons">
        <div className="grid__filters">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("all")}
          >
            All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("completed")}
            aria-label="active todos"
          >
            Completed
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("uncompleted")}
            aria-label="uncompleted todos"
          >
            Uncompleted
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClearCompleted}
          className="btn__clearCompleted"
        >
          Clear Completed
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {/* for uncompleted items */}
          {todos.length > 0 && sort === "uncompleted"
            ? todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem key={item.id} todo={item} />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {todos.length > 0 && sort === "completed"
            ? todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem key={item.id} todo={item} />
                  )
                );
              })
            : null}
          {/* for all items */}
          {todos.length > 0 && sort === "all"
            ? todos.map((item) => {
                return <TodoItem key={item.id} todo={item} />;
              })
            : null}
        </AnimatePresence>
      </ul>
      <p className="grid__tasksleft" data-testid="todoCount">
        {todos.length === 0
          ? "You have no tasks, yay! 🎉"
          : todos.filter((todo) => !todo.completed).length +
            " tasks to finish! ✨"}
      </p>
    </section>
  );
}
