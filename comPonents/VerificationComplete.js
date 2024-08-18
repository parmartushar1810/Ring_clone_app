import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const VerificationComplete = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/Verified-rafiki.png')} 
        style={styles.image}
      />
      <Text style={[styles.text, { marginTop: -70}]}>Your Aadhaar and PAN are fully verified!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the whole screen
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    backgroundColor: '#f5f5f5', // Light grey background color
  },
  image: {
    width: '80%', // Image takes 80% of the container's width
    height: '50%', // Image takes 50% of the container's height
    marginBottom: 15, // Adjust the space between the image and text
    resizeMode: 'contain', // Ensures the image scales properly
  },
  text: {
    fontSize: 24, // Large font size for the text
    color: 'green', // Green color for the text
    textAlign: 'center', // Centers the text
    
  },
});

export default VerificationComplete;
