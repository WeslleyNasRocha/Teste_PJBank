import React, { Component } from "react";
import { View, Keyboard, StyleSheet, TouchableOpacity } from "react-native";

import moment from "../../util/moment";

import { Text, Form, Input, Item, Card, Label } from "native-base";

import Toast from "react-native-root-toast";
import Datepicker from "react-native-datepicker";

import { connect } from "react-redux";

import { addTodo } from "../../actions/todoActions";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: null
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ date: moment(newDate, "DD/MM/YYYY") });
  }

  handleAdd() {
    const { title, date } = this.state;
    Keyboard.dismiss();
    if (title === "") {
      const toast = Toast.show("Title cannot be empty", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    } else if (date === null) {
      const toast = Toast.show("Date cannot be empty", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    } else {
      this.setState({
        title: "",
        date: null
      });
      this.props.addTodo({
        title,
        date: moment(date, "DD/MM/YYYY").toISOString()
      });
    }
  }

  render() {
    const { title, date } = this.state;
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          <Text style={styles.title}>ADD A TODO</Text>
          <Form>
            <Item style={styles.container}>
              <Text>Todo name</Text>
              <Input
                placeholder="Create a new todo item"
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </Item>
            <Item style={styles.container}>
              <Label>Todo date</Label>
              <Datepicker
                date={date ? moment(date).format("DD/MM/YYYY") : ""}
                mode="date"
                placeholder="Please select a date"
                format="DD/MM/YYYY"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                  console.log(date);
                  this.setDate(date);
                }}
                showIcon={false}
                customStyles={styleDatepicker}
                allowFontScaling
                style={{ width: "100%" }}
              />
            </Item>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  this.handleAdd();
                }}
                color="#27ae60"
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </Card>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodoForm);

export const styleDatepicker = {
  placeholderText: {
    fontSize: 16,
    color: "black"
  },
  dateInput: {
    padding: 0,
    alignItems: "flex-start"
  },
  dateText: {
    fontSize: 18
  }
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#27ae60",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  container: {
    marginBottom: 20,
    marginHorizontal: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
    marginBottom: 15
  }
});
