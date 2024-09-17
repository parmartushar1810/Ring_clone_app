import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
// import { Dimensions } from 'react-native';
// const SCREEN_WIDTH = Dimensions.get('screen').width; 
// const SCREEN_HEIGHT = Dimensions.get('screen').height;

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { captureType } = route.params; // Get captureType from route parameters

  const captureImage = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const handleRetake = () => {
    setImage(null);
  };

  const handleContinue = () => {
    if (image) {
      navigation.navigate('KYCDocuments', { image, captureType });
    } else {
      alert(`Please capture the ${captureType.toLowerCase()} photo of your Aadhaar card`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Align your Aadhaar card within the box and take a photo of the {captureType.toLowerCase()} without reflections.
      </Text>

      <View style={styles.captureBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imageSample} />
        ) : (
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        )}
      </View>

      {!image ? (
        <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
          <Image
            source={require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/download.png')}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 17,
  },
  captureBox: {
    width: '124%',
    height: '70%',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: '90%',
    height:'60%'
  },
  imageSample: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  captureButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  cameraIcon: {
    width: 70,
    height: 70,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',

  },
  actionButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
   
  },
});

export default CameraScreen;



