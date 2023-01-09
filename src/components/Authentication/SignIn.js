import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import signIn from '../../api/signIn';
import saveToken from '../../api/saveToken';
import global from '../global'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onFail() {
        Alert.alert(
            'Notice',
            'The Email or Password is incorrect',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onSignIn() {
        const { email, password } = this.state;
        signIn(email, password)
            .then(res => {
                if(res==='SAI_THONG_TIN_DANG_NHAP') {
                    this.onFail()
                }
                else {
                    let obj = JSON.parse(res);
                    global.onSignIn(obj.user);
                    this.props.navigation.goBack();
                    saveToken(obj.token);
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your email"
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your password"
                    placeholderTextColor={'gray'}
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={bigButton} onPress={() => this.onSignIn()}>
                    <Text style={buttonText}>SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30,
        color: 'black'
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400'
    }
});
