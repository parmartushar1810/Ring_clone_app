import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation

const Personaldetails = () => {
  const navigation = useNavigation(); // Get navigation prop

  // State for input fields and error messages
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = useCallback(() => {
    const errors = {};
    
    if (!firstName) errors.firstName = 'First name is required.';
    if (!lastName) errors.lastName = 'Last name is required.';
    if (!fatherName) errors.fatherName = 'Father\'s name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!dob) errors.dob = 'Date of birth is required.';
    if (!gender) errors.gender = 'Gender is required.';
    if (!maritalStatus) errors.maritalStatus = 'Marital status is required.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setFieldErrors({}); // Clear field errors

    // Navigate to the KYCDocuments screen
    navigation.navigate('KYCDocuments', {
      firstName,
      lastName,
      fatherName,
      email,
      dob,
      gender,
      maritalStatus,
    });
  }, [firstName, lastName, fatherName, email, dob, gender, maritalStatus, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, fieldErrors.firstName ? styles.inputError : null]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          placeholderTextColor="gray"
        />
        {fieldErrors.firstName && <Text style={styles.fieldError}>{fieldErrors.firstName}</Text>}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, fieldErrors.lastName ? styles.inputError : null]}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          placeholderTextColor="gray"
        />
        {fieldErrors.lastName && <Text style={styles.fieldError}>{fieldErrors.lastName}</Text>}

        <Text style={styles.label}>Father's Name</Text>
        <TextInput
          style={[styles.input, fieldErrors.fatherName ? styles.inputError : null]}
          value={fatherName}
          onChangeText={setFatherName}
          placeholder="Enter your father's name"
          placeholderTextColor="gray"
        />
        {fieldErrors.fatherName && <Text style={styles.fieldError}>{fieldErrors.fatherName}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, fieldErrors.email ? styles.inputError : null]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="gray"
          keyboardType="email-address"
        />
        {fieldErrors.email && <Text style={styles.fieldError}>{fieldErrors.email}</Text>}

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={[styles.input, fieldErrors.dob ? styles.inputError : null]}
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="gray"
        />
        {fieldErrors.dob && <Text style={styles.fieldError}>{fieldErrors.dob}</Text>}

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setGender('male')} style={styles.radioButton}>
            <View style={styles.radio}>
              {gender === 'male' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={styles.radioButton}>
            <View style={styles.radio}>
              {gender === 'female' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>
        {fieldErrors.gender && <Text style={styles.fieldError}>{fieldErrors.gender}</Text>}

        <Text style={styles.label}>Marital Status</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setMaritalStatus('single')} style={styles.radioButton}>
            <View style={styles.radio}>
              {maritalStatus === 'single' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Single</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMaritalStatus('married')} style={styles.radioButton}>
            <View style={styles.radio}>
              {maritalStatus === 'married' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Married</Text>
          </TouchableOpacity>
        </View>
        {fieldErrors.maritalStatus && <Text style={styles.fieldError}>{fieldErrors.maritalStatus}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    color: 'black',
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },
  inputError: {
    borderColor: 'red',
  },
  fieldError: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#eaeaea',
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3b5998',
  },
  radioText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#407BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Personaldetails;
