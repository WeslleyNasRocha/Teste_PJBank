import { INCREASE_ID, SET_ID_COUNT } from "../types/todoTypes";

const initialState = {
  idCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_ID:
      return { ...state, idCount: state.idCount++ };

    case SET_ID_COUNT:
      return { ...state, idCount: action.payload };

    default:
      return state;
  }
};
