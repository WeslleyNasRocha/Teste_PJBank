import {
  ADD_TODO,
  FETCHED_TODOS,
  FETCH_TODOS,
  REMOVE_TODO,
  PURGE,
  USER
} from "../types/todoTypes";

const initialState = {
  todos: [],
  filter: "all",
  isFetching: true,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;

    case USER:
      return {
        ...state,
        user: action.payload.user
      };

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
        todos: action.payload
      };

    case REMOVE_TODO:
      const index = state.todos.indexOf(action.payload);
      const newArray = state.todos.splice(index, 1);
      return { ...state, todos: newArray };
    default:
      return state;
  }
};
