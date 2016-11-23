import React, {Component} from 'react';

import {
    Image,
    Dimensions
} from 'react-native';

class LogoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        const logoWidth = 735, logoHeight = 119;

        const width = style.width || (Dimensions.get('window').width - 100);
        const height = width/logoWidth*logoHeight;

        return (
            <Image source={require('../../images/rrr-logo.png')} style={[style, {width, height}]} />
        );
    }
}

export default LogoComponent;