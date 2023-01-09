import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, ToastAndroid } from 'react-native'
import { Card, NativeBaseProvider } from 'native-base'
import getProductById from '../../../../api/getProductById';
import Setting from '../../../../config/setting';

const url = `${Setting.url}images/product/`;
export default class CartItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            product: null,
            qty: parseInt(props.item.item.quantity),
            price: parseInt(props.item.item.price)
        }
        getProductById(props.item.item.id_product)
        .then(res => this.setState({product: res}))
        .catch(err => console.log(err))
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Delete product successfully",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };

    deleteItem(id){
        Alert.alert(
            'Notice',
            'Delete item?',
            [
                { text: 'Yes', onPress: () => [this.setState({product: null}), this.props.parent.update_cart(id, 0, 0), this.showToastWithGravity()] },
                { text: 'No'}
            ],
            { cancelable: false }
        );
    }

    render(){
        const item = this.props.item.item;
        const {
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        if(this.state.product) return(
            <NativeBaseProvider>
                <Card style={productStyle}>
                    <Image source={{ uri: `${url}${this.state.product?.images[0]}` }} style={productImage} />
                    <View style={[mainRight]}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={txtName}>{this.state.product && this.toTitleCase(this.state.product?.name)}</Text>
                            <TouchableOpacity onPress={() => this.deleteItem(item.id)}>
                                <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={txtPrice}>{this.state.price}$</Text>
                        </View>
                        <View style={productController}>
                            <View style={numberOfProduct}>
                                <TouchableOpacity 
                                    onPress={() => [this.setState({qty: this.state.qty -1, price: parseInt(this.state.price) - parseInt(this.state.product.price)}), this.props.parent.update_cart(item.id, this.state.qty-1, parseInt(this.state.price) - parseInt(this.state.product.price) )]}
                                    disabled={this.state.qty == 1 ? true : false}>
                                    <Text style={{ color: 'black' }}>-</Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'black' }}>{this.state.qty}</Text>
                                <TouchableOpacity onPress={() => [this.setState({qty: this.state.qty + 1, price: parseInt(this.state.price) + parseInt(this.state.product.price)}), this.props.parent.update_cart(item.id, this.state.qty+1, parseInt(this.state.price) + parseInt(this.state.product.price) )]}>
                                    <Text style={{ color: 'black' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={showDetailContainer} onPress={() => this.props.parent.props.navigation.navigate('ProductDetail' , { product: this.state.product })}>
                                <Text style={txtShowDetail}>SHOW DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </NativeBaseProvider>
        )
        else return null;
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    productStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderRadius: 8, 
        marginLeft: 20,
        borderColor: '#A7A7A7'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});