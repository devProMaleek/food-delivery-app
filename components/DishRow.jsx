import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';
import { themeColors } from '../themes';
import * as Icon from 'react-native-feather';
import { capitalizeWord, formatCurrency } from '../utils';

const DishRow = ({ dish }) => {
  const [cartValue, setCartValue] = useState(0);

  const onAdd = useCallback(() => {
    setCartValue((value) => value + 1);
  }, [cartValue]);

  const onRemove = useCallback(() => {
    if (cartValue === 0) {
      return;
    }
    setCartValue((value) => value - 1);
  }, [cartValue]);

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
              onPress={onRemove}
            >
              <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            <Text className="px-3">{cartValue}</Text>
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={onAdd}
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
