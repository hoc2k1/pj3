import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';

export default class Search extends Component {
    render() {
        return (
            <View>
                <Text style={{color: 'black' }}>Search</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail')}>
                    <Text style={{ color: 'black' }}>go to detail</Text>
                </TouchableOpacity>
            </View>
        );
    }
}