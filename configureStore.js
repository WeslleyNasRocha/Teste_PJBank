import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import userReducer from './src/reducers/userReducer';
import todoReducer from './src/reducers/todoReducer';

const persistConfig = {
  key: 'user',
  storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

let store = createStore(
  combineReducers({ user: persistedReducer, todo: todoReducer })
);
let persistor = persistStore(store);

export { store, persistor };
