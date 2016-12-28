import React, { Component } from 'react';
import {
  AppRegistry,
  AlertIOS,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  Dimensions
} from 'react-native';
import TouchID from 'react-native-touch-id';
import Camera from 'react-native-camera';

var QRCodeScreen = require('./QRCodeScreen');

export default class ReactNativePOC extends Component {
  _renderScene(route, navigator) {
      if (route.id === 0) {
          return <Index navigator={navigator}/>
      } else {
          return <QRCodeScreen navigator={navigator} onSucess={scanResult}/>
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

var Index  = React.createClass( {
    _login: function()  {
        var $this = this;
        TouchID.authenticate('to demo this react-native component')
            .then(success => {
                  $this.props.navigator.push({
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
  },
  render: function()  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native POC!
        </Text>
            <Button onPress={this._login} navigator={this.props.navigator} title='Login'/>
      </View>
    );
  }
});


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
  },
  preview: {
                                 flex: 1,
                                 justifyContent: 'flex-end',
                                 alignItems: 'center',
                                 height: Dimensions.get('window').height,
                                 width: Dimensions.get('window').width
  },
  capture: {
                                 flex: 0,
                                 backgroundColor: '#fff',
                                 borderRadius: 5,
                                 color: '#000',
                                 padding: 10,
                                 margin: 40
  }
});

AppRegistry.registerComponent('ReactNativePOC', () => ReactNativePOC);





function scanResult(result) {
    AlertIOS.alert(result);
}
