import React, { Component } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

class HomeScreen extends Component {
  async componentDidMount() {
    if (this.props.user.user === null) {
      this.props.navigation.navigate("Auth");
    } else {
      this.props.navigation.navigate("App");
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(HomeScreen);
