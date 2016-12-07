import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableNativeFeedback,
    WebView
} from 'react-native';

import MaterialColors from 'material-colors';

class SearchResultItemComponent extends Component {
    render() {
        const {item, style, onClickItem} = this.props;

        let {desc} = item;

        if( desc.length > 140 ) {
            desc = desc.substr(0, 140).trim() + '..';
        }

        if( !desc ) {
            desc = '요약 정보가 없습니다.';
        }

        return (
            <TouchableNativeFeedback onPress={onClickItem.bind(null, item.pageUrl)}>
                <View style={[style, styles.container]}>
                    <View>
                        <Text style={styles.title}> {item.pageTitle} </Text>
                    </View>

                    <View>
                        <Text style={styles.url}> {item.pageUrl} </Text>
                    </View>

                    <View>
                        <Text> {desc} </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
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