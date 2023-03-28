import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, Alert, ToastAndroid
} from 'react-native';
import getOrder from '../../api/getOrder';
import Setting from '../../config/setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';
import deleteOrder from '../../api/deleteOrder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            order: null,
            id_bill: null,
            user: null
        }
    }
    getList() {
        getToken()
        .then(token => [(token ? this.setState({ token: token }) : null), checkLogin(this.state.token)
            .then(res => res ? [this.setState({ user: res.user }), getOrder(res.user.email)
                .then(res => res ? this.setState({ order: res }) : this.setState({ order: null }))
                // .then(res => console.log(res))
                .catch(err => this.setState({ order: null }))] : null)
            .catch(err => console.log('LOI CHECK LOGIN', err))]);
    }
    componentDidMount() {
        this.getList()
    }
    showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Delete order successfully",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };
    deleteOrder(id) {
        deleteOrder(id)
        this.getList()
        this.showToastWithGravity()
    }
    renderItem(item) {
        const { text } = styles;
        let colorStatus = '#CC99CC'
        // let colorStatus = '#FF0099'
        switch (item.order_status) {
            case 'cancle':
                colorStatus = 'red';
                break;
            case 'shipping':
                colorStatus = 'brown';
                break;
            case 'received':
                colorStatus = 'green';
                break;
            case 'accept':
                colorStatus = '#FF0099'
        }
        return (
            <TouchableOpacity  
                onPress={() => this.props.navigation.navigate('OrderDetail', {order: item})}
                style={{ marginVertical: 5, marginHorizontal: 15, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderColor: Setting.theme_color, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={[text, { fontSize: 18, fontWeight: 'bold' }]}>{`ID: ${item.id}`}</Text>
                    <Text style={[text]}>{`Data: ${item.data_order}`}</Text>
                    <Text style={[text]}>{`Email: ${item.email_order}`}</Text>
                    <Text style={[text]}>{`Name: ${item.name_order}`}</Text>
                    <Text style={[text]}>{`Address: ${item.address_order}`}</Text>
                    <Text style={[text]}>{`Phone: ${item.phone_order}`}</Text>
                    <Text style={[text]}>{`Total: ${item.total}$`}</Text>
                    <Text style={{ color: colorStatus }}>{`Status: ${item.order_status}`}</Text>
                </View>
                <TouchableOpacity onPress={() =>
                    Alert.alert('Alert Title', 'Are you sure want to delete item?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => this.deleteOrder(item.id) },
                    ])
                }>
                <MaterialCommunityIcons name='delete-empty' color={'red'} size={24} style={{ padding: 5 }} />
            </TouchableOpacity>
            </TouchableOpacity >
        )
    }
    render() {
        const {
            container, header, wrapper, titleStyle
        } = styles;
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Setting.theme_color} size={30} />
                        </TouchableOpacity>
                        <Text style={titleStyle}>ORDER HISTORY</Text>
                        <View style={{ width: 30 }} />
                    </View>
                </View>
                {this.state.order ?
                    (
                        <ScrollView style={{ flex: 1 }}>
                            {this.state.order.map(item => this.renderItem(item))}
                        </ScrollView>
                    )

                    : null}
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-around',
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
        // flex: 1,
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
    text: {
        color: 'black'
    }
});