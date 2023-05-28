import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { categories } from '../constants';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryPress = useCallback(
    (categoryId) => {
      setActiveCategory(categoryId);
    },
    [activeCategory, setActiveCategory]
  );

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
          let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
          return (
            <View key={index} className="flex items-center justify-center mr-6">
              <TouchableOpacity
                key={index}
                className={`items-center justify-center w-20 h-20 p-1 bg-gray-200 rounded-full shadow ${btnClass}`}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Image style={{ width: 45, height: 45 }} source={category?.image} />
                <Text className={`text-sm ${textClass}`}>{category.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
