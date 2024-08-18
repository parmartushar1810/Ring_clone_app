import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false); // Loader state
  const inputs = useRef([]);

  // Handle OTP change and automatically verify if OTP is complete and correct
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    const isAdding = text.length > 0;
    newOtp[index] = text.slice(-1); // Store only the last entered digit
    setOtp(newOtp);

    if (isAdding && index < 5) {
      inputs.current[index + 1].focus(); // Move to the next input if adding a character
    } else if (!isAdding && index > 0) {
      inputs.current[index - 1].focus(); // Move to the previous input if deleting a character
    }

    const otpValue = newOtp.join('');
    if (otpValue.length === 6 && otpValue === '888888') {
      handleVerifyPress(otpValue); // Automatically verify OTP if it's correct
    }
  };

  // Verify OTP and handle navigation
  const handleVerifyPress = async (otpValue) => {
    setLoading(true); // Show loader while verifying OTP

    try {
      if (otpValue === '888888') { // Predefined correct OTP for development
        setLoading(false); // Hide loader after successful verification
        navigation.navigate('Personaldetails');
      } else {
        const response = await fetch('https://user-gateway.test.ideopay.in/api/v1/users/android/authentication', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: otpValue,
          }),
        });

        const result = await response.json();
        setLoading(false); // Hide loader after receiving response

        if (response.ok && result.status === 'success') {
          navigation.navigate('Personaldetails');
        } else {
          Alert.alert('Verification Failed', result.message || 'Invalid OTP');
        }
      }
    } catch (error) {
      setLoading(false); // Hide loader on error
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying the OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        <Image 
          source={require('/home/tushar/Desktop/sample/newprj/comPonents/Assets/Verified-rafiki.png')}
          style={styles.imageContainer}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Enter Verification Code</Text>
          <Text style={styles.subText}>We are automatically detecting an SMS sent to your mobile phone number</Text>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => handleOtpChange(text, index)}
              ref={(input) => { inputs.current[index] = input; }}
              maxLength={1} // Restrict input to 1 digit per field
            />
          ))}
        </View>
        {/* Show loader on button when OTP is being verified */}
        <TouchableOpacity style={styles.button} onPress={() => handleVerifyPress(otp.join(''))} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="large" /> : <Text style={styles.buttonText}>Proceed</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  textContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    marginBottom: 30,
  },
  otpInput: {
    width: 47,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginHorizontal: 1,
  },
  button: {
    backgroundColor: '#407BFF',
    paddingVertical: 13,
    paddingHorizontal: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
