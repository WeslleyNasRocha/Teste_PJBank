import { ADD_TODO, FETCHED_TODOS, FETCH_TODOS } from "../types/todoTypes";
import { PURGE } from "redux-persist";

const initialState = {
  todos: [],
  filter: "all",
  filtered: [],
  isFetching: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return {};

    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload.title,
            date: action.payload.date,
            isCompleted: action.isCompleted
          }
        ],
        filtered: [
          ...state.filtered,
          {
            title: action.payload.title,
            date: action.payload.date,
            isCompleted: action.isCompleted
          }
        ],
        isFetching: false
      };

    case FETCH_TODOS:
      return { ...state, isFetching: true };

    case FETCHED_TODOS:
      return {
        ...state,
        isFetching: false,
        todos: action.payload,
        filtered: action.payload
      };

    default:
      return state;
  }
};
