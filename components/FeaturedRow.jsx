import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { themeColors } from '../themes';
import React from 'react'
import RestaurantCard from './RestaurantCard';

const FeaturedRow = ({ title, description, restaurants }) => {
  return (
    <View>
      <View className="flex-row items-center justify-between px-4">
        <View>
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-xs text-gray-500">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: themeColors.text}} className="font-semibold">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="py-5 overflow-visible">
        {restaurants?.map((restaurant, index) => {
          return (
            <RestaurantCard restaurant={restaurant} key={index} />
          )        
        })}
        
      </ScrollView>
    </View>
  )
}

export default FeaturedRow