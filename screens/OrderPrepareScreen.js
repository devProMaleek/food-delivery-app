import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderPrepareScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Image className="h-80 w-80" source={require('../assets/images/delivery.gif')} />
    </View>
  );
};

export default OrderPrepareScreen;
