import React, { Component } from "react";
import { View, ListView } from "react-native";
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
  Badge
} from "native-base";

import { connect } from "react-redux";

import { deleteTodo } from "../../actions/todoActions";

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "all" };
    // this.ds = new ListView.dat
  }

  onFilterValueChange(value) {
    this.setState({
      filter: value
    });
  }

  renderRow(item) {
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-150}
        left={
          <Button danger onPress={() => this.props.deleteTodo(item)}>
            <Icon name="trash" active />
          </Button>
        }
        right={
          <View style={{ flexDirection: "row" }}>
            <Button warning>
              <Icon name="create" active />
            </Button>
            <Button success>
              <Icon name="checkmark" active />
            </Button>
          </View>
        }
        body={
          <View
            style={{ flexDirection: "row", flex: 1, alignContent: "stretch" }}
          >
            <Text style={{ padding: 5, alignSelf: "flex-start", flex: 2 }}>
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
        }
      />
    );
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
              dataArray={this.props.todos}
              renderRow={item => this.renderRow(item)}
              closeOnRowBeginSwipe
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ todo }) => {
  const {  todos, filter } = todo;
  return { todos,  filter };
};

export default connect(
  mapStateToProps,
  { deleteTodo }
)(TodosList);
