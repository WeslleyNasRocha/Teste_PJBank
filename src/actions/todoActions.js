import {
  ADD_TODO,
  FETCH_TODOS,
  FETCHED_TODOS,
  REMOVE_TODO,
  PURGE,
  USER
} from "../types/todoTypes";
import axios from "axios";
import { persistor } from "../../configureStore";

export const fetchTodos = () => dispatch => {
  dispatch({ type: FETCH_TODOS });
  // TODO change id
  axios
    .get("https://jsonplaceholder.typicode.com/todos?userId=1")
    .then(todos => {
      console.log(todos);
      if (todos !== null && todos.status === 200) {
        const newTodos = todos.data.map(todo => {
          return {
            ...todo,
            date: new Date()
          };
        });
        dispatch({ type: FETCHED_TODOS, payload: newTodos });
      }
    });
};

export const setUser = user => {
  return {
    type: USER,
    payload: { user }
  };
};

export const purge = () => {
  persistor.purge({ key: "root" });
  return { type: PURGE };
};

export const deleteTodo = todo => {
  return { type: REMOVE_TODO, payload: todo };
};

export const setFilter = () => {};

export const addTodo = (todo, date) => {
  console.log(todo);
  return {
    type: ADD_TODO,
    payload: { text: todo, date }
  };
};
