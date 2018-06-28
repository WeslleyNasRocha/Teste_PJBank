import { USER } from '../types/todoTypes';

const initialState = { user: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
};
