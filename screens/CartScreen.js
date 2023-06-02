import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { featured } from '../constants';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../themes';
import { capitalizeWord, formatCurrency } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { cartTotalPrice, clearSingleCartItem } from '../store/slices/CartSlice';
import { center } from 'nativewind';

const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((state) => state.cart);
  const { restaurant } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPrice);
  const [groupedItems, setGroupedItems] = useState({});
  const [changeCartContent, setChangeCartContent] = useState(false);

  const totalOrderPrice = useMemo(() => totalPrice + 500, [totalPrice]);

  useEffect(() => {
    if (!(Object.keys(groupedItems).length > 0)) {
      setChangeCartContent(true);
    } else {
      setChangeCartContent(false);
    }
  }, [groupedItems, changeCartContent]);

  useEffect(() => {
    const cartItems = items.reduce((group, item) => {
      const { id } = item;
      if (group[id]) {
        group[id].push(item);
      } else {
        group[id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(cartItems);
  }, [items]);

  const removeItemFromCart = useCallback((id) => {
    dispatch(clearSingleCartItem(id));
  }, []);

  const handleNavigation = useCallback(() => {
    if (changeCartContent) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('OrderPreparing');
    }
  }, [changeCartContent]);

  return (
    <View className="flex-1 bg-white">
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 p-1 rounded-full shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-xl font-bold text-center">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row items-center px-4">
        <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full" />
        <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {changeCartContent ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            className="pt-5 bg-white"
          >
            <View>
              <Text className="text-xl font-bold text-gray-700">Your cart is empty</Text>
            </View>
          </ScrollView>
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="pt-5 bg-white"
        >
          {Object.entries(groupedItems).map((item, key) => {
            let dish = item[1][0];
            return (
              <View
                key={key}
                className="flex-row items-center px-4 py-2 mx-2 mb-3 space-x-3 bg-white shadow-md rounded-3xl"
              >
                <Text className="font-bold" style={{ color: themeColors.text }}>
                  {dish.quantity} x
                </Text>
                <Image className="rounded-full w-14 h-14" source={dish.image} />
                <Text className="flex-1 font-bold text-gray-700">{capitalizeWord(dish.name)}</Text>
                <Text className="text-base font-semibold">{formatCurrency(dish.price)}</Text>
                <TouchableOpacity
                  onPress={() => removeItemFromCart(dish.id)}
                  className="p-1 rounded-full"
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                >
                  <Icon.Minus strokeWidth={2} width={20} height={20} stroke="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      <View className="p-4 px-8 rounded-t-3xl" style={{ backgroundColor: themeColors.bgColor(0.2) }}>
        {!changeCartContent ? (
          <>
            <View className="space-y-4">
              <View className="flex-row justify-between">
                <Text className="font-medium text-gray-700">Subtotal</Text>
                <Text className="font-medium text-gray-700">{formatCurrency(totalPrice)}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="font-medium text-gray-700">Delivery Fee</Text>
                <Text className="font-medium text-gray-700">{formatCurrency(500)}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="font-extrabold text-gray-700">Order Total</Text>
                <Text className="font-extrabold text-gray-700">{formatCurrency(totalOrderPrice)}</Text>
              </View>
            </View>
          </>
        ) : null}

        <View className="pt-3">
          <TouchableOpacity
            onPress={handleNavigation}
            className="p-3 rounded-full"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            <Text className="text-lg font-bold text-center text-white">
              {changeCartContent ? 'Go to Home' : 'Place Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
