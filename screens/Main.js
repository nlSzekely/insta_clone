import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../store/actions/userActions';

export default function Main() {
  const currentUser = useSelector((state) => state.userState.currentUser);
  console.log('🚀 ~ file: Main.js ~ line 9 ~ Main ~ currentUser', currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('USER FETCHED');
    dispatch(fetchUser());
  }, []);

  if (!currentUser) {
    return null;
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>{currentUser.name} Logged in</Text>
      <Button title='Sign out' onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
