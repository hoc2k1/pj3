import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../components/Main/Main';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import Authentication from '../components/Authentication/Authentication';
import ChangeInfo from '../components/ChangeInfo/ChangeInfo';
import BottomTabNavigator from './TabNavigator';
import ListProduct from '../components/Main/Shop/ListProduct/ListProduct';
import ProductDetail from '../components/Main/Shop/ProductDetail/ProductDetail';
import Checkout from '../components/Main/Shop/Checkout/Checkout';
import ThanksPage from '../components/Main/Shop/ThanksPage/ThanksPage';
import OrderDetail from '../components/OrderHistory/OrderDetail';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ThanksPage" component={ThanksPage} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />

    </Stack.Navigator>
  );
};

export {MainStackNavigator};
