import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { themeColors } from '../themes';
import * as Icon from 'react-native-feather';
import { capitalizeWord, formatCurrency } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, selectCartItemById } from '../store/slices/CartSlice';

const DishRow = ({ dish }) => {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => selectCartItemById(state, dish.id));

  const itemQuantity = useMemo(() => {
    if (cartItem.length === 0) {
      return 0;
    } else {
      return cartItem[0].quantity;
    }
  }, [cartItem]);

  const newItem = {
    name: dish.name,
    price: dish.price,
    description: dish.description,
    id: dish.id,
    quantity: 1,
    image: dish.image,
    totalPrice: dish.price,
  };
  const handleIncrease = useCallback(() => {
    dispatch(addItemToCart(newItem));
  }, [newItem]);

  const handleDecrease = useCallback(() => {
    if (cartItem.length === 0) {
      return;
    }
    dispatch(removeItemFromCart(dish.id));
  }, [dish, cartItem]);

  return (
    <View className="flex-row items-center p-3 mx-2 mb-3 bg-white shadow-2xl rounded-3xl">
      <Image className="rounded-3xl" style={{ height: 100, width: 100 }} source={dish.image} />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{capitalizeWord(dish.name)}</Text>
          <Text className="text-gray-700">{dish.description}</Text>
        </View>
        <View className="flex-row items-center justify-between pl-3">
          <Text className="text-lg font-bold text-gray-700">{formatCurrency(dish.price)}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleDecrease}
            >
              <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            <Text className="px-3">{itemQuantity}</Text>
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleIncrease}
            >
              <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
