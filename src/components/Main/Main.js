import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Drawer } from 'react-native-drawer';
import Header from './Shop/Header';
import Collection from './Shop/Home/Collection';
import Category from './Shop/Home/Category';
import New from './Shop/Home/New';
import Setting from '../../config/setting';
import global from '../global';
import saveCart from '../../api/saveCart';
import checkLogin from '../../api/checkLogin'
import getToken from '../../api/getToken';
import getCart from '../../api/getCart';
import getItemFromCart from '../../api/getItemFromCart';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: [],
            topProducts: [],
            cartArray: [],
            user: null,
            token: null,
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

    async fetchHomeData() {
        console.log(Setting.url)
        const response = await fetch(Setting.url);
        const json = await response.json();
        this.setState({
            type: json.type,
            topProducts: json.product
        })
    }
    componentDidMount(){
        this.fetchHomeData();
    }

    addProductToCart(product) {
        if(this.state.cartArray !== []) {
            const isExist = this.state.cartArray.some(item => item.product.id === product.id);
            if (isExist) return false;
        }
        this.setState(
            { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) }, 
            () => saveCart(this.state.cartArray)
        );
    }

    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(item => {
            if (item.product.id !== productId) return item;
            return { product: item.product, quantity: item.quantity + 1 };
        });
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }

    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(item => {
            if (item.product.id !== productId) return item;
            return { product: item.product, quantity: item.quantity - 1 };
        });
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }

    removeProduct(productId) {
        const newCart = this.state.cartArray.filter(item => item.product.id !== productId);
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }
    render() {
        return (
            <View style={{flexDirection: 'column', paddingBottom: 90}}>
                <Header navigation={this.props.navigation} route={this.props.route.name}/>
                <ScrollView>
                    <Collection navigation={this.props.navigation} />
                    {/* <Category navigation={this.props.navigation} type={this.state.type}/> */}
                    <New navigation={this.props.navigation} product={this.state.topProducts}/>
                </ScrollView>
            </View>
        );
    }
}
