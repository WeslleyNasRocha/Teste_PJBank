import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Left,
  Right,
  Button,
  Text,
  Icon,
  Card,
  Form,
  Item,
  Label,
  DatePicker,
  CheckBox,
  Input
} from "native-base";

import { updateTodo } from "../actions/todoActions";

class EditorScreen extends Component {
  constructor(props) {
    super(props);
    this.todo = this.props.navigation.getParam("todo");
    this.state = {
      title: this.todo.title,
      date: new Date(this.todo.date),
      isCompleted: this.todo.isCompleted,
      id: this.todo.id
    };
  }

  editTodo() {
    this.props.updateTodo(this.state);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container style={{ paddingTop: 24 }}>
        <Header>
          <Left>
            <Button
              hasText
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Edit -> {this.todo.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <Form style={{ margin: 10 }}>
              <Item floatingLabel>
                <Label>Nome</Label>
                <Input
                  value={this.state.title}
                  onChangeText={title => this.setState({ title })}
                />
              </Item>
              <View
                style={{
                  marginTop: 20,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 20
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ marginLeft: 15 }}>Date</Text>
                  <DatePicker
                    defaultDate={new Date(this.todo.date)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
                    locale={"pt-BR"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={{ color: "green" }}
                    placeHolderText={this.state.date.toLocaleDateString(
                      "pt-BR"
                    )}
                    onDateChange={date => this.setState({ date })}
                  />
                </View>
                <View style={{ flex: 0 }}>
                  <Body>
                    <Text>Completed?</Text>
                  </Body>
                  <CheckBox
                    checked={this.state.isCompleted}
                    onPress={() =>
                      this.setState({ isCompleted: !this.state.isCompleted })
                    }
                  />
                </View>
              </View>
              <Button
                full
                onPress={() => {
                  this.editTodo();
                }}
              >
                <Text>Save</Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  { updateTodo }
)(EditorScreen);
