import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StatusBar, Platform, TouchableOpacity, Alert} from 'react-native';
import { Avatar } from '../assets';
import { Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import * as FileSystem from 'expo-file-system';



import Categories from '../components/categories';

const HomeScreen = ({item}) => {
  const users = 1000;
  const touristSpots = 50;
  const highestRatedSpot = 'Mount Everest';

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);


  const hideDialog = () => {
    setOpenDialog(!openDialog)
  }

  const hideEditDialog = () => {
    setOpenEditDialog(!openEditDialog)
  }

  const [avatar, setAvatar] = useState(null);
  const [insert, setInsert] = useState(null);
  const [upload, setUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [userData, setUserData ] = useState([]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setInsert(result.assets[0].uri); 
  }
};
  
const uploadMedia = async () => {
  setUpload(true);

  try {
    const { uri } = await FileSystem.getInfoAsync(avatar);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const filename = avatar.substring(avatar.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(filename);

    await ref.put(blob);

    setImageUploaded(true);
    setUpload(false);
    Alert.alert("Photo Uploaded!!");

  } catch (error) {
    console.error(error);
  }
};


const handleUpload = async () => {
  try {
    if (!avatar) {
      Alert.alert('Error', 'Please select an image before saving.');
      return;
    }

    const user = firebase.auth().currentUser;

    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    
    const userId = user.uid;

    
    await uploadMedia();

    const avatarRef = firebase.firestore().collection('users').doc(userId);

    await avatarRef.update({
      avatarUrl: avatar,
    });

    setAvatar(null);

    Alert.alert('Success', 'Avatar uploaded successfully.');
  } catch (error) {
    console.error('Error uploading avatar: ', error);
    Alert.alert('Error', 'Failed to upload avatar. Please try again.');
  }
};
  

const userRef = firebase.firestore().collection('users');

useEffect(() => {
  userRef.onSnapshot((querySnapshot) => {
    const userData = [];
    querySnapshot.forEach((doc) => {
      const { email, username, avatarUrl } = doc.data();
      userData.push({
        id: doc.id,
        username,
        email,
        avatarUrl,
      });
    });
    setUserData(userData);
  });
}, []);

  
  
  


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ZamboSuroy(Admin)</Text>
        </View>

        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={hideDialog}>
        <Image source={Avatar} style={{ width: '100%', height: '100%', borderRadius: 24, resizeMode: 'cover' }} />
      </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginVertical: 8, marginHorizontal: 16, borderColor: 'gray', borderWidth: 1, padding: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginLeft: 8 }}>Dashboard</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8 }}>
          <View style={{ flex: 1, backgroundColor: '#ccc', padding: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{users}</Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Users</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#ccc', padding: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{touristSpots}</Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Tourist Spots</Text>
          </View>
        </View>
        <View style={{ marginLeft: 8 }}>
          <View style={{ backgroundColor: '#ccc', width: 192, height: 96, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{highestRatedSpot}</Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Most Visited</Text>
          </View>
        </View>
      </View>
      <View>
      <ScrollView showsHorizontalScrollIndicator={false}>
      <Categories/>
      </ScrollView>
      </View>
      {userData
  .filter((user) => user.id === firebase.auth().currentUser.uid)
  .map((item) => (
  <Dialog
  key={item.id}
  visible={openDialog}
  onDismiss={hideDialog}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height:400,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>

          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              backgroundColor: 'white',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{ uri: item.avatarUrl }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
                resizeMode: 'cover',
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              width: 200,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={hideEditDialog}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Profile</Text>
          </TouchableOpacity>
  <Text style={{fontSize: 28, fontWeight: 'bold'}} > {item.username} </Text>
    <Text style={{fontSize: 16, fontWeight:'300'}} > {item.email} </Text>
    <TouchableOpacity
    style={{
      backgroundColor: '#00cc00',
      width: 200,
      height: 40,
      borderRadius: 20, 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    }} 
    onPress={() => firebase.auth().signOut()}
    >
      <Text style={{fontWeight:'bold', fontSize: 20}} >Logout</Text>
    </TouchableOpacity>
    
</Dialog>
))}
<Dialog
visible={openEditDialog}
onDismiss={hideEditDialog}
style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height:600,
  width: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}
>
<View
    style={{
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
    }}
  >
    {avatar &&<Image
    source={{ uri: avatar }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover',
      }}
    />}
    <TouchableOpacity
    style={{
      marginLeft: -15, 
    }}
    onPress={pickImage}
    >
      <Icon name="camera" size={30} color="gray" />
    </TouchableOpacity>
  </View>
  {avatar && !imageUploaded ?  ( 
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              width: 150,
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={handleUpload}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Save and Upload</Text>
          </TouchableOpacity>
        ) : null}
  <Text style={{fontSize: 28, fontWeight: 'bold'}} >Name Section</Text>
    <Text style={{fontSize: 16, fontWeight:'300'}} >Email Section</Text>
    <TouchableOpacity
    style={{
      backgroundColor: '#00cc00',
      width: 200,
      height: 40,
      borderRadius: 20, 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    }} 
    onPress={() => firebase.auth().signOut()}
    >
      <Text style={{fontWeight:'bold', fontSize: 20}} >Logout</Text>
    </TouchableOpacity>

</Dialog>

    </View>
  );
}

export default HomeScreen;