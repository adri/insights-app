/**
 * @flow
 */
import React, { AppRegistry, Component } from 'react-native';
import { fromJS } from 'immutable';
import configureStore from './src/store/configureStore';
import init from './src/init';
import { Provider } from 'react-redux';

const store = configureStore(fromJS({}));
import App from './src/App.js';

class Insights extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('insights', () => Insights);
init(store);
