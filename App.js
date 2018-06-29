import React from "react";
import { ActivityIndicator } from "react-native";
import { Font } from "expo";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/lib/integration/react";

import { store, persistor } from "./configureStore";

import Router from "./src/routes/Router";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store} >
        <PersistGate
          loading={<ActivityIndicator size="large" color="red" />}
          persistor={persistor}
        >
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
