import React, { Component } from "react";
import { View, Button } from "react-native";
import { SocialIcon } from "react-native-elements";
import {} from "expo";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={() => this.logIn()}
        />
      </View>
    );
  }

  // _signInAsync = async () => {

  // };

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "591551417896908",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      //   await AsyncStorage.setItem("userToken", "abc");
      console.log(response);
      this.props.navigation.navigate("App");
    }
  }
}

export default LoginScreen;
