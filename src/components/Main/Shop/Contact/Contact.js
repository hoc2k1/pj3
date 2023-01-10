import React, { Component } from 'react';
import {
    Linking, TouchableOpacity, Text, ScrollView
} from 'react-native';
import Setting from '../../../../config/setting';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Contact extends Component {

    action(type) {
        switch(type){
            case 'web': Linking.openURL(Setting.web); break;
            case 'phone': Linking.openURL(`tel:${Setting.phone}`); break;
            case 'email': Linking.openURL(`mailto:${Setting.email}`); break;
            case 'sms': Linking.openURL(`sms:${Setting.sms}`); break;
        }
    }

    render() {
        return (
            <ScrollView style={{ marginTop: 40 }}>
                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        paddingTop: 20, 
                        paddingBottom: 20, 
                        marginLeft: 30,
                        borderBottomColor: '#DDDDDD', 
                        borderBottomWidth: 2, 
                        alignItems: 'center'}}
                    onPress={() => this.action('web') }>
                        <MaterialCommunityIcons name='web' color={'#777777'} size={26}/>
                        <Text style={{ marginHorizontal: 20, color: '#777777' }}>Visit us {Setting.web}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        paddingTop: 20, 
                        paddingBottom: 20, 
                        marginLeft: 30,
                        borderBottomColor: '#DDDDDD', 
                        borderBottomWidth: 2, 
                        alignItems: 'center'}}
                    onPress={() => this.action('email') }>
                        <MaterialCommunityIcons name='email-outline' color={'#777777'} size={26}/>
                        <Text style={{ marginHorizontal: 20, color: '#777777' }}>Mail us {Setting.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        paddingTop: 20, 
                        paddingBottom: 20, 
                        marginLeft: 30,
                        borderBottomColor: '#DDDDDD', 
                        borderBottomWidth: 2, 
                        alignItems: 'center'}}
                    onPress={() => this.action('phone') }>
                        <MaterialCommunityIcons name='phone-outline' color={'#777777'} size={26}/>
                        <Text style={{ marginHorizontal: 20, color: '#777777' }}>Call us {Setting.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        paddingTop: 20, 
                        paddingBottom: 20, 
                        marginLeft: 30,
                        borderBottomColor: '#DDDDDD', 
                        borderBottomWidth: 2, 
                        alignItems: 'center'}}
                    onPress={() => this.action('sms') }>
                        <MaterialCommunityIcons name='message-text-outline' color={'#777777'} size={26}/>
                        <Text style={{ marginHorizontal: 20, color: '#777777' }}>Message us {Setting.sms}</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}