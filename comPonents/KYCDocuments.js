import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const KYCDocuments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [panFront, setPanFront] = useState(null);
  const [aadhaarFrontClicked, setAadhaarFrontClicked] = useState(false);
  const [aadhaarBackClicked, setAadhaarBackClicked] = useState(false);
  const [panFrontClicked, setPanFrontClicked] = useState(false);

  useEffect(() => {
    if (route.params?.image) {
      switch (route.params.captureType) {
        case 'Front':
          setAadhaarFront(route.params.image);
          setAadhaarFrontClicked(true);
          break;
        case 'Back':
          setAadhaarBack(route.params.image);
          setAadhaarBackClicked(true);
          break;
        case 'PANFront':
          setPanFront(route.params.image);
          setPanFrontClicked(true);
          break;
      }
    }
  }, [route.params?.image]);

  const handleCapture = (captureType) => {
    navigation.navigate('CameraScreen', { captureType });
  };

  const handleContinue = () => {
    navigation.navigate('VerificationComplete');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.boxContainer} onPress={() => handleCapture('Front')}>
          <Image 
            source={aadhaarFront ? { uri: aadhaarFront } : require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/front.png')}
            style={styles.imageContainer}
          /> 
          <Text style={[styles.text, aadhaarFrontClicked ? { color: 'green' } : { color: '#407BFF' }]}>Front</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxContainer} onPress={() => handleCapture('Back')}>
          <Image 
            source={aadhaarBack ? { uri: aadhaarBack } : require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/back.png')}
            style={styles.imageContainer}
          />
          <Text style={[styles.text, aadhaarBackClicked ? { color: 'green' } : { color: '#407BFF' }]}>Back</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.panBoxContainer} onPress={() => handleCapture('PANFront')}>
        <Image 
          source={panFront ? { uri: panFront } : require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/PAN.png')}
          style={styles.panImageContainer}
        />
        <Text style={[styles.text, panFrontClicked ? { color: 'green' } : { color: '#407BFF' }]}>PAN</Text>
      </TouchableOpacity>

      {(aadhaarFront && aadhaarBack && panFront) && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f5f5', 
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    elevation: 5,
    height: 180,
    marginHorizontal: 5,
    marginBottom:10
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  panBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    elevation: 5,
    height: 220,
    width: '60%',
    alignSelf: 'center',
    marginBottom:200
  },
  panImageContainer: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 13,
    paddingHorizontal: 100,
  borderRadius: 35,
    alignItems: 'center',
    alignSelf: 'center',
   marginBottom:20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default KYCDocuments;








