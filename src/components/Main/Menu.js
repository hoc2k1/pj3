import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal} from 'react-native';
import profileIcon from '../../media/temp/profile.png';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Setting from '../../config/setting';
import saveToken from '../../api/saveToken';
import global from '../global';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
            signOutModal: false,
        };
        global.onSignIn = this.onSignIn.bind(this);
        getToken()
        .then(token => token ? checkLogin(token)
            .then(res => [console.log(res.user), res ? this.setState({user: res.user}) : null])
            .catch(err => console.log('LOI CHECK LOGIN', err)) : null)
        .catch(err => console.log(err))
    }

    onSignIn(data) {
        this.setState({ user: data })
    }

    onSignOut() {
        this.setState({ user: null });
        saveToken('');
    }

    showSignOutModal(){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} 
                onPress={() => this.setState({signOutModal : false})}>
                    <TouchableOpacity 
                        style={{ height: '30%', width: '100%', backgroundColor: 'white', borderRadius: 15 }}
                        activeOpacity={1}>
                        <View 
                            style={{
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                paddingTop: 15, 
                                paddingBottom: 15,
                                borderBottomWidth: 0.5, 
                                borderBottomColor: 'gray' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 15, color: 'black' }}>Sign Out</Text>
                            <TouchableOpacity onPress={() => this.setState({signOutModal : false})}>
                                <Ionicons name='close' color='black' size={26} style= {{ marginRight: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, fontSize: 20, color: 'black' }}>Are you sure want to sign out?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => [this.setState({signOutModal : false}), this.onSignOut(), this.props.data.setState({modalVisible: false}), this.props.navigation.navigate('Authentication')]} 
                                style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Setting.theme_color, borderRadius: 10, alignItems: 'center', backgroundColor: Setting.theme_color, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => this.setState({signOutModal : false})}
                                style= {{width: '40%', height: 50, borderWidth: 3, borderColor: Setting.theme_color, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: Setting.theme_color, fontSize: 16, fontWeight: 'bold' }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>                        
            </TouchableOpacity>
        )
    }

    render() {
        const { 
            container, profile, btnStyle, btnText, 
            btnSignInStyle, btnTextSignIn, loginContainer,
            username
        } = styles;
        const logoutJSX = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    style={btnStyle} 
                    onPress={() => [this.props.data.setState({modalVisible: false}) ,this.props.navigation.navigate('Authentication')] }>
                    <Text style={btnText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginContainer}>
                <Text style={username}>{this.state.user ? this.state.user.name : ''}</Text>
                <View>
                    <TouchableOpacity style={btnSignInStyle} onPress={() => [this.props.data.setState({modalVisible: false}), this.props.navigation.navigate('OrderHistory')]}>
                        <Text style={btnTextSignIn}>Order History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={() => [this.props.data.setState({modalVisible: false}), this.props.navigation.navigate('ChangeInfo', {user: this.state.user})]}>
                        <Text style={btnTextSignIn}>Change Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={btnSignInStyle} 
                        onPress={() => this.setState({signOutModal: true})}>
                        <Text style={btnTextSignIn}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        );
        const mainJSX = this.state.user ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <FontAwesome5 name='user-alt' size={80} color={Setting.theme_color} style={{ marginVertical: 30 }} />
                { mainJSX }
                <Modal 
                    visible={this.state.signOutModal} 
                    animationType='slide'
                    transparent={true}>
                    {this.showSignOutModal()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10
    },
    btnStyle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 70,
        backgroundColor: Setting.theme_color
    },
    btnText: {
        color: 'white',
        fontSize: 20
    },
    btnSignInStyle: {
        backgroundColor: Setting.theme_color,
        height: 50,
        borderRadius: 5,
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: 'white',
        fontSize: 15
    },
    loginContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    username: {
        color: Setting.theme_color, 
        fontSize: 15
    }
});