import { USER } from '../types/todoTypes';

export const setUser = user => {
  return {
    type: USER,
    payload: { user }
  };
};
