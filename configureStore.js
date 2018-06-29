import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

import userReducer from "./src/reducers/userReducer";
import todoReducer from "./src/reducers/todoReducer";

const persistConfig = {
  key: "user",
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ user: userReducer, todo: todoReducer })
);

let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);

export { store, persistor };
