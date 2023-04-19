import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCard from '../components/ItemCard';
import { ActivityIndicator } from 'react-native';

export default function Discover() {
    const navigation = useNavigation();

    const [type, setType] = useState('restaurants');
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setmainData] = useState([])
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
  return (
   <SafeAreaView className='flex-1 bg-white ... relative'>
    <View className='flex-row items-center justify-between px-8 mt-8'>
        <View>
            <Text className='text-[40px] text-[#0B646B] font-bold'>Discover</Text>
            <Text className='text-[#527283] text-[36px]'>the beauty today</Text>
        </View>
        <View className='w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg'>
            <Image
            source={Avatar}
            className='w-full h-full rounded-md object-cover'
            />
        </View>
    </View>
    <View className='flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4'>
        <GooglePlacesAutocomplete
               GooglePlacesDetailsQuery={{ fields: "geometry" }}
               placeholder="Search"
               fetchDetails={true}
               onPress={(data, details = null) => {
                 // 'details' is provided when fetchDetails = true
                 console.log(details?.geometry?.viewport);
                 setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                 setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                 setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                 setTr_lng(details?.geometry?.viewport?.northeast?.lng);
               }}
               query={{
                 key: "YOUR_API_KEY",
                 language: "en",
               }}
        />
    </View>
    {/**Menu Container */}
    {isLoading ? <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#0B646B'/>
    </View> : 
    
    <ScrollView>
        <View className='flex-row items-center justify-between px-8 mt-8'>
            <MenuContainer
            key={'hotel'}
            title='Hotels'
            imageSrc={Hotels}
            type={type}
            setType={setType}
            />
              <MenuContainer
            key={'attractions'}
            title='Attractions'
            imageSrc={Attractions}
            type={type}
            setType={setType}
            />
              <MenuContainer
            key={'restaurants'}
            title='Restaurants'
            imageSrc={Restaurants}
            type={type}
            setType={setType}
            />
        </View>

        <View>
            <View className='flex-row items-center justify-between px-4 mt-8'>
                <Text className='text-[#2C7379] text-[28px] font-bold'>Top Tips</Text>
                <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
                    <Text className='text-[#A0C4C7] text-[28px] font-bold'>Explore</Text>
                    <FontAwesome name='long-arrow-right' size={24} color='#A0C4C7'/>
                </TouchableOpacity>
            </View>

            <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
            {mainData?.length > 0 ? 
           ( <>
            <ItemCard key={'101'} 
                imageSrc={'https://cdn.pixabay.com/photo/2023/03/31/14/52/rice-field-7890204_1280.jpg'} 
                title='knksllls' 
                location='Doha'/>
                <ItemCard key={'102'} 
                imageSrc={'https://cdn.pixabay.com/photo/2023/03/29/10/27/hotel-7885138_640.jpg'} 
                title='mwmmw' 
                location='Doha'/>
            </> ):( <>
                <View className='w-full h-[400px] items-center space-y-8 justify-center'>
                    <Image source={NotFound} className='w-32 h-32 object-cover'/>
                    <Text className='text-2xl text-[#428288] font-semibold'>Opps...No Data Found</Text>
                </View>
            </>)}
                
            </View>
        </View>
    </ScrollView>
    }
    

   </SafeAreaView>
  );
}