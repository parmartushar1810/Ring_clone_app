import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  
  useEffect(() => {
    fetch('https://user-gateway.test.ideopay.in/api/v1/onload/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);


        const timeout = setTimeout(() => {
          navigation.navigate('MobileForm');
        }, 3000);
        return () => clearTimeout(timeout);
      })
      .catch(error => {
        console.error('Error fetching splash screen data:', error);
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/SplashScreen.png')}
        style={styles.image} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E66EC',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
