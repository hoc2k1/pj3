import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/v33x-theme/tools';
import React, { Component } from 'react';
import { 
    View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList 
} from 'react-native';
import Setting from '../../../../config/setting';

const url = `${Setting.url}images/product/`;

export default class New extends Component {
    constructor(props){
        super(props)
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    
    renderItem(item) {       
        const{
            productName, productImage, productPrice,
            productContainer
        } = styles;
        let name = this.toTitleCase(item.item.name)
        return(
            <TouchableOpacity style={productContainer} onPress={() => this.props.navigation.navigate('ProductDetail' , { product: item.item })}>
                <View style={{ padding: 5 }}>
                    <Image source={{ uri: `${url}${item.item.images[0]}` }} style={productImage} />
                    <Text style={productName}>{name}</Text>
                    <Text style={productPrice}>{item.item.price}$</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { 
            container, titleContainer, title
        } = styles;
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>NEW</Text>
                </View>
                <FlatList 
                    data={this.props.product}
                    keyExtractor={(item) => item}
                    renderItem={(item) => this.renderItem(item)}
                    numColumns={2}
                />
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 100) / 2;
const productImageHeight = (produtWidth / 361) * 452; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 10,
        marginTop: 0
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        width: (width - 60)/2,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
        padding: 10,
        paddingTop: 10,
        marginTop: 10
    },
    productImage: {
        width: produtWidth ,
        height: produtWidth + 40,
        alignSelf: 'center',
        borderRadius: 5
    },
    productName: {
        marginVertical: 5,
        paddingLeft: 10,
        color: Setting.productName_color,
        fontWeight: '500'
    },
    productPrice: {
        marginBottom: 5,
        paddingLeft: 10,
        color: Setting.productPrice_color,
    }
});