import React, { Component } from "react";
import { View, Keyboard, Switch } from "react-native";

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

class EditTodoForm extends Component {
  constructor(props) {
    super(props)
    this.setDate = this.setDate.bind(this);
    const { title, date, isCompleted, id } = this.props.todo
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


  render() {
    const { title, date, isCompleted } = this.state
    return (
      <Card>
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
          <Form>
            <Item>
              <Input
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </Item>
            <View style={{ marginTop: 20, marginLeft: 15, flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Datepicker
                  date={date ? moment(date,"DD/MM/YYYY") : ""}
                  mode="date"
                  placeholder="Please select a date"
                  format="DD/MM/YYYY"
                  minDate={moment("L","DD/MM/YYYY").toString()}
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
              <View>
                <Switch value={isCompleted} onValueChange={()=>this.setState({isCompleted:!isCompleted})} />
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
                    console.log(this.state);                    
                    this.props.update(this.state);
                  }
                }}
              >
                <Text>Save</Text>
                <Icon name="add-circle" />
              </Button>
            </View>
          </Form>
        </View>
      </Card>
    );
  }
}

export default EditTodoForm;