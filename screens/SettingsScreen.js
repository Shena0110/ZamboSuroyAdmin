import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Awesome from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../config';


const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', position: 'relative', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, }}>
      <View >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-undo" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Settings</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Text style={{ fontSize: 16 }}>F.A.Q</Text>
          <Awesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={{ fontSize: 16 }}>About</Text>
          <Awesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AddScreen')}
        >
          <Text style={{ fontSize: 16 }}>Add Tourist Spot</Text>
          <Awesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={{ fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;
