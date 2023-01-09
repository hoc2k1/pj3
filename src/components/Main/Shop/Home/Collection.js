import { border } from 'native-base/lib/typescript/theme/styled-system';
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import bannerImage from '../../../../media/temp/banner.jpg';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class Collection extends Component {
    render() {
        const { wrapper, textStyle, imageStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={textStyle} >SPRING COLLECTION</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ListProduct', {category: {name: 'Spring Collection', id: 'COLLECTION'}})}
                    style={{ flex: 4, justifyContent: 'flex-end' }}>
                    <Image source={bannerImage} style={imageStyle} />
                </TouchableOpacity>
            </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        padding: 10,
        paddingTop: 0,
        height: imageHeight + 60,
        borderRadius: 10,
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight, 
        width: imageWidth,
        borderRadius: 10,
    }
});
