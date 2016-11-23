import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Text
} from 'react-native';

import {connect} from 'react-redux';

import SearhResultList from './SearchResultListComponent';

import {
    PRIMARY_COLOR
} from '../consts';

class ContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextPrpos) {
        const {result} = nextPrpos;

        if( this.props.result !== result ) {
            this.forceUpdate();
        }
    }

    render() {
        const {result, status} = this.props;

        let content;

        if( status === 'searching' ) {
            content = (
                <View style={{marginTop: 150}}>
                    <ActivityIndicator color={PRIMARY_COLOR} size="large"/>
                </View>
            );
        }

        else if( status === 'search' ) {
            content = (
                <View style={styles.searchResult}>
                    <View style={styles.searchSubheaderWrapper}>
                        <Text style={styles.searchSubheader}> 검색 결과 {result.length}개 </Text>
                    </View>
                    <SearhResultList result={result} />
                </View>
            );
        }

        return (
            <View>
                {content}
            </View>
        );
    }
}

const styles = {
    searchResult: {
    },
    searchSubheader: {
        fontWeight: 'bold'
    },
    searchSubheaderWrapper: {
        padding: 16
    }
}
function select(state) {
    return {
        result: state.result
    };
}

export default connect(select)(ContentComponent);