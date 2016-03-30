import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/App.js';
import init from './src/init';

init();

AppRegistry.registerComponent('insights', () => App);
