import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashScreen from './comPonents/splashScreen';
import MobileForm from './comPonents/MobileForm';
import OTPScreen from './comPonents/OTPScreen';
import Personaldetails from './comPonents/Personaldetails';
import KYCDocuments from './comPonents/KYCDocuments';
import CameraScreen from './comPonents/CameraScreen';
import VerificationComplete from './comPonents/VerificationComplete';
 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
      <Stack.Screen name="splashScreen" component={splashScreen}/>
        <Stack.Screen name="MobileForm" component={MobileForm}/>
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown:true}} />
          <Stack.Screen name="Personaldetails" component={Personaldetails} options={{ headerShown:true}} />
         <Stack.Screen name="KYCDocuments" component={KYCDocuments} options={{headerShown:true}}/> 
          <Stack.Screen name="CameraScreen" component={CameraScreen}options={{headerShown:true}}/>
           <Stack.Screen name="VerificationComplete" component={VerificationComplete} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;


