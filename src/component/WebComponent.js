import React, {Component} from 'react';
import {
    View,
    WebView
} from 'react-native';

class WebComponent extends Component {
    render() {

        return (
            <WebView
                startInLoadingState={true}
                source={{uri: 'https://github.com'}} />
        );

    };
}

export default WebComponent;