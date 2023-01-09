import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import Setting from '../../../../config/setting';

const url = `${Setting.url}images/type/`;

const { width } = Dimensions.get('window');

export default class Category extends Component {
    renderItem(item){
        console.log(item)
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProduct', {category: item})} >
                <ImageBackground source={{ uri: `${url}${item.image}` }} style={styles.imageStyle}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 18,}}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    render() {
        const { wrapper, textStyle, } = styles;
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={textStyle} >LIST OF CATEGORY</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 4 }}>
                    <Swiper showsPagination width={imageWidth} height={imageHeight} autoplay autoplayTimeout={10}>
                        {this.props.type.map(item =>this.renderItem(item))}
                    </Swiper>
                </View>
            </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        height: imageHeight + 60,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 10,
        padding: 10,
        paddingTop: 0,
        marginTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        alignItems: 'center',
        borderRadius: 10,
    },
    cateTitle: {
        fontSize: 20,
        color: '#9A9A9A'
    }
});
