import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Form, Picker, Card, CardItem } from "native-base";

import TodoListItem from "./TodoListItem";

import { connect } from "react-redux";

import { setTodos, completeTodo, deleteTodo } from "../../actions/todoActions";
class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: true
    };

    this.deleteRow = this.deleteRow.bind(this);
    this.edit = this.edit.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  onFilterValueChange(value) {
    this.setState({
      filter: value
    });
  }
  deleteRow(todo) {
    this.props.deleteTodo(todo);
  }

  edit(todo) {
    this.props.navigation.navigate("Editor", { todo: todo });
  }

  completeTodo(todo) {
    this.props.completeTodo(todo);
  }

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  render() {
    return (
      <View>
        <Card>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Form>
              <Picker
                style={{ width: 200 }}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.filter}
                onValueChange={this.onFilterValueChange.bind(this)}
              >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Completed" value="done" />
                <Picker.Item label="Not Completed" value="todo" />
              </Picker>
            </Form>
          </View>
          <CardItem header style={{ backgroundColor: "#bbb" }}>
            <Text>Todos</Text>
          </CardItem>
          <CardItem>
            <FlatList
              data={this.props.todos}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <TodoListItem
                  todo={item}
                  deleteRow={this.deleteRow}
                  edit={this.edit}
                  completeTodo={this.completeTodo}
                />
              )}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ todo }) => {
  const { todos } = todo;
  return { todos };
};

export default connect(
  mapStateToProps,
  { setTodos, completeTodo, deleteTodo }
)(TodosList);
