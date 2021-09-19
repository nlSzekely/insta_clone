import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../store/actions/userActions'

export default function Main() {
 const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchUser())
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>Logged in</Text>
      <Button title='Sign out' onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
