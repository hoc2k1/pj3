import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    Text, StyleSheet,
    Image, Dimensions, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from '../../../../config/setting';
import getProductById from '../../../../api/getProductById';
import checkout from '../../../../api/checkout'
import createNewCart from '../../../../api/createNewCart'
const url = `${Setting.url}images/product/`;
const {width} = Dimensions.get('window');

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state={
            productsName: []
        }
        console.log(props.route.params)
        this.grandTotal = 2;
        this.props.route.params.cart.map(item => {
            getProductById(item.id_product).then(res => this.setState(prevState => ({
                productsName: [...prevState.productsName, res.name]
            })));
            this.grandTotal += item.quantity * item.price;
        })
    }

    // componentDidMount(){
    //     this.props.route.params.cart.map(item => {
    //         getProductById(item.id_product).then(res => this.setState(prevState => ({
    //             productsName: [...prevState.productsName, res.name]
    //         })));
    //     })
    // }
    toTitleCase(str) {
        if(str) return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        else return null
    }

    renderItem = (item, index) => {
        return (
            <View style={styles.textView}>
                <Text style={[styles.text, {width: '60%',}]}>{this.toTitleCase(this.state.productsName[index])}</Text>
                <Text style={[styles.text, {width: '18%', textAlign: 'center'}]}>{item.quantity}</Text>
                <Text style={[styles.text, {width: '22%', textAlign: 'center'}]}>{item.quantity * item.price}$</Text>
            </View>
        )
    } 

    render() {
        const {
            container, header, wrapper, titleStyle, text, titleText, textView
         } = styles;
        const {address, email, name, phone} = this.props.route.params.user
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Setting.theme_color} size={30}/>
                        </TouchableOpacity>
                        <Text style={titleStyle}>Checkout</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <View style={{  }}>
                        <Text style={titleText}>INFOMATION</Text>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Name:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`${name}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Email:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`${email}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Address:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`${address}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Phone:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`${phone}`}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={titleText}>DELIVERY</Text>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Delivery time:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`3-5 days`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, {width: '30%'}]}>{`Delivery cost:`}</Text>
                            <Text style={[text, {width: '70%'}]}>{`2$`}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={titleText}>Total</Text>
                        <View style={textView}>
                            <Text style={[text, {width: '60%', fontWeight: 'bold'}]}>Product Name</Text>
                            <Text style={[text, {width: '18%', textAlign: 'center', fontWeight: 'bold'}]}>Quantity</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold'}]}>Amount</Text>
                        </View>
                        {this.props.route.params.cart.map((item, index) => this.renderItem(item, index))}
                        <View style={[textView, {marginTop: 5}]}>
                            <Text style={[text, {width: '78%', fontWeight: 'bold',}]}>Delivery cost</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold'}]}>{'2'}$</Text>
                        </View>
                        <View style={[textView, {marginTop: 5}]}>
                            <Text style={[text, {width: '78%', fontWeight: 'bold', fontSize: 18}]}>Grand Total</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold', fontSize: 18}]}>{this.grandTotal}$</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => {
                        checkout(this.props.route.params.id_bill, this.grandTotal, name, email, address, phone)
                        .then(res => this.props.navigation.navigate('ThanksPage'))
                        .catch(err => console.log(err))
                        createNewCart(email)
                    }}
                    style={{ backgroundColor: Setting.theme_color, margin: 10}}>
                    <Text style={{ paddingVertical: 10, textAlign: 'center', color: 'white', fontSize: 18 }}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        marginTop: 0,
        marginHorizontal: 0,
        paddingHorizontal: 10
    },
    titleStyle: {
        color: Setting.theme_color,
        fontSize: 20
    },
    textView: {
        flexDirection: 'row', 
        width: '100%', 
        marginHorizontal: 15
    },
    titleText: {
        marginVertical: 15, 
        fontSize: 20, 
        marginHorizontal: 10, 
        color: 'black', 
        fontWeight: 'bold'
    },
    text: {
        color: '#777777',
        // marginHorizontal: 15
    }
});