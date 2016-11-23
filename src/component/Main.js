import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Platform,
    TextInput,
    TouchableOpacity,
    TouchableNativeFeedback,
    Button,
    LayoutAnimation,
    ActivityIndicator,
    Dimensions,
    ScrollView
} from 'react-native';

import Logo from './LogoComponent';
import {
    fetchSearchWithString
} from '../actions';

import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
    PRIMARY_COLOR
} from '../consts';

import Content from './ContentComponent';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formulaImage: null,
            searchText: '',
            status: 'ready'
        }
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    componentWillReceiveProps(nextProps) {
        const {result} = nextProps;

        if( this.props.result !== result ) {
            this.setState({
                status: 'search'
            });
        }
    }

    _handleSearchButton = () => {
        const {searchText} = this.state;
        const {dispatch} = this.props;

        if( searchText === '' ) return;

        this.setState({
            status: 'searching'
        });

        dispatch(fetchSearchWithString(searchText));
    }

    _handlePressCamera = () => {
        const options = {
            title: '수식 선택'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    formulaImage: source
                });
            }
        });
    }
    render() {
        const {searchText, status} = this.state;

        let statusStyle = {};

        if( status === 'ready' ) {
            statusStyle = {
                container: {
                    justifyContent: 'center'
                },
                textInputWrapper: {
                    marginTop: 30
                },
                buttonWrapper: {
                    marginTop: 20
                }
            }

        }

        else {
            statusStyle = {

            }
        }
        return (
            <ScrollView contentContainerStyle={[styles.container, statusStyle.container]}>
                <Logo style={styles.logo} />

                <View style={[styles.textInputWrapper, statusStyle.textInputWrapper]}>
                    <TextInput
                        placeholder={'검색어를 입력해주세요'}
                        style={styles.textInput}
                        onFocus={() => this.setState({status: 'ready'})}
                        onChangeText={(_searchText) => this.setState({searchText: _searchText})}
                        value={searchText}/>

                    <TouchableOpacity onPress={this._handlePressCamera}>
                        <MaterialIcon name="photo-camera" size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={[styles.buttonWrapper, statusStyle.buttonWrapper]}>
                    <Button
                        color={PRIMARY_COLOR}
                        title="검색"
                        onPress={this._handleSearchButton} />
                </View>

                <Content status={status} />
            </ScrollView>
        )
    }
}

const {width} = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textInputWrapper: {
        width: width-50,
        flexDirection: 'row'
    },
    textInput: {
        height: 35,
        width: width-90
    },
    logo: {
        width: width-50,
        resizeMode: 'stretch'
    },
    buttonWrapper: {
        width: width-50
    }
};

function select(state) {
    return {
        result: state.result
    };
}

export default connect(select)(Main);