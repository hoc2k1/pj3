import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    Text, StyleSheet,
    Image, Dimensions, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from '../../../../config/setting';

const url = `${Setting.url}images/product/`;
const {width} = Dimensions.get('window');
const produtWidth = (width - 100) / 2;

export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            page: 1,
            listProducts: []
        };
        this.arr = [];
    }

    async fetchProductData(idType, page){
        let tmp;
        if(idType !== 'COLLECTION') {
            tmp = `${Setting.url}product_by_type.php?id_type=${idType}&page=${page}`
        }
        else {
            tmp = `${Setting.url}get_collection.php?page=${page}`;
        }
        console.log(tmp)
        const response = await fetch(tmp);
        const json = await response.json();
        this.setState({
            listProducts: json
        })
    }
    componentDidMount() {
        const idType = this.props.route.params.category.id;
        this.fetchProductData(idType, 1)
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
            <TouchableOpacity style={productContainer} onPress={() => this.props.navigation.navigate('ProductDetail' , { product: item.item })}>
                <View style={{ padding: 5 }}>
                    <Image source={{ uri: `${url}${item.item.images[0]}` }} style={productImage} />
                    <Text style={productName}>{name}</Text>
                    <Text style={productPrice}>{item.item.price}$</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {
            container, header, wrapper, backStyle, titleStyle,
             productInfo, lastRowInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail, productsContainer
         } = styles;
        const { category } = this.props.route.params;
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Setting.theme_color} size={30}/>
                        </TouchableOpacity>
                        <Text style={titleStyle}>{category.name}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <View style={productsContainer}>
                        <FlatList 
                            data={this.state.listProducts}
                            keyExtractor={(item) => item}
                            renderItem={(item) => this.renderItem(item)}
                            numColumns={2}
                        />
                    </View>
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
