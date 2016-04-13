/**
 * @flow
 */
import React, { AppRegistry, Component } from 'react-native';
import Immutable from 'immutable';
import configureStore from './src/store/configureStore';
import updateCheck from './src/utils/updateCheck';
import { Provider } from 'react-redux';

const store = configureStore(Immutable.fromJS({}));
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
updateCheck();
