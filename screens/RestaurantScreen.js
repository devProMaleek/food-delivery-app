import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColors } from '../themes';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { StatusBar } from 'expo-status-bar';

const RestaurantScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  let restaurant = params;
  return (
    <View>
      <CartIcon />
      <StatusBar style='light' />
      <ScrollView>
        <View className="relative">
          <Image source={restaurant.image} className="w-full h-72" />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute p-2 rounded-full shadow top-14 left-4 bg-gray-50"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View className="pt-6 -mt-12 bg-white" style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
          <View className="px-5">
            <Text className="text-3xl font-bold">{restaurant.name}</Text>
            <View className="flex-row my-1 space-x-2">
              <View className="flex-row items-center space-x-1">
                <Image source={require('../assets/images/fullStar.png')} className="w-4 h-4" />
                <Text className="text-xs">
                  <Text className="text-green-700 ">{restaurant.stars}</Text>
                  <Text className="text-gray-700">
                    ({restaurant.reviews} review) . <Text className="font-semibold">{restaurant.category}</Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin width="15" height="15" color="gray" />
                <Text className="text-xs text-gray-700">Nearby. {restaurant.address}</Text>
              </View>
            </View>
            <Text className="mt-2 text-gray-500">{restaurant.description}</Text>
          </View>
        </View>

        <View className="pb-3 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {restaurant.dishes?.map((dish, index) => {
            return <DishRow dish={{ ...dish }} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
