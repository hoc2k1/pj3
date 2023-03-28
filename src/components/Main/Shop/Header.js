import React, { Component } from 'react'
import { 
    View, Text, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet, Modal, Keyboard 
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import icMenu from '../../../media/appIcon/ic_menu.png';
import Menu from '../Menu'
import Setting from '../../../config/setting';

const { height } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtSearch: '',
            modalVisible: false,
        };
    }

    search(txt){
        Keyboard.dismiss();
        this.props.navigation.navigate('Search', {txt: txt})
    }
    componentWillReceiveProps(nextProps){
        this.setState({txtSearch: nextProps.txt})
    }
    
    showMenu() {
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} 
                onPress={() => this.setState({modalVisible: false})}>
                    <TouchableOpacity 
                        style={{ height: '100%', width: '70%', borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: 'white' }}
                        onPress={() => this.setState({modalVisible: false})}
                        activeOpacity={1}>
                        <Menu data={this} navigation={this.props.navigation} />
                    </TouchableOpacity>                        
            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.props)
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={[wrapper, {height: this.props.route == "Home" ? height/12 : height/8}]}>
                <View style={row1}>
                    {/* <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity> */}
                    <View></View>
                    <Text style={titleStyle}>Welcome</Text>
                    <View></View>
                </View>
                {this.props.route == "Home" ? null : (<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput 
                        style={textInput}
                        placeholder="What do you want to buy?"
                        placeholderTextColor='gray'
                        underlineColorAndroid="transparent"
                        value={this.state.txtSearch}
                        onSubmitEditing={() => {this.search(this.state.txtSearch)}}
                        // defaultValue={this.state.txtSearch}
                        onChangeText={text => this.setState({ txtSearch: text })}
                        onBlur={() => Keyboard.dismiss()}
                        // onFocus={() => global.gotoSearch()} 
                        // onSubmitEditing={this.onSearch.bind(this)}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8} 
                        onPress={() => this.search(this.state.txtSearch)}
                        style={{backgroundColor: 'white', borderTopRightRadius: 5, borderBottomRightRadius: 5,}}>
                        <FontAwesome style={{ paddingHorizontal: 10 }} name='search' size={26} color={Setting.theme_color}/>
                    </TouchableOpacity>
                </View>)}
                {/* <Modal 
                    visible={this.state.modalVisible} 
                    animationType="fade"
                    transparent={true}>
                    {this.showMenu()}
                </Modal> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        backgroundColor: Setting.theme_color, 
        padding: 10, 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { 
        color: 'black',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: height / 23, 
        width: '80%',
        backgroundColor: '#FFF', 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    titleStyle: { color: '#FFF', fontSize: 20 },
    iconStyle: { width: 25, height: 25 }
});
