import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  RESET_LIST,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
} from "../actions/actionTypes";
import { KEY } from "../../constants";

const storedTodos = JSON.parse(localStorage.getItem(KEY));

const initialState = {
  todos: storedTodos || [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, text } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, text, completed: false }],
      };
    }
    case UPDATE_TODO: {
      console.log(action.payload);
      const { id, item } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: item } : todo
        ),
      };
    }
    case COMPLETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    }
    case REMOVE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    case CLEAR_COMPLETED: {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }
    case RESET_LIST: {
      return {
        ...state,
        todos: [],
      };
    }
    default:
      return state;
  }
};
