import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const MobileForm = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^\d]/g, '').slice(0, 10);
    setPhoneNumber(formattedText);
    console.log("Phone Number: ", formattedText); // Debugging message

    // Track the event of phone number input

    // appsflyerMp('Phone_Number_Input', { phoneNumber: formattedText });
  };
  const handleVerifyPress = () => {
    if (phoneNumber.length === 10) {
      // Track the verification button press event
      // appsflyerMp('Phone_Verification_Initiated', { phoneNumber: `+91${phoneNumber}` });

      navigation.navigate('OTPScreen', { phoneNumber: `+91${phoneNumber}` });
    } else {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");


      // Track an event for invalid phone number input
      // appsflyerMp('Invalid_Phone_Number', { phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image 
          source={require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/Conversation-rafiki.png')}
          style={styles.imageContainer}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Enter Your Phone Number</Text>
          <Text style={styles.subText}>We Will Send You A Verification Code</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            maxLength={10}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyPress}>
          <Text style={styles.buttonText}>VERIFY</Text>

        </TouchableOpacity>
      </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: { 
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 30,
  },
  prefix: {
    padding: 15,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#407BFF',
    paddingVertical: 13,
    paddingHorizontal: 130,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  }
});

export default MobileForm;
