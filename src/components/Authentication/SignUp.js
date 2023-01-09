import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import register from '../../api/register'
import createNewCart from '../../api/createNewCart'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: ''
        };
    }

    onSuccess() {
        Alert.alert(
            'Notice',
            'Sign up successfully',
            [
                { text: 'OK', onPress: () => this.props.data.setState({ isSignIn: true }) }
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Notice',
            'Email has been used by other',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }
    
    onFailPass() {
        Alert.alert(
            'Notice',
            'Password and Confirm Password does not match',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    registerUser() {
        const { name, email, password, rePassword } = this.state;
        if (password !== rePassword) {
            this.onFailPass()
        }
        else(
            register(email, name, password)
            .then(res => {
                if (res === 'THANH_CONG') {
                    createNewCart(email)
                    .then(ress => console.log(ress))
                    .then(err => console.log(err))
                    return this.onSuccess();
                }
                this.onFail();
            })
        )
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
            <View>
                <TextInput 
                    style={inputStyle} 
                    placeholder="Enter your name" 
                    placeholderTextColor={'gray'}
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Enter your email" 
                    placeholderTextColor={'gray'}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Enter your password" 
                    placeholderTextColor={'gray'}
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Re-enter your password" 
                    placeholderTextColor={'gray'}
                    value={this.state.rePassword}
                    secureTextEntry
                    onChangeText={text => this.setState({ rePassword: text })}
                />
                <TouchableOpacity style={bigButton} onPress={() => this.registerUser() }>
                    <Text style={buttonText}>SIGN UP NOW</Text>
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
