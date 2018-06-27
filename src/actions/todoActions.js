import { ADD_TODO } from "../types/todoTypes";

export const addTodo = (todo, date) => {
  return {
    type: ADD_TODO,
    payload: { text: todo, date }
  };
};
