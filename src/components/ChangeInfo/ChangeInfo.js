import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, StyleSheet, TextInput, Alert
} from 'react-native';
import Setting from '../../config/setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import changeInfo from '../../api/changeInfo'

export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const { email, name, address, phone } = this.props.route.params.user;
        this.state = { 
            txtName: name, 
            txtAddress: address, 
            txtPhone: phone, 
            txtEmail: email
        };
    }

    onSuccess() {
        Alert.alert(
            'Notice',
            'Change Infomation successfully',
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack() }
            ],
            { cancelable: false }
        );
    }

    changeInfo() {
        const { txtEmail, txtName, txtAddress, txtPhone } = this.state;
        changeInfo(txtEmail, txtName, txtPhone, txtAddress )
        .then(res => this.onSuccess())
        .catch(err => console.log(err))
    }

    render() {
        const {
            wrapper, header, headerTitle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtName, txtAddress, txtPhone } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='chevron-back' color={Setting.theme_color} size={30}/>
                    </TouchableOpacity>
                    <Text style={headerTitle}>Infomation</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={body}>
                    <Text style={{ color: 'black', marginLeft: 23, marginBottom: 5 }}>Name</Text>
                    <TextInput
                        style={textInput}
                        placeholderTextColor='gray'
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ txtName: text })}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={{ color: 'black', marginLeft: 23, marginBottom: 5 }}>Address</Text>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        placeholderTextColor='gray'
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({ txtAddress: text })}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={{ color: 'black', marginLeft: 23, marginBottom: 5 }}>Phone</Text>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        placeholderTextColor='gray'
                        autoCapitalize="none"
                        keyboardType='phone-pad'
                        value={txtPhone}
                        onChangeText={text => this.setState({ txtPhone: text.toString() })}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={signInContainer} onPress={() => this.changeInfo()}>
                        <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
    header: { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { color: Setting.theme_color, fontSize: 20, alignItems: 'center' },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1,
        color: 'black'
    },
    signInTextStyle: {
        color: '#FFF', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});
