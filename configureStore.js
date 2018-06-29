import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import reduxReset from "redux-reset";

import todoReducer from "./src/reducers/todoReducer";

export const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ todo: todoReducer })
);

const enHanceCreateStore = compose(
  composeWithDevTools(applyMiddleware(thunk)),
  reduxReset() // Will use 'RESET' as default action.type to trigger reset
)(createStore);

let store = enHanceCreateStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
