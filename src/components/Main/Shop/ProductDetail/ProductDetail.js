import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity 
} from 'react-native';
import Setting from '../../../../config/setting';
import global from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';

const url = `${Setting.url}images/product/`;

export default class ProductDetail extends Component {
    constructor(props){
        super(props)
    }
    addThisProductToCart(product) {
        global.addProductToCart(product);
    }
    render() {
        const {
            wrapper, cardStyle, header,
            footer,
            imageContainer, productName,
            productPrice, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;
        const { name, price, color, material, description, images } = this.props.route.params.product;
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Setting.theme_color} size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.addThisProductToCart(this.props.route.params.product)}>
                            <Ionicons name='cart' color={Setting.theme_color} size={30}/>
                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>
                        <ScrollView style={{ flexDirection: 'row', padding: 10, height: swiperHeight }} horizontal >
                            {images.map(item => <Image source={{ uri: `${url}${item}` }} style={productImageStyle} />)}
                        </ScrollView>
                    </View>
                    <View style={footer}>
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={productName}>{name.toUpperCase()}</Text>
                                <Text style={textHighlight}> / </Text>
                                <Text style={productPrice}>{price}$</Text>
                            </Text>
                        </View>
                        <View style={descContainer}>
                            <Text style={descStyle}>{description}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                <Text style={txtMaterial}>Material: {material}</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={txtColor}>Color {color}</Text>
                                    <View style={{ height: 15, width: 15, backgroundColor: color.toLowerCase(), borderRadius: 15, marginLeft: 10, borderWidth: 1, borderColor: '#C21C70' }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 6
    },
    imageContainer: {
        flex: 4,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    textMain: {
        paddingLeft: 20,
        marginBottom: 10
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Setting.productName_color
    },
    productPrice: {
        fontSize: 20,
        color: Setting.productPrice_color
    },
    textHighlight: {
        fontSize: 20,
        color: 'black'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    }
});
