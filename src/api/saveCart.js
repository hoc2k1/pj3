import AsyncStorage from "@react-native-community/async-storage";

const saveCart = async (cartArray) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
};

export default saveCart;