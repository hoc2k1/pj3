import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Main from '../components/Main/Main';
import Contact from '../components/Main/Shop/Contact/Contact';
import Search from '../components/Main/Shop/Search/Search';
import Cart from '../components/Main/Shop/Cart/Cart';
import Category from '../components/Main/Shop/Home/Category';
import Menu from '../components/Main/Menu';
import Setting from '../config/setting';
import getCart from '../api/getCart';
import getToken from '../api/getToken';
import checkLogin from '../api/checkLogin';
import getItemFromCart from '../api/getItemFromCart';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = (props) => {
  const[token, setToken] = React.useState(null);
  const[id_bill, setId_bill] = React.useState(null);
  const[cart, setCart] = React.useState(null);

  React.useEffect(() => {
    console.log('a')
      getToken()
      .then(token => [(token ? setToken(token): [setToken(null), setId_bill(null), setCart(null)]), checkLogin(token)
        .then(res => res ? getCart(res.user.email)
            .then(res => [console.log(res), setId_bill(res.id), getItemFromCart(res.id)
                .then(ress => setCart(ress))
                .catch(errr => console.log(errr))])
            // .then(res => console.log(res))
            .catch(err => console.log(err)) : null)
        .catch(err => console.log('LOI CHECK LOGIN', err)) ]);
      console.log(cart)
  },[props, props.navigation])
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarIcon: ({ color, size}) => {
            return <Icon name='home' color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarIcon: ({ color, size}) => {
            return <MaterialIcons name='category' color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarBadge: cart && cart.length,
          tabBarIcon: ({ color, size}) => {
            return <Icon name='cart' color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarIcon: ({ color, size}) => {
            return <Icon name='search' color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarIcon: ({ color, size}) => {
            return <MaterialIcons name='contact-phone' color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="My Account"
        component={Menu}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarIcon: ({ color, size}) => {
            return <FontAwesome5 name='user-circle' color={color} size={size} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
