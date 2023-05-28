import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { themeColors } from '../themes';

const RestaurantCard = ({ restaurant }) => {
  return (
    <>
      <TouchableWithoutFeedback>
        <View
          style={{ shadowColor: themeColors.bgColor(0.3), shadowRadius: 7 }}
          className="mr-6 bg-white rounded-3xl shadow-lg"
        >
          <Image className="h-36 w-64 rounded-t-3xl" source={restaurant.image} />
          <View className="px-3 pb-4 space-y-2">
            <Text className="text-lg font-bold pt-2">{restaurant.name}</Text>
            <View className="flex-row items-center space-x-1">
              <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
              <Text className="text-xs">
                <Text className="text-green-700 ">{restaurant.stars}</Text>
                <Text className="text-gray-700">
                  ({restaurant.reviews} review) . <Text className="font-semibold">{restaurant.category}</Text>
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Icon.MapPin width="15" height="15" color="gray" />
              <Text className="text-gray-700 text-xs">Nearby. {restaurant.address}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default RestaurantCard;
