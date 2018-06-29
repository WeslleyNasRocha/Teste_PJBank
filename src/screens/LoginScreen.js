import React, { Component } from "react";
import { Image, KeyboardAvoidingView } from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

import { setUser } from "../actions/todoActions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
  }
  render() {
    // console.log(this.state);
    return (
      <Container>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content
            contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{ alignSelf: "center" }}
            />
            <Form style={{ margin: 20 }}>
              <Item floatingLabel style={{ marginBottom: 10 }}>
                <Input
                  placeholder="Username"
                  value={this.state.user}
                  onChangeText={user => this.setState({ user })}
                />
              </Item>
              <Button
                block
                onPress={() => {
                  if (this.state.user !== null && this.state.user !== "") {
                    this.props.setUser(this.state.user);
                    this.props.navigation.navigate("App");
                  }
                }}
              >
                <Text>Logar-se</Text>
              </Button>
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default connect(
  null,
  { setUser }
)(LoginScreen);
