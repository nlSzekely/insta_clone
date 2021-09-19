import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import firebase from 'firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin() {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
    
  }

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder='email'
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      <TextInput
        placeholder='password'
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      <Button title='Log In' onPress={onLogin} />
    </View>
  );
}
