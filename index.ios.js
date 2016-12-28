import React, { Component } from 'react';
import {
  AppRegistry,
  AlertIOS,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';
import TouchID from 'react-native-touch-id';

var QRCodeScreen = require('./QRCodeScreen');
var nav;

export default class ReactNativePOC extends Component {
  _renderScene(route, navigator) {
      nav = navigator;
      if (route.id === 0) {
          return <Index/>
      } else if (route.id === 1) {
          return <QRCodeScreen/>
      }
  }
  render() {
    return (
      <Navigator
            initialRoute={{id: 0}}
            renderScene={this._renderScene}
      />
    );
  }
}

class Index extends Component {
    constructor (props) {
        super(props);
    }
    _login() {
        TouchID.authenticate('to demo this react-native component')
            .then(success => {
                  nav.push({
                       title: 'QRCode',
                       scene: 1,
                       passProps: {
                       onSucess: scanResult,
                       }
                  });
                })
                .catch(error => {
                   AlertIOS.alert('Authentication Failed');
               });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native POC!
        </Text>
            <Button onPress={this._login} navigator={this.props.navigator} title='Login'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('ReactNativePOC', () => ReactNativePOC);





function scanResult(result) {
    AlertIOS.alert(result);
}
