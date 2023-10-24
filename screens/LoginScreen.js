import { View, Text, TouchableOpacity, TextInput, Platform, StatusBar, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase, auth } from '../config';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Zam } from '../assets';
import Button from '../components/Button';

WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [ request, response, promptAsync ] = Google.useAuthRequest({
    androidClientId: 
        "94330551531-bugvi6v2qtgav4n1368hv9n7aql2ukhe.apps.googleusercontent.com"
  });

  loginUser = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  
      const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();
      const userData = userDoc.data();
  
      if (userData) {
        // Navigate to 'MainNavigation' unconditionally
        navigation.navigate('MainNavigation');
      }
    } catch (error) {
      alert(error.message);
    }
  } 

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response])
  

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }}>
      <Image
        source={Zam}
        style={{ width: 200, height: 200, borderRadius: 8, objectFit: "cover" }}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
        Login to Your Account
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 2,
            marginBottom: 12,
            borderRadius: 20,
            textAlign: 'center',
            height: 50,
            width: 340,
          }}
          placeholder='Email'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 2,
            marginBottom: 12,
            borderRadius: 20,
            textAlign: 'center',
            height: 50,
            width: 340,
          }}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />

      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={{
          marginTop: 10,
          height: 50,
          width: 250,
          alignItems: 'center',
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "green"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("RegisterScreen")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Don't have an account? Register Now
        </Text>
      </TouchableOpacity>
      <Button
    text="Continue with Google" name="google-plus" onPress={() => promptAsync()}
    />
    </View>
   
  )
}

export default LoginScreen;
