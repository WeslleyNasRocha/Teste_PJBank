import {
  ADD_TODO,
  FETCH_TODOS,
  SET_TODOS,
  PURGE,
  USER,
  DELETE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  SET_ID_COUNT,
  INCREASE_ID
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
            id: todo.id,
            title: todo.title,
            isCompleted: todo.completed,
            date: new Date()
          };
        });
        dispatch({ type: SET_ID_COUNT, payload: newTodos.length });
        dispatch({ type: SET_TODOS, payload: newTodos });
      }
    });
};

export const setUser = user => {
  return {
    type: USER,
    payload: { user }
  };
};

export const updateTodo = todo => {
  return {
    type: UPDATE_TODO,
    payload: todo
  };
};

export const purge = () => {
  persistor.purge({ key: "root" });
  return { type: PURGE };
};

export const setTodos = todos => {
  return { type: SET_TODOS, payload: todos };
};

export const deleteTodo = todo => {
  return { type: DELETE_TODO, payload: todo };
};

export const setFilter = () => {};

export const addTodo = todo => dispatch => {
  dispatch({ type: INCREASE_ID });
  dispatch({
    type: ADD_TODO,
    payload: { todo }
  });
};

export const completeTodo = todo => {
  return {
    type: COMPLETE_TODO,
    payload: todo
  };
};
