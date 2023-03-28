import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    Text, StyleSheet, ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from '../../config/setting';
import getItemFromCart from '../../api/getItemFromCart';
import OrderItem from './OrderItem';

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsName: []
        }
        getItemFromCart(props.route.params.order.id)
            .then(res => this.setState({ products: res }))
            .catch(err => console.log(err))

    }

    toTitleCase(str) {
        if (str) return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        else return null
    }
    renderItem(item) {
        return <OrderItem item={item} />
    }

    render() {
        const {
            container, header, wrapper, titleStyle, text, titleText, textView
        } = styles;

        const { address_order: address, email_order: email, name_order: name, phone_order: phone, id, order_status, total } = this.props.route.params.order
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Setting.theme_color} size={30} />
                        </TouchableOpacity>
                        <Text style={titleStyle}>Checkout</Text>
                        <View style={{ width: 30 }} />
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <Text style={titleText}>INFOMATION</Text>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Order ID:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${id}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Name:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${name}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Email:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${email}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Address:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${address}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Phone:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${phone}`}</Text>
                        </View>
                        <View style={textView}>
                            <Text style={[text, { width: '30%' }]}>{`Status:`}</Text>
                            <Text style={[text, { width: '70%' }]}>{`${order_status}`}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={titleText}>LIST OF ITEM</Text>
                        {this.state.products.map(item => this.renderItem(item))}
                    </View>
                    <View>
                        <Text style={titleText}>Total</Text>
                        <View style={[textView, {marginTop: 5}]}>
                            <Text style={[text, {width: '78%', fontWeight: 'bold',}]}>Total</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold'}]}>{total - 2}$</Text>
                        </View>
                        <View style={[textView, {marginTop: 5}]}>
                            <Text style={[text, {width: '78%', fontWeight: 'bold',}]}>Delivery cost</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold'}]}>{'2'}$</Text>
                        </View>
                        <View style={[textView, {marginTop: 5}]}>
                            <Text style={[text, {width: '78%', fontWeight: 'bold', fontSize: 18}]}>Grand Total</Text>
                            <Text style={[text, {width: '22%', textAlign: 'center', fontWeight: 'bold', fontSize: 18}]}>{total}$</Text>
                        </View>
                    </View>
                </ScrollView>
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