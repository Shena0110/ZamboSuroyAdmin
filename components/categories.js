import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { categoriesData, fetchDestinationsData } from './constant';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dialog } from 'react-native-paper';

export default function Categories() {
  const navigation = useNavigation();
  const [activeCat, setActiveCat] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [touristSpots, setTouristSpots] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchDestinationsData(setTouristSpots);
  
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);
  
  useEffect(() => {
    if (activeCat === 'All') {
      setFilteredDestinations(touristSpots);
    } else {
      setFilteredDestinations(touristSpots.filter(item => item.category === activeCat));
    }
  }, [activeCat, touristSpots]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          {categoriesData.map((cat, index) => {
            let isActive = cat === activeCat;
            let activeButtonStyle = isActive ? { backgroundColor: 'green', shadowColor: 'black', borderWidth: 1 } : {};
            return (
              <TouchableOpacity
                onPress={() => setActiveCat(cat)}
                key={index}
                style={[{ padding: 10, paddingHorizontal: 20, borderRadius: 20, margin: 5 }, activeButtonStyle]}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}>
        <View style={{ minHeight: 3500, marginBottom: 10 }}>
          {filteredDestinations.map((item, index) => {
            return (
              <DestinationCard navigation={navigation} item={item} key={index} />
            );
          })}
          
        </View>
      </ScrollView>
    </View>
  );
}

const DestinationCard = ({ item, navigation }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const hideDialog = () => {
    setOpenDialog(false);
  }

  const showEditDialog = () => {
    setOpenDialog(true);
    // Add any additional logic here to populate the edit dialog with data from the item.
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DestinationScreen', { ...item })}
      style={{
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        height: '200', 
        flexWrap: 'wrap'
      }}
    >
      <Image
        style={{ width: 150, height: 200, marginBottom: 10, borderRadius: 30 }}
        source={{ uri: item.imageUrl }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.touristSpotName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='map-marker-alt' size={20} color={'black'} />
          <Text style={{ flexWrap: 'wrap', fontSize: 12 }}> {item.destinationLocation} </Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 14, marginTop: 10 }}> {item.direction} </Text>
        <Text style={{ fontSize: 12, marginTop: 10 }}>More....</Text>
      </View>

      {/* The ellipsis menu should be part of the DestinationCard */}
      {/* The Dialog should also be part of the DestinationCard */}
      <TouchableOpacity onPress={showEditDialog}>
        <Icon name='ellipsis-h' size={20} color={'black'} />
      </TouchableOpacity>
      <Dialog 
        visible={openDialog}
        onDismiss={hideDialog}
        style={{
          width: 200,
          height: 100,
          top: 0,
          right: 0,
          position:'absolute', 
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Dialog.Content>
          {/* Edit dialog content */}
          <View 
            style={{
              backgroundColor: 'white',
            }}
          >
            <TouchableOpacity style={{borderWidth:1, width:200, height:60, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('EditScreen')}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:1, width:200, height:60, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </TouchableOpacity>
  );
};
