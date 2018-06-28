import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AppLoading } from 'expo';

class SplashScreen extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator color="yellow" />
      </View>
    );
  }
}
export default SplashScreen;
