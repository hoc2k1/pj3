import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, FlatList, ToastAndroid
} from 'react-native';
// import addToCart from '../../../../api/addToCart'
import getCart from '../../../../api/getCart';
import getToken from '../../../../api/getToken';
import checkLogin from '../../../../api/checkLogin';
import getItemFromCart from '../../../../api/getItemFromCart';
import updateCart from '../../../../api/updateCart';
import CartItem from './CartItem';

const url = 'http://localhost/api/images/product/';

export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state ={
            token: null,
            cart: null,
            id_bill: null,
            user: null
        }
    }
    showToastWithGravity = (mess) => {
        ToastAndroid.showWithGravity(
          mess,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
    };

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            // getTokengetToken()
            // .then(token => (token ? this.setState({token: token}): this.setState({token: null, id_bill: null, cart: null})));
            getToken()
            .then(token => [(token ? this.setState({token: token}): this.setState({token: null, id_bill: null, cart: null})), checkLogin(this.state.token)
                .then(res => res ? getCart(res.user.email)
                    .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                        .then(ress => this.setState({cart: ress}))
                        .catch(errr => [console.log(errr), this.setState({cart: null})])])
                    // .then(res => console.log(res))
                    .catch(err => [console.log(err), this.setState({cart: null})]) : null)
                .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
            // getItemFromCart(this.state.id_bill)
            // .then( res => this.setState({cart: res}))
            // .catch(err => console.log(err))
        })
        // this.props.navigation.addListenter('focus', () =>{
        //     console.log('ok')
        // })
        getToken()
        .then(token => [(token ? this.setState({token: token}): null), checkLogin(this.state.token)
            .then(res => res ? [this.setState({user: res.user}), getCart(res.user.email)
                .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr))])
                // .then(res => console.log(res))
                .catch(err => console.log(err))] : null)
            .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
    }

    componentDidUpdate(prevProps){
        if(this.props != prevProps)
        getToken()
        .then(token => [(token ? this.setState({token: token}): null), checkLogin(this.state.token)
            .then(res => res ? [this.setState({user: res.user}), getCart(res.user.email)
                .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr))])
                // .then(res => console.log(res))
                .catch(err => console.log(err))] : null)
            .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
    }

    update_cart(id, qty, price){
        updateCart(id, qty, price)
        .then(res => getItemFromCart(this.state.id_bill)
            .then(ress => this.setState({cart: ress}))
            .catch(errr => console.log(errr))) 
        .catch(err => console.log(err))
    }

    renderItem(item){
        return(
            <CartItem item={item} parent={this} />
        )
    }

    render() {
        const { checkoutButton, checkoutTitle, wrapper } = styles;
        let total = 0;
        // const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        this.state.cart?.length > 0 ? this.state.cart.map((item, index) => {
            total += parseInt(item.price);
        }) : null;
        return (
            <View style={wrapper}>
                <FlatList
                    style= {{ marginTop: 10 }}
                    data={this.state.cart}
                    keyExtractor={(item) => item}
                    renderItem={(item) => this.renderItem(item)}
                />
                <TouchableOpacity style={checkoutButton} onPress={() => {
                    let mess = 'Please update your personal information first'
                    if(!this.state.cart || (this.state.cart && this.state.cart.lenghth == 0)) {
                        mess = 'Your cart is empty'
                        this.showToastWithGravity(mess)
                    }
                    else {
                        if(this.state.user && this.state.user.name && this.state.user.phone && this.state.user.address)
                            this.props.navigation.navigate('Checkout', {user: this.state.user, cart: this.state.cart, id_bill: this.state.id_bill})
                        else this.showToastWithGravity(mess)
                    }
                }}>
                    <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // backgroundColor: '#DFDFDF'
        marginTop: 10
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
