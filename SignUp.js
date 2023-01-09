/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import {React} from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const background = {
  uri: 'https://w7.pngwing.com/pngs/235/933/png-transparent-blue-blue-abstract-graphics-blue-background-texture-angle-triangle.png',
};
const image = {
  uri: 'https://play-lh.googleusercontent.com/j2zV7iXJAQnxrWBCG8rhujQDZ0peiCwlEthTlCrR5Uoumge9ZL9wjxs0ooUd2jtkSbg=w600-h300-pc0xffffff-pd',
};
const user = {
  uri: 'https://cdn-icons-png.flaticon.com/512/25/25634.png',
};
const pass = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ4RGghRmM4WGtYh7ptc7w59YZhVy4kurv-Q&usqp=CAU',
};
const retypepass = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThNElIzEYiOyISU7DBH7FmG-jfZhf-OWAVA&usqp=CAU',
};

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.dangky}>
          <Image source={image} style={[styles.image, {marginBottom: 10}]} />
          <Text style={styles.dangky_text}>ĐĂNG KÝ</Text>
        </View>
        <View style={{marginTop: 50, marginHorizontal: 30}}>
          <View style={styles.input_text}>
            <Image source={user} style={styles.icon} />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              placeholder="Số điện thoại"
              keyboardType="numeric"
              placeholderTextColor={'black'}
            />
          </View>
          <View style={styles.input_text}>
            <Image source={pass} style={styles.icon} />
            <TextInput
              secureTextEntry
              style={[styles.input, {marginBottom: 20}]}
              placeholder="Mật Khẩu"
              placeholderTextColor={'black'}
            />
          </View>
          <View style={styles.input_text}>
            <Image source={retypepass} style={styles.icon} />
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={'black'}
            />
          </View>
          <Text style={styles.forgetpass}>Quên mật khẩu ?</Text>
        </View>
        <View style={styles.button}>
          <Button title="Tạo tài khoản" color="#f03b2c" />
        </View>
        <View style={[styles.input_text, {justifyContent: 'center'}]}>
          <Text style={styles.text}>Bạn đã có sẵn tài khoản?</Text>
          <Text style={styles.text1}>  Đăng nhập</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
  },
  background: {
    width: windowWidth,
    height: windowHeight,
  },
  dangky: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
  dangky_text: {
    fontSize: 50,
    color: 'black',
  },
  input: {
    height: 40,
    width: 270,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#e6e6e6',
    color: 'black',
    borderRadius: 10,
  },
  input_text: {
    flexDirection: 'row',
  },
  icon: {
    height: 25,
    width: 25,
    position: 'relative',
    top: 6,
    right: 4,
  },
  button: {
    marginHorizontal: 100,
    paddingTop: 30,
  },
  text: {
    marginTop: 15,
    color: 'black',
  },
  text1: {
    marginTop: 15,
    color: 'blue',
  },
});

