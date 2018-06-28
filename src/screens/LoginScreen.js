import React, { Component } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';

import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Button,
  Text
} from 'native-base';

// import { TextInput, Button } from '@shoutem/ui';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    console.log('Login');
  }
  render() {
    // console.log(this.state);
    return (
      <Container>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Image
              source={require('../../assets/icon.png')}
              style={{ alignSelf: 'center' }}
            />
            <Form style={{ margin: 20 }}>
              <Item floatingLabel style={{ marginBottom: 10 }}>
                <Input
                  placeholder="Username"
                  value={this.state.value}
                  onChangeText={value => this.setState({ value })}
                />
              </Item>
              <Button block onPress={() => console.log(this.state.value)}>
                <Text>Logar-se</Text>
              </Button>
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default LoginScreen;

// <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignContent: 'center'
//         }}
//       >
//         <Image
//           source={require('../../assets/icon.png')}
//           style={{ alignSelf: 'center' }}
//         />
//         <KeyboardAvoidingView
//           behavior="padding"
//           enabled
//           keyboardVerticalOffset={70}
//           style={{
//             marginHorizontal: 50
//           }}
//         >
//           <Text>Insira seu nome abaixo:</Text>
//           <TextInput
//             style={{
//               height: 50,
//               fontSize: 16
//             }}
//             placeholder="Nome"
//             value={this.state.value}
//             onChangeText={value => this.setState({ value })}
//           />
//         </KeyboardAvoidingView>
//       </View>
