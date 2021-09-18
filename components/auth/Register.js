import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import firebase from 'firebase';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSignUp() {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("🚀 ~ file: Register.js ~ line 16 ~ onSignUp ~ result", result)
    } catch (err) {
      alert(err.message);
    }
    
  }

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder='name'
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
      <Button title='Sign Up' onPress={onSignUp} />
    </View>
  );
}
