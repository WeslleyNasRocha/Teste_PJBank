import React, { Component } from "react";
import { View } from "react-native";
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
  Right
} from "native-base";

import { connect } from "react-redux";

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "all" };
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
          <Button danger>
            <Icon name="trash" active />
          </Button>
        }
        right={
          <View style={{ flexDirection: "row" }}>
            <Button warning onPress={() => console.log(item)}>
              <Icon name="create" active />
            </Button>
            <Button success>
              <Icon name="checkmark" active />
            </Button>
          </View>
        }
        body={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ padding: 5 }}>{item.title}</Text>
            <Text>{new Date(item.date).toLocaleDateString("pt-br")}</Text>
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
              dataArray={this.props.filtered}
              renderRow={item => this.renderRow(item)}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ todo }) => {
  const { filtered, todos, filter } = todo;
  return { todos, filtered, filter };
};

export default connect(mapStateToProps)(TodosList);
