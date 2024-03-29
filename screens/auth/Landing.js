import React from 'react';
import {View, Text, Button} from 'react-native';

export default function LandingScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button title='Register' onPress={() => navigation.navigate('RegisterScreen')} />
      <Button title='Login' onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
}
