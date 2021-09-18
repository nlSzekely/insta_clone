import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import * as firebase from 'firebase';

LogBox.ignoreLogs(['Remote debugger', 'Reanimated 2', 'Accessing the state']);


const firebaseConfig = {
  apiKey: "AIzaSyBA9rCQawK5kD-IBzy_DfOik6FtbVIIrUA",
  authDomain: "instagram-36ed6.firebaseapp.com",
  projectId: "instagram-36ed6",
  storageBucket: "instagram-36ed6.appspot.com",
  messagingSenderId: "610979242190",
  appId: "1:610979242190:web:c391d5b3e4a0eb833cf09f",
  measurementId: "G-P0161XKQ3C"
};

// make sure we ar not running any firebase instance
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingScreen'>
        <Stack.Screen name='LandingScreen' options={{headerShown:false}} component={LandingScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
