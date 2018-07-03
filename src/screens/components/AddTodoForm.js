import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import {
  Button,
  Text,
  Icon,
  Form,
  Input,
  Item,
  DatePicker,
  Card
} from "native-base";

import Toast from "react-native-root-toast";

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
    this.setState({ date: new Date(newDate) });
  }

  render() {
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          <Form>
            <Item>
              <Input
                placeholder="Create a new todo item"
                onChangeText={title => this.setState({ title })}
              />
            </Item>
            <View style={{ marginTop: 20, flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <DatePicker
                  defaultDate={null}
                  minimumDate={new Date()}
                  locale={"pt-br"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"slide"}
                  androidMode={"default"}
                  placeHolderText="Select date you want to remember"
                  placeHolderTextStyle={{ color: "#738" }}
                  onDateChange={this.setDate}
                />
              </View>
              <Button
                iconRight
                style={{ flex: 0 }}
                onPress={() => {
                  Keyboard.dismiss();
                  if (this.state.title === "") {
                    const toast = Toast.show("Title cannot be empty", {
                      duration: Toast.durations.SHORT,
                      position: Toast.positions.BOTTOM,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0
                    });
                  } else if (this.state.date === null) {
                    const toast = Toast.show("Date cannot be empty", {
                      duration: Toast.durations.SHORT,
                      position: Toast.positions.BOTTOM,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0
                    });
                  } else {
                    this.props.addTodo(this.state);
                    this.setState({
                      title: "",
                      date: null
                    });
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
