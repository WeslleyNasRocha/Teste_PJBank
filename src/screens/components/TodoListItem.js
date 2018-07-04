import React, { PureComponent } from "react";
import { View, StyleSheet, Picker } from "react-native";

import { Text, Badge, Icon } from "native-base";

import moment from "../../util/moment";

export default class TodoListItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, date, isCompleted, id } = this.props.todo;       
    return (
      <View style={styles.container}>
        <Text style={[styles.text, isCompleted ? styles.textCompleted : ""]}>
          {title}
        </Text>
        <Badge style={styles.date}>
          <Text>{moment(date).format("DD/MM/YYYY").toString()}</Text>
        </Badge>
        <View style={styles.optionContainer}>
          <Icon name="more" style={styles.optionPicker} />
          <Picker
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              const { deleteRow, edit, completeTodo, todo } = this.props;
              if (itemValue === "del") {
                deleteRow(todo);
              } else if (itemValue === "edit") {
                edit(todo);
              } else if (itemValue === "check") {
                completeTodo(todo);
              }
            }}
          >
            <Picker.Item label="Options" value="" />
            <Picker.Item label="Delete" value="del" />
            <Picker.Item label="Edit" value="edit" />
            <Picker.Item
              label={isCompleted ? "Mark as not done" : "Mark as done"}
              value="check"
            />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },
  text: {
    flex: 3
  },
  textCompleted: {
    textDecorationLine: "line-through",
    fontStyle: "italic"
  },
  date: {
    width: 100
  },
  optionContainer: {
    width: 20,
    marginLeft: 10,
    justifyContent: "center"
  },
  optionPicker: {
    position: "absolute"
  }
});
