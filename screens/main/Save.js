import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import firebase from 'firebase';

require("firebase/firestore");
require("firebase/firebase-storage");


export default function Save(props) {
  const [caption, setCaption] = useState("");
  const { navigation, route } = props;
  const { image } = route.params;

  function savePost(downloadUrl){
    firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid).collection("userPosts").add({
      downloadUrl,
      caption,
      creationDate: new Date().toISOString()
    }).then(()=>{
      navigation.popToTop()
    })
  }

  async function uploadImage() {
    const uri = image;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = (snapshot) => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot);
        savePost(snapshot);
      });

    };

    const taskError = snapshot => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);

  }
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Write a Caption...."
        onChangeText={(text) => setCaption(text)}
        value={caption}
      />
      <Button
        title="Save"
        onPress={uploadImage}
      />
    </View>
  );
}
