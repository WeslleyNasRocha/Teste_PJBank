import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
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
  Icon,
  Card,
  Form,
  Item,
  Label,
  DatePicker,
  CheckBox,
  Input
} from "native-base";

import { updateTodo } from "../actions/todoActions";
import EditTodoForm from "./components/EditTodoForm";

class EditorScreen extends Component {
  constructor(props) {
    super(props);
    this.todo = this.props.navigation.getParam("todo");
    this.state = {
      title: this.todo.title,
      date: new Date(this.todo.date),
      isCompleted: this.todo.isCompleted,
      id: this.todo.id
    };
    this.editTodo = this.editTodo.bind(this);
  }

  editTodo(todo) {
    this.props.updateTodo(todo);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container style={{ paddingTop: 24 }}>
        <Header>
          <Left>
            <Button
              hasText
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Edit -> {this.todo.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <EditTodoForm todo={this.todo} update={this.editTodo} />
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  { updateTodo }
)(EditorScreen);
