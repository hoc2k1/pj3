import React, { Component } from 'react';
import Setting from '../../../../config/setting';
import { 
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import addToCart from '../../../../api/addToCart'
import getCart from '../../../../api/getCart';
import getToken from '../../../../api/getToken';
import checkLogin from '../../../../api/checkLogin';
import getItemFromCart from '../../../../api/getItemFromCart';
import Fontisto from 'react-native-vector-icons/Fontisto';
import createNewCart from '../../../../api/createNewCart'

const url = `${Setting.url}images/product/`;

export default class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state ={
            token: null,
            cart: null,
            id_bill: null,
            colors: null,
            colorSelected: null,
            sizeSelected: null
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
            .then(res1 => res1 ? getCart(res1.user.email)
                .then(res => res ? this.setState({id_bill: res.id}) : createNewCart(res1.user.email).then(getCart(res1.user.email)).then(res2 => this.setState({id_bill: res2.id}))
                // .then(res => console.log(res))
                .catch(err => console.log(err))) : null)
            .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
    }

    showToastWithGravity = (text) => {
        ToastAndroid.showWithGravity(
          text,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };
    async addThisProductToCart(product) {
        if(this.state.token){
            let checkDuplicate = false;
            if(this.state.cart && this.state.cart.length > 0) this.state.cart?.map((item, index) => {
                if(item.id_product == product.id) checkDuplicate = true
            })
            if(!this.state.colorSelected || !this.state.sizeSelected) {
                this.showToastWithGravity('You have not selected enough information')
            }
            else if(checkDuplicate) {
                this.showToastWithGravity('This product is already in your cart')
            }
            else {
                await addToCart(this.state.id_bill, product.id, product.price, this.state.colorSelected, this.state.sizeSelected)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                this.showToastWithGravity('Product added to cart successfully')
                await getItemFromCart(this.state.id_bill)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr.text()))
            }
        }
        else{
            this.showToastWithGravity('You are not logged in')
        }
    }
    render() {
        if (this.state.id_bill && !this.state.cart) {
            getItemFromCart(this.state.id_bill)
            .then(ress => this.setState({cart: ress}))
            .catch(errr => console.log(errr))
        }
        const {
            wrapper, cardStyle, header,
            footer,
            imageContainer, productName,
            productPrice, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;
        const { name, price, material, description, images, colors, sizes } = this.props.route.params.product;
        let colorsTmp = colors.map(item => (
            <View style={{ marginLeft: 40, marginTop: 5 }}>
                <TouchableOpacity onPress={() => this.setState({ colorSelected: item })} style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {item == this.state.colorSelected ? <Fontisto name='radio-btn-active' color={Setting.theme_color} /> : <Fontisto name='radio-btn-passive' color={'#333333'} />}
                    <Text style={{ marginLeft: 5, color: '#333333' }}>{item}</Text>
                </TouchableOpacity>
            </View>
        ))
        let sizesTmp = sizes.map(item => (
            <View style={{ marginLeft: 40, marginTop: 5 }}>
                <TouchableOpacity onPress={() => this.setState({ sizeSelected: item })} style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {item == this.state.sizeSelected ? <Fontisto name='radio-btn-active' color={Setting.theme_color} /> : <Fontisto name='radio-btn-passive' color={'#333333'} />}
                    <Text style={{ marginLeft: 5, color: '#333333' }}>{item}</Text>
                </TouchableOpacity>
            </View>
        ))
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
                    <ScrollView >
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
                                </View>
                            </View>
                        </View>
                        <Text style={txtColor}>Color</Text>
                        {colorsTmp}
                        <Text style={[txtColor, {marginTop: 10}]}>Size</Text>
                        {sizesTmp}
                        <Image source={require('../../../../media/size.png')} style={{ width: '100%', height: 300, marginTop: 10, marginBottom: 40 }} />
                    </ScrollView>
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
        // flex: 1,
        width: '100%',
        height: 60,
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
        // flex: 4,
        // marginTop: 10,
        flexDirection: 'row',
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
        marginLeft: 20
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    }
});
