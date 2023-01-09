import React, { Component } from 'react'
import { 
    View, Text, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet, Modal 
} from 'react-native';
// import global from '../../global';
import icLogo from '../../../media/appIcon/ic_logo.png';
import icMenu from '../../../media/appIcon/ic_menu.png';
import Menu from '../Menu'
import Setting from '../../../config/setting';

const { height } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
            modalVisible: false,
        };
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
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Welcome</Text>
                    <View></View>
                </View>
                <TextInput 
                    style={textInput}
                    placeholder="What do you want to buy?"
                    placeholderTextColor='gray'
                    underlineColorAndroid="transparent"
                    value={this.state.txtSearch}
                    onChangeText={text => this.setState({ txtSearch: text })}
                    // onFocus={() => global.gotoSearch()} 
                    // onSubmitEditing={this.onSearch.bind(this)}
                />
                <Modal 
                    visible={this.state.modalVisible} 
                    animationType="fade"
                    transparent={true}>
                    {this.showMenu()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        height: height / 8, 
        backgroundColor: Setting.theme_color, 
        padding: 10, 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { 
        color: 'black',
        height: height / 23, 
        backgroundColor: '#FFF', 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    titleStyle: { color: '#FFF', fontSize: 20 },
    iconStyle: { width: 25, height: 25 }
});
