import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
  Text
} from "react-native";
import { get, keys } from "react-native-simple-store";
import { Button } from "react-native-elements";

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { log: "default" };
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      // this.setState({ log: "boot" });
      AsyncStorage.getItem("name")
        .then(val => {
          this.setState({ log: val });
        })
        .catch(e => this.setState({ log: e }));
      // console.log("get");
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    // console.log("1");
    // console.log("mount");
    // this.setState({ log: "mount" });
    const data = await AsyncStorage.getAllKeys();
    // console.log("getAll");
    this.setState({ log: "getAll" });
    // console.log("2");
    console.log(data);
  }

  async componentDidUpdate() {
    // console.log("update");
    const data = await AsyncStorage.getItem("name");
    // console.log("getUpdate");
    this.setState({ log: "getUpdate" });
    console.log(data);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
        <Text>{this.state.log}</Text>
        <Button onPress={() => AsyncStorage.setItem("name", "teste")}>
          Teste
        </Button>
      </View>
    );
  }
}
