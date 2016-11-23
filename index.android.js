/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    UIManager
} from 'react-native';

import {Provider} from 'react-redux';
import {configureStore} from './src/store';

import Main from './src/component/Main';

const store = configureStore();

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('gaus', () => App);
