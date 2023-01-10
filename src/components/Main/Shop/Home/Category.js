import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import Setting from '../../../../config/setting';

const url = `${Setting.url}images/type/`;

const { width, height } = Dimensions.get('window');

export default class Category extends Component {
    constructor(props){
        super(props)
        this.state={
            cate: []
        }
    }

    async fetchHomeData() {
        console.log(Setting.url)
        const response = await fetch(Setting.url);
        const json = await response.json();
        this.setState({
            cate: json.type,
        })
    }
    componentDidMount(){
        this.fetchHomeData();
    }

    renderItem(item){
        return(
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ListProduct', {category: item})} >
                <View style={styles.wrapper}>
                    <ImageBackground source={{ uri: `${url}${item.image}` }} style={styles.imageStyle}>
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 18,}}>{item.name}</Text>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <NativeBaseProvider >
                <View style={{ height: height - 40, paddingTop: 20, paddingBottom: 10}}>
                    <ScrollView>
                        {this.state.cate.map(item =>this.renderItem(item))}
                    </ScrollView>
                </View>
            </NativeBaseProvider>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        height: imageHeight + 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'center',
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
        marginTop: 0,
        alignItems: 'center'
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
        marginTop: 10
    },
    cateTitle: {
        fontSize: 20,
        color: '#9A9A9A'
    }
});
