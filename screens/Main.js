import React from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';

export default function Main() {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>Logged in</Text>
      <Button title='Sign out' onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
