/**
 * @flow
 */
import React, { Component, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as routerActions, NavBar, Schema, Route, Router } from 'react-native-router-redux';
import Colors from '../config/colors';
import Introduction from './Introduction';
import BeaconScreen from './beacons/BeaconScreen';
import PullToRefresh from './animations/PullToRefresh/PullToRefresh';
import WindowShade from './animations/WindowShade';

class App extends Component {
  render() {
    return (
      <Router {...this.props} initial="introduction">
        <Schema name="default" navBar={NavBar} navTint={Colors.navBarBackground} navLeftColor={Colors.black} />

        <Route name="introduction" title="Insights" component={Introduction} />
        <Route name="pullToRefresh" title="Pull to refresh" component={PullToRefresh} />
        <Route name="windowShade" title="Window shade" component={WindowShade} />
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
