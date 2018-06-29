import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Left,
  Right,
  Button,
  Text,
  Icon
} from "native-base";

import Spinner from "react-native-loading-spinner-overlay";

import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

import { fetchTodos, purge } from "../actions/todoActions";

class TodoScreen extends Component {
  componentWillMount() {
    // console.log(this.props.todo.todos);
    if (this.props.todo.todos.length === 0) {
      this.props.fetchTodos();
    }
  }

  render() {
    return (
      <Container style={{ paddingTop: 24 }}>
        <Header>
          <Left />
          <Body>
            <Title>Todos -> {this.props.todo.user}</Title>
          </Body>
          <Right>
            <Button
              hasText
              transparent
              onPress={() => {
                this.props.purge();
                this.props.navigation.navigate("Auth");
              }}
            >
              <Text>Log Out </Text>
              <Icon name="log-out" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <AddTodoForm />
          <TodoList />
          <Spinner visible={this.props.todo.isFetching} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ todo }) => {
  return { todo };
};

export default connect(
  mapStateToProps,
  { fetchTodos, purge }
)(TodoScreen);
