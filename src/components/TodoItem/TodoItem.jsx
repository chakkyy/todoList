import React, { useRef } from "react";
import { removeTodo, updateTodo, completeTodo } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { KEY } from "../../constants";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import "./TodoItem.scss";
import { motion } from "framer-motion";

export function TodoItem({ todo }) {
  const { text, completed } = todo;

  const dispatch = useDispatch();
  const inputRef = useRef(true);

  const handleRemoveTodo = () => {
    dispatch(removeTodo(todo.id));
  };

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      dispatch(updateTodo({ id, value }));
      localStorage.setItem(KEY, JSON.stringify(value));
      inputRef.current.disabled = true;
    }
  };

  const handleCompleteTodo = () => {
    dispatch(completeTodo(todo.id));
  };

  return (
    <motion.article
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
      }}
      className="card__container"
      data-testid="todo"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={text}
        onKeyPress={(e) => update(todo.id, inputRef.current.value, e)}
      />
      <div className="card__btnscontainer">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          <AiFillEdit />
        </motion.button>
        {!completed && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={handleCompleteTodo}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={handleRemoveTodo}
        >
          <IoClose />
        </motion.button>
      </div>
      {todo.completed && <span className="card__completed">done✨</span>}
    </motion.article>
  );
}
