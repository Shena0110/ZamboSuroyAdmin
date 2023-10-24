import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavorite] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={{ uri: item.imageUrl }} style={{ width: wp(100), height: hp(55) }} />
      <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%' }}>
        <TouchableOpacity
          style={{ padding: 12, borderRadius: 24, marginLeft: 16 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="black" style={{ marginTop: 12 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorite(!isFavourite)}
          style={{ padding: 12, borderRadius: 24, marginRight: 16 }}
        >
          <Icon name="heart" size={24} color={isFavourite ? "red" : "black"} style={{ marginTop: 12 }} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{ 
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: 'white', 
        padding: 5, 
        marginTop: -40,
         }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 10}}>
          <View>
            <Text style={{fontWeight:'bold', fontSize:28}}>{item?.touristSpotName}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name='map-marker-alt' size={24} color={'black'}/>
              <Text style={{flexWrap: 'wrap', fontSize:14}}> {item?.destinationLocation} </Text>
            </View>
            <Text style={{flexWrap: 'wrap', fontSize:14, marginTop: 10,}}> {item?.information} </Text>
            <Text style={{fontWeight:"bold", marginTop: 10,}}>Duration:</Text>
            <Text style={{flexWrap: 'wrap', fontSize:14, marginTop: 10,}}> {item?.direction} </Text>
            <Text style={{fontWeight:"bold", marginTop: 10,}}>Estimated Fare:</Text>
            <Text style={{flexWrap: 'wrap', fontSize:14, marginTop: 10,}}> {item?.fare} </Text>
            <View style={{flexDirection: 'row',marginTop: 10, }}>
              <Icon name='taxi' size={24} color={'black'}/>
              <Text style={{flexWrap: 'wrap', fontSize:14, fontWeight:'bold', fontSize: 16}}> {item?.transportationMode} </Text>
            </View>
            <Text style={{marginTop:20}}>Rating Section</Text>

            <TouchableOpacity
            style={{
              backgroundColor:'green',
              borderRadius: 20,
              alignItems:'center',
              justifyContent: 'center',
              marginTop: 20,
              height: 40
            }} 
            >
              <Text style={{fontSize: 20}}>View Map</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
