import React, { Component } from "react";
import { View, Keyboard } from "react-native";

import moment from "../../util/moment";

import {
  Button,
  Text,
  Icon,
  Form,
  Input,
  Item,
  Card
} from "native-base";

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
    this.setState({ date: moment(newDate,"DD/MM/YYYY")});
  }

  render() {
    const { title, date } = this.state;
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          <Form>
            <Item>
              <Input
                placeholder="Create a new todo item"
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </Item>
            <View style={{ marginTop: 20, marginLeft: 15, flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Datepicker
                  date={date ? moment(date).format("DD/MM/YYYY") : ""}
                  mode="date"
                  placeholder="Please select a date"
                  format="DD/MM/YYYY"
                  minDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    console.log(date);
                    this.setDate(date)
                  }}
                  showIcon={false}
                  style={{ width: 250 }}
                />
              </View>
              <Button
                iconRight
                style={{ flex: 0 }}
                onPress={() => {
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
                    this.props.addTodo({ title, date: moment(date,"DD/MM/YYYY").toISOString() });
                  }
                }}
              >
                <Text>Create</Text>
                <Icon name="add-circle" />
              </Button>
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
