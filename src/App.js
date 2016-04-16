/**
 * @flow
 */
import React, { Component, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as routerActions, NavBar, Schema, Route, Router } from 'react-native-router-redux';
import Introduction from './Introduction';
import BeaconScreen from './beacons/BeaconScreen';

class App extends Component {
  render() {
    return (
      <Router {...this.props} initial="introduction">
        <Schema name="default" navBar={NavBar} />

        <Route name="introduction" title="Enrise Insights" component={Introduction} />
        <Route name="login" component={BeaconScreen} />
      </Router>
    );
  }
}

export default connect(
  state => ({
    router: state.get('router')
  }),
  dispatch => ({
    actions: bindActionCreators(routerActions, dispatch),
    dispatch
  })
)(App);
