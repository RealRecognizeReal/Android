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
    ScrollView,
    Modal,
    WebView
} from 'react-native';

import Logo from './LogoComponent';
import {
    fetchSearchWithString,
    fetchSearchWithFormulaImage
} from '../actions';

import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
    PRIMARY_COLOR,
    FORMULA_CANVAS_URL
} from '../consts';

import Content from './ContentComponent';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formulaImage: null,
            formulaFile: null,
            searchText: '',
            status: 'ready',
            isWeb: false
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
        const {searchText, formulaImage, formulaFile} = this.state;
        const {dispatch} = this.props;

        if( !formulaImage && searchText === '' ) return;

        this.setState({
            status: 'searching'
        });

        if( formulaImage ) {
            dispatch(fetchSearchWithFormulaImage(formulaFile));
        }
        else {
            dispatch(fetchSearchWithString(searchText));
        }

    }

    _handleClickImage = () => {
        this.setState({
            formulaImage: null,
            formulaFile: null,
            status: 'ready'
        })
    }

    _handlePressCamera = () => {
        const options = {
            title: '수식 선택',
            maxWidth: 512
        };

        this.setState({
            status: 'ready'
        });

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

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
                    formulaImage: source,
                    searchText: '',
                    formulaFile: {
                        path: response.path,
                        fileName: response.fileName,
                        type: response.type
                    }
                });
            }
        });
    }

    _handleClickItem = (url) => {
        this.setState({
            url,
            isWeb: true
        });
    }

    _handlePressEdit = () => {
        this.setState({
            url: FORMULA_CANVAS_URL,
            isWeb: true
        });
    }

    _handleNavigationEnd = (navState) => {
        console.log(navState);
    }

    render() {
        const {searchText, status, formulaImage} = this.state;

        let statusStyle = {};

        let searchBar;

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
                },
                logo: {
                    marginTop: 200
                }
            }
        }

        else {
            statusStyle = {
                formulaImageWrapper: {
                    marginBottom: 20
                }
            }
        }

        if( !formulaImage ) {
            searchBar = (
                <View style={[styles.textInputWrapper, statusStyle.textInputWrapper]}>
                    <TextInput
                        placeholder={'검색어를 입력해주세요'}
                        style={styles.textInput}
                        onFocus={() => this.setState({status: 'ready'})}
                        onChangeText={(_searchText) => this.setState({searchText: _searchText})}
                        value={searchText}/>

                    <View style={styles.searchBar}>
                        <TouchableOpacity onPress={this._handlePressCamera}>
                            <MaterialIcon name="photo-camera" size={40}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._handlePressEdit} style={{marginLeft: 10}}>
                            <MaterialIcon name="edit" size={40}/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else {
            searchBar = (
                <TouchableOpacity onPress={this._handleClickImage}>
                    <View style={[statusStyle.formulaImageWrapper]}>
                        <Image source={formulaImage} style={styles.formulaImage} />
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={[styles.container, statusStyle.container]}>
                    <Logo style={[styles.logo, statusStyle.logo]} />

                    {searchBar}

                    <View style={[styles.buttonWrapper, statusStyle.buttonWrapper]}>
                        <Button
                            color={PRIMARY_COLOR}
                            title="검색"
                            onPress={this._handleSearchButton} />
                    </View>

                    <View style={{marginBottom: 20}}>
                        <Content onClickItem={this._handleClickItem} status={status} />
                    </View>


                </ScrollView>

                <Modal
                    visible={this.state.isWeb}
                    onRequestClose={() => {this.setState({isWeb: false})}} >
                    <WebView
                        onNavigationStateChange={this._handleNavigationEnd}
                        startInLoadingState={true}
                        source={{uri: this.state.url}} />
                </Modal>
            </View>
        )
    }
}

const {width} = Dimensions.get('window');
const styles = {
    container: {
        //flex: 1,
        alignItems: 'center'
    },
    textInputWrapper: {
        width: width-50
    },
    textInput: {
        height: 50,
        width: width-50
    },
    logo: {
        marginTop: 50,
        width: width-50,
        resizeMode: 'stretch'
    },
    buttonWrapper: {
        width: width-50
    },
    formulaImage: {
        height: 100,
        resizeMode: 'cover',
        width: width-50
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: 10
    }
};

function select(state) {
    return {
        result: state.result
    };
}

export default connect(select)(Main);