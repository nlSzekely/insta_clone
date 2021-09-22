import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasPermissionGallery, setHasPermissionGallery] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermissionGallery(granted);
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  if (!hasPermission || !hasPermissionGallery) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex:1}}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
        />
      </View>
      {image && 
      <View style={{flex:0.5,padding:20}}>
      <Image source={{uri:image}}  resizeMode='contain' style={{flex:1}}/>

          </View>
      }
      <Button
        title='Flip Image'
        style={styles.button}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title='Take picture' onPress={takePicture} />
      <Button title='Pick Image From Gallery' onPress={pickImage} />
      <Button title='Save' onPress={()=> navigation.navigate("Save",{image})} />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
