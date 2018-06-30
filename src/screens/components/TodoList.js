import React, { Component } from "react";
import { View, ListView, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Icon,
  Form,
  Picker,
  List,
  Card,
  CardItem,
  SwipeRow,
  Right,
  Badge,
  ListItem
} from "native-base";

import { connect } from "react-redux";

import { setTodos, completeTodo } from "../../actions/todoActions";
class TodosList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true
    };
  }

  onFilterValueChange(value) {
    this.setState({
      filter: value
    });
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.todos];
    newData.splice(rowId, 1);
    this.props.setTodos(newData);
  }

  edit(todo) {
    this.props.navigation.navigate("Editor", { todo: todo });
  }

  completeTodo(todo) {
    this.props.completeTodo(todo);
  }

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
            <List
              dataSource={this.ds.cloneWithRows(this.props.todos)}
              renderRow={item => (
                <ListItem
                  style={
                    item.isCompleted ? styles.completed : styles.notCompleted
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignContent: "stretch"
                    }}
                  >
                    <Text
                      style={{ padding: 5, alignSelf: "flex-start", flex: 2 }}
                    >
                      {item.title}
                    </Text>
                    <Badge primary>
                      <Text
                        style={{
                          flex: 1,
                          justifyContent: "center"
                        }}
                      >
                        {new Date(item.date).toLocaleDateString("pt-br")}
                      </Text>
                    </Badge>
                  </View>
                </ListItem>
              )}
              renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
                <Button
                  full
                  danger
                  onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                >
                  <Icon name="trash" active />
                </Button>
              )}
              renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                <View style={{ flexDirection: "row" }}>
                  <Button warning full onPress={() => this.edit(data)}>
                    <Icon name="create" active />
                  </Button>
                  <Button success full onPress={() => this.completeTodo(data)}>
                    <Icon name="checkmark" active />
                  </Button>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-150}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notCompleted: {
    backgroundColor: "white"
  },
  completed: {
    backgroundColor: "#00B294"
  }
});

const mapStateToProps = ({ todo }) => {
  const { todos } = todo;
  return { todos };
};

export default connect(
  mapStateToProps,
  { setTodos, completeTodo }
)(TodosList);
