import { ADD_TODO, FETCH_TODOS, FETCHED_TODOS } from "../types/todoTypes";
import { PURGE } from "redux-persist";
import axios from "axios";

export const fetchTodos = () => dispatch => {
  dispatch({ type: FETCH_TODOS });
  // TODO change id
  axios
    .get("https://jsonplaceholder.typicode.com/todos?userId=1")
    .then(todos => {
      console.log(todos);
      if (todos !== null && todos.status === 200) {
        // todos.data.forEach(todo => {
        //   dispatch({
        //     type: ADD_TODO,
        //     payload: {
        //       title: todo.title,
        //       date: new Date(),
        //       isCompleted: todo.completed
        //     }
        //   });
        // });
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

export const purge = () => {
  return { type: PURGE };
};

export const setFilter = () => {};

export const addTodo = (todo, date) => {
  console.log(todo);
  return {
    type: ADD_TODO,
    payload: { text: todo, date }
  };
};
