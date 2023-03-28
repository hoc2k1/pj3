import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import Setting from '../../../../config/setting'

export default class ThanksPage extends React.Component {
    render(){
        return(
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
                <Image source={require('../../../../media/ThanksPage.gif')} style={{ width: '100%', }} resizeMode={'contain'} />
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Home')}
                    style={{ backgroundColor:  Setting.theme_color, width: '50%'}}>
                    <Text style={{ color: 'white', paddingVertical: 10, fontSize: 20, textAlign: 'center' }}>GO HOME</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
