import { useState, useEffect } from 'react';
import { firebase } from '../config';

export const categoriesData = ["All", "Beach", "Waterfall", "Resorts", "Hotel"];

export async function fetchDestinationsData(setTouristSpots) {
  const touristRef = firebase.firestore().collection('touristSpots');
  let unsubscribe;

  try {
    const querySnapshot = await touristRef.get();

    const users = [];
    querySnapshot.forEach((doc) => {
      const {
        category,
        destinationLocation,
        direction,
        fare,
        imageUrl,
        information,
        touristSpotName,
        transportationMode,
      } = doc.data();
      users.push({
        id: doc.id,
        category,
        destinationLocation,
        direction,
        fare,
        imageUrl,
        information,
        touristSpotName,
        transportationMode,
      });
    });

    
    unsubscribe = touristRef.onSnapshot((querySnapshot) => {
      const updatedTouristSpots = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Updated Tourist Spots:', updatedTouristSpots);
      setTouristSpots(updatedTouristSpots);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


