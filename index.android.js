/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
import colors from 'material-colors';

class gaus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formulaImage: null
        }
    }

    _handleCancel = () => {
        this.setState({
            formulaImage: null
        })
    }
    _handleCamera = () => {
        let options = {
            title: '수식 선택',
            maxWidth: 512
        };

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

                });
            }
        });
    }

    render() {
        //console.log(this.state.formulaImage);

        return (
            <View style={styles.container}>
                <Button containerStyle={styles.button} onPress={this._handleCamera}>
                    <Text style={styles.text}>
                        사진 촬영
                    </Text>
                </Button>

                <Image source={this.state.formulaImage} style={styles.image}/>

                {this.state.formulaImage && (
                <View style={{flexDirection: 'row', marginTop: 20}}>
                <Button containerStyle={[styles.button, {backgroundColor: colors.green[100], marginRight: 10}]}>
                    <Text> 전송 </Text>
                </Button>
                <Button containerStyle={[styles.button, {backgroundColor: colors.red[100]}]}
                    onPress={this._handleCancel}>
                    <Text> 취소 </Text>
                </Button>
                </View>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: colors.blue[200],
        width: 100,
        padding: 20,
        elevation: 2,
        borderRadius: 4,
        alignItems: 'center'
    },
    text: {
        color: 'white'
    },
    image: {
        marginTop: 50,
        width: 300,
        height: 300,
        resizeMode: 'cover'
    }
});

AppRegistry.registerComponent('gaus', () => gaus);
