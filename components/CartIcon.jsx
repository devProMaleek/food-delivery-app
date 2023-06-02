import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { themeColors } from '../themes';
import { formatCurrency } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { cartTotalPrice } from '../store/slices/CartSlice';

const CartIcon = () => {
  const navigation = useNavigation();
  const { totalQuantity } = useSelector((state) => state.cart);
  const totalPrice = useSelector(cartTotalPrice);
  
  const navigateToCart = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  if (totalQuantity === 0) {
    return;
  }

  return (
    <View className="absolute z-50 w-full bottom-5">
      <TouchableOpacity
        onPress={navigateToCart}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row items-center justify-between p-4 py-3 mx-5 rounded-full shadow-lg"
      >
        <View className="p-2 px-4 rounded-full" style={{ backgroundColor: 'rgba(255,255,255, 0.3)' }}>
          <Text className="text-lg font-extrabold text-white">{totalQuantity}</Text>
        </View>
        <Text className="flex-1 text-lg font-extrabold text-center text-white">View Cart</Text>
        <Text className="text-lg font-extrabold text-white">{formatCurrency(totalPrice)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
