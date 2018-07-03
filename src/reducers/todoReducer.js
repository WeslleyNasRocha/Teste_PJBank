import {
  ADD_TODO,
  SET_TODOS,
  FETCH_TODOS,
  UPDATE_TODO,
  PURGE,
  USER,
  DELETE_TODO,
  COMPLETE_TODO,
  INCREASE_ID,
  SET_ID_COUNT
} from "../types/todoTypes";

const initialState = {
  todos: [],
  filter: "all",
  isFetching: true,
  user: null,
  idCount: 0
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
      console.log(action, state);
      const { title, date } = action.payload.todo;
      const newTodo = { title, date, id: state.idCount, isComplete: false };
      return { ...state, todos: state.todos.concat(newTodo) };

    case FETCH_TODOS:
      return { ...state, isFetching: true };

    case SET_TODOS:
      return {
        ...state,
        isFetching: false,
        todos: action.payload
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(
          todo => (todo.id === action.payload.id ? { ...action.payload } : todo)
        )
      };

    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.id === action.payload.id
              ? { ...todo, isCompleted: !action.payload.isCompleted }
              : todo
        )
      };

    case INCREASE_ID:
      return { ...state, idCount: state.idCount + 1 };

    case SET_ID_COUNT:
      return { ...state, idCount: action.payload };

    case DELETE_TODO:
      const newTodos = state.todos.filter(todo => {
        return todo.id !== action.payload.id;
      });
      return { ...state, todos: newTodos };

    default:
      return state;
  }
};
