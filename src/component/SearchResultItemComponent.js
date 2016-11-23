import React, {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import MaterialColors from 'material-colors';

class SearchResultItemComponent extends Component {
    render() {
        const {item, style} = this.props;

        return (
            <View style={[style, styles.container]}>
                <View>
                    <Text style={styles.title}> {item.title} </Text>
                </View>

                <View>
                    <Text style={styles.url}> {item.url} </Text>
                </View>

                <View>
                    <Text> {item.description} </Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        padding: 16
    },
    url: {
        color: MaterialColors.green[500]
    },
    title: {
        fontWeight: 'bold'
    }
};

export default SearchResultItemComponent;