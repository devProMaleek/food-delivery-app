import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { featured } from '../constants';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { themeColors } from '../themes';
import call from 'react-native-phone-call';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/CartSlice';

const DeliveryScreen = () => {
  const { restaurant } = useSelector((state) => state.restaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const triggerRiderCall = useCallback(() => {
    const args = {
      number: '09039561875',
      prompt: true,
    };
    try {
      call(args);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCancelNavigation = () => {
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.lng }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View className="relative -mt-10 bg-white rounded-t-3xl">
        <View className="flex-row justify-between px-5 pt-5">
          <View>
            <Text className="text-lg font-semibold text-gray-700">Estimated Arrival</Text>
            <Text className="text-3xl font-extrabold text-gray-700">20-30 Minutes</Text>
            <Text className="mt-2 font-semibold text-gray-700">Your order is on its way</Text>
          </View>
          <Image source={require('../assets/images/bikeGuy2.gif')} className="w-24 h-24" />
        </View>

        <View
          className="flex-row items-center justify-between p-2 mx-2 my-5 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
        >
          <View className="p-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Image className="w-16 h-16 rounded-full" source={require('../assets/images/deliveryGuy.png')} />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Abdulmalik</Text>
            <Text className="font-semibold text-white">Your Rider</Text>
          </View>
          <View className="flex-row items-center mr-3 space-x-3">
            <TouchableOpacity onPress={triggerRiderCall} className="p-2 bg-white rounded-full">
              <Icon.Phone fill="green" strokeWidth={1} stroke="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelNavigation} className="p-2 bg-white rounded-full">
              <Icon.X strokeWidth={3} stroke="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
