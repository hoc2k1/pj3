import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../components/Main/Main';
import Contact from '../components/Main/Shop/Contact/Contact';
import Search from '../components/Main/Shop/Search/Search';
import Cart from '../components/Main/Shop/Cart/Cart';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Setting from '../config/setting';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
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
        name="Cart"
        component={Cart}
        options={({route}) => ({
          tabBarActiveTintColor: Setting.theme_color,
          tabBarBadge: null,
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
            return <FontAwesome name='phone' color={color} size={size} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
