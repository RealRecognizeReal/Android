import React, {Component} from 'react';

import {
    View,
    Text,
    Dimensions
} from 'react-native';

import SearchResultItem from './SearchResultItemComponent';
import MaterialColors from 'material-colors';

class SearchResultListComponent extends Component {
    render() {
        const {result, style} = this.props;

        let items = result.map(function(item, idx) {
            let style = {
                borderBottomWidth: 1,
                borderBottomColor: MaterialColors.grey[300]
            };

            if( idx === 0 ) {
                style['borderTopWidth'] = 1;
                style['borderTopColor'] = MaterialColors.grey[300];
            }

            return (
                <SearchResultItem
                    key={item._id}
                    item={item}
                    style={style}/>
            );
        });

        return (
            <View style={[style, styles.container]}>
                {items}
            </View>
        );
    }
}

const {width} = Dimensions.get('window');

const styles = {
    container: {
        width
    }
};

export default SearchResultListComponent;