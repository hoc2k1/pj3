import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid
} from 'react-native';
import { Toast } from 'native-base';
import Setting from '../../../../config/setting';
import global from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import addToCart from '../../../../api/addToCart'
import getCart from '../../../../api/getCart';
import getToken from '../../../../api/getToken';
import checkLogin from '../../../../api/checkLogin';
import getItemFromCart from '../../../../api/getItemFromCart';

const url = `${Setting.url}images/product/`;

export default class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state ={
            token: null,
            cart: null,
            id_bill: null,
        }
        // getToken()
        // .then(token => [(token ? this.setState({token: token}): null), checkLogin(this.state.token)
        //     .then(res => [res ? this.setState({user: res.user}) : null, getCart(this.state.user.email)
        //         .then(res => getItemFromCart(res.id)
        //             .then(ress => console.log(ress))
        //             .catch(errr => console.log(errr)))
        //         // .then(res => console.log(res))
        //         .catch(err => console.log(err))])
        //     .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
        
    }

    componentDidMount(){
        getToken()
        .then(token => [(token ? this.setState({token: token}): null), checkLogin(this.state.token)
            .then(res => res ? getCart(res.user.email)
                .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr))])
                // .then(res => console.log(res))
                .catch(err => console.log(err)) : null)
            .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
    }

    showToastWithGravity = (text) => {
        ToastAndroid.showWithGravity(
          text,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };
    addThisProductToCart(product) {
        if(this.state.token){
            let checkDuplicate = false;
            this.state.cart?.map((item, index) => {
                if(item.id_product == product.id) checkDuplicate = true
            })
            if(checkDuplicate) {
                this.showToastWithGravity('This product is already in your cart')
            }
            else {
                addToCart(this.state.id_bill, product.id, product.price)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                this.showToastWithGravity('Product added to cart successfully')
                getItemFromCart(this.state.id_bill)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr))
            }
        }
        else{
            this.showToastWithGravity('You are not logged in')
        }
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
                        <TouchableOpacity style={{ position: 'relative', height: 30, width: 30 }} onPress={() => this.addThisProductToCart(this.props.route.params.product)}>
                            <Ionicons name='cart' color={Setting.theme_color} size={30}/>
                            {this.state.cart ? (
                                <View style={{ position: 'absolute', top: 0, right: 0, height: 17, width: 17, borderRadius: 99, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>{this.state.cart.length}</Text>
                                </View>
                            ): null}
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
