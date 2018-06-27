import { ADD_TODO } from "../types/todoTypes";

const initialState = { text: "", date: null };

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        text: action.payload.text,
        date: actions.payload.date
      };

    default:
      return state;
  }
};
