import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Router from "./src/routes/Router";
import reducers from "./src/reducers";

export default class App extends React.Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
