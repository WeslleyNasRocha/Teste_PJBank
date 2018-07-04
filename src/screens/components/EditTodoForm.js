import React, { Component } from "react";
import {
  View,
  Keyboard,
  Switch,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import moment from "../../util/moment";

import { Text, Icon, Form, Input, Item, Card, Label } from "native-base";

import Toast from "react-native-root-toast";
import Datepicker from "react-native-datepicker";

class EditTodoForm extends Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    const { title, date, isCompleted, id } = this.props.todo;
    this.state = {
      title: title,
      date: moment(date).format("DD/MM/YYYY"),
      isCompleted: isCompleted,
      id: id
    };
  }

  setDate(newDate) {
    this.setState({ date: moment(newDate, "DD/MM/YYYY") });
  }

  handleUpdate() {
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
      this.props.update(this.state);
    }
  }

  render() {
    const { title, date, isCompleted } = this.state;
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          <Form>
            <Item style={styles.container}>
              <Label>Todo name: </Label>
              <Input
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </Item>
            <Item style={styles.container}>
              <Label>Todo date: </Label>
              <View style={{ flex: 1 }}>
                <Datepicker
                  date={date ? moment(date, "DD/MM/YYYY") : ""}
                  mode="date"
                  placeholder="Please select a date"
                  format="DD/MM/YYYY"
                  minDate={moment("L", "DD/MM/YYYY").toString()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    console.log(date);
                    this.setDate(date);
                  }}
                  showIcon={false}
                  style={{ width: 250 }}
                />
              </View>
            </Item>
            <Item style={styles.container}>
              <Label>Is completed?</Label>
              <Switch
                value={isCompleted}
                onValueChange={() =>
                  this.setState({ isCompleted: !isCompleted })
                }
              />
            </Item>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  this.handleUpdate();
                }}
                color="#27ae60"
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </Card>
    );
  }
}

export default EditTodoForm;
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
  }
});
