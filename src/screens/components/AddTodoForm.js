import React, { Component } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  Icon,
  Form,
  Picker,
  Input,
  Item,
  DatePicker,
  Card
} from "native-base";

import { connect } from "react-redux";


class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  

  setDate(newDate) {
    this.setState({ date: newDate });
  }

  render() {
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          
          <Form>
            <Item>
              <Input placeholder="Create a new todo item" />
            </Item>
            <View style={{ marginTop: 20, flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <DatePicker
                  defaultDate={new Date()}
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
              <Button iconRight style={{ flex: 0 }}>
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

export default AddTodoForm;
