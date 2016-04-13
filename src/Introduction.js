/**
 * @flow
 */
import React, { Component, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
//import { actions as routerActions } from 'react-native-router-redux';

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Introduction extends Component {
  render() {
    const { actions } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={actions.routes.login()}>
          <Text style={styles.welcome}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

//export default connect(
//  state => ({ state: state }),
//  dispatch => ({ actions: {dispatch}})
//)(Introduction)

