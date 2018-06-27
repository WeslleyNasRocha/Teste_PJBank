import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
  Text
} from 'react-native';
import { get, keys } from 'react-native-simple-store';
import { Button } from 'react-native-elements';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    console.log('started');
    this.state = { teste: 'teste' };
    // this._bootstrapAsync().then(() => console.log('finished'));
  }

  componentWillMount() {
    this.getStorage().then(retorno => console.log(retorno));
  }

  async getStorage() {
    data = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiGet(data).then(data => {
      let retorno = {};
      data.forEach(async x => {
        key = x[0];
        value = x[1];
        retorno[key] = value;
      });
      return retorno;
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
        <Button onPress={() => console.log('teste')} title={this.state.teste} />
      </View>
    );
  }
}
