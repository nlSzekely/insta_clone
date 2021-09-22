import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser, fetchUserPosts} from '../store/actions/userActions';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feed from './main/Feed';
import Profile from './main/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Empty(){
  return null
}

const Tab = createMaterialBottomTabNavigator();
export default function Main() {
  const currentUser = useSelector((state) => state.userState.currentUser);
  console.log('🚀 ~ file: Main.js ~ line 9 ~ Main ~ currentUser', currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('USER FETCHED');
    dispatch(fetchUser());
    dispatch(fetchUserPosts());

  }, []);

  if (!currentUser) {
    return null;
  }
  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name='Feed'
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='home' color={color} size={26} />
          ),
        }}
        component={Feed}
      />
      <Tab.Screen
        name='Add+'
        listeners={({navigation}) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          },
        })}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='plus-box' color={color} size={26} />
          ),
        }}
        component={Empty}
      />
      <Tab.Screen
        name='Profile'
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='account-circle' color={color} size={26} />
          ),
        }}
        component={Profile}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      {/* <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>{currentUser.name} Logged in</Text>
      <Button title='Sign out' onPress={() => firebase.auth().signOut()} />
    </View> */}
    </Tab.Navigator>
  );
}
