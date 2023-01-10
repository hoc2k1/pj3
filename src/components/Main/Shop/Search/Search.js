import React, { Component } from 'react';
import {
    View, Dimensions, FlatList, TouchableOpacity, Image, Text, StyleSheet, ToastAndroid
} from 'react-native';
import Header from '../Header';
import searchProduct from '../../../../api/searchProduct';
import Setting from '../../../../config/setting';

const url = `${Setting.url}images/product/`;
const {width, height} = Dimensions.get('window');
const produtWidth = (width - 100) / 2;

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state ={
            data: null,
        }
    }
    componentWillReceiveProps(nextProps){
        this.search(nextProps.route?.params?.txt)
    }
    showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Please enter keyword",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
    };

    search(txt){
        if(txt){
            searchProduct(txt)
            .then(res => this.setState({data: res}))
            .catch(err => [console.log(err), this.setState({data: null})]);
        }
        else {
            this.setState({data: null})
            this.showToastWithGravity();
        }
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
            <TouchableOpacity activeOpacity={0.7} style={productContainer} onPress={() => this.props.navigation.navigate('ProductDetail' , { product: item.item })}>
                <View style={{ padding: 5 }}>
                    <Image source={{ uri: `${url}${item.item.images[0]}` }} style={productImage} />
                    <Text style={productName}>{name}</Text>
                    <Text style={productPrice}>{item.item.price}$</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <Header txt={this.props.route?.params?.txt} route={this.props.route?.name} navigation={this.props.navigation}/>
                <View style={{ padding: 10, marginBottom: 20, height: height-130}}>
                    <FlatList 
                        data={this.state.data}
                        keyExtractor={(item) => item}
                        renderItem={(item) => this.renderItem(item)}
                        numColumns={2}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    backStyle: {
        width: 30,
        height: 30
    },
    
    titleStyle: {
        color: Setting.theme_color,
        fontSize: 20
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
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '400'
    },
    txtPrice: {
        color: '#B10D65',
    },
    txtShowDetail: {
        color: '#B10D65',
        fontSize: 11
    },
    productsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20
    },
});
