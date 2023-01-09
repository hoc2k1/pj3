import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableHighlight, FlatList
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
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
        }
    }
    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            // getTokengetToken()
            // .then(token => (token ? this.setState({token: token}): this.setState({token: null, id_bill: null, cart: null})));
            getToken()
            .then(token => [(token ? this.setState({token: token}): this.setState({token: null, id_bill: null, cart: null})), checkLogin(this.state.token)
                .then(res => res ? getCart(res.user.email)
                    .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                        .then(ress => this.setState({cart: ress}))
                        .catch(errr => console.log(errr))])
                    // .then(res => console.log(res))
                    .catch(err => console.log(err)) : null)
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
            .then(res => res ? getCart(res.user.email)
                .then(res => [this.setState({id_bill: res.id}), getItemFromCart(res.id)
                    .then(ress => this.setState({cart: ress}))
                    .catch(errr => console.log(errr))])
                // .then(res => console.log(res))
                .catch(err => console.log(err)) : null)
            .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
    }

    update_cart(id, qty, price){
        updateCart(id, qty, price)
        .then(res => getItemFromCart(this.state.id_bill)
            .then(ress => this.setState({cart: ress}))
            .catch(errr => console.log(errr))) 
        .catch(err => console.log(err));

        
    }

    renderItem(item){
        return(
            <CartItem item={item} parent={this} />
        )
    }

    render() {
        const { checkoutButton, checkoutTitle, wrapper } = styles;
        // const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        // const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <FlatList
                    style= {{ marginTop: 10 }}
                    data={this.state.cart}
                    keyExtractor={(item) => item}
                    renderItem={(item) => this.renderItem(item)}
                />
                <TouchableOpacity style={checkoutButton}>
                    <Text style={checkoutTitle}>TOTAL$ CHECKOUT NOW</Text>
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
        fontFamily: 'Avenir'
    },
});
