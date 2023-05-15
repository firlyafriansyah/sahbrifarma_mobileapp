/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, BackHandler, DevSettings} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {IsLogedInContext} from './src/context/AuthContext';
import {
  AdministrationProfileScreen,
  AdministrationProfileUpdateScreen,
  LoginScreen,
  SplashScreen,
} from './src/screens';
import {AutoLogin, DatabaseCheck} from './src/services';
import {getDataAsyncStorage} from './src/utils/AsyncStorage';

const Stack = createStackNavigator();

const App = () => {
  const [loggedInRole, setLoggedInRole] = React.useState('');
  const [loggedInToken, setLoggedInToken] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const isLoggedInValue = React.useMemo(
    () => ({
      loggedInRole,
      setLoggedInRole,
      loggedInToken,
      setLoggedInToken,
    }),
    [loggedInRole, loggedInToken],
  );

  React.useEffect(() => {
    setIsLoading(true);
    DatabaseCheck.then(() => {
      getDataAsyncStorage('@loggedUser').then(res => {
        if (res) {
          AutoLogin(res.loggedInToken.split('~')[0])
            .then(() => {
              setLoggedInRole(res.loggedInRole);
              setLoggedInToken(res.loggedInToken);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      });
    }).catch((err: string) => {
      Alert.alert('Error!', err, [
        {
          text: 'Close',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {
          text: 'Try Again',
          onPress: () => DevSettings.reload(),
        },
      ]);
    });
  }, []);

  return (
    <IsLogedInContext.Provider value={isLoggedInValue}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isLoading ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
          ) : loggedInRole === 'frontdesk' ? (
            <Stack.Navigator
              initialRouteName="AdministrationProfile"
              screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="AdministrationProfile"
                component={AdministrationProfileScreen}
              />
              <Stack.Screen
                name="AdministrationProfileUpdate"
                component={AdministrationProfileUpdateScreen}
              />
              {/* <Stack.Screen name="PatientCardScanner" component={PatientCardScanner} /> */}
              {/* <Stack.Screen name="PatientDashboard" component={PatientDashboard} /> */}
              {/* <Stack.Screen name="EditPatientInformation" component={EditPatientInformationScreen} /> */}
            </Stack.Navigator>
          ) : loggedInRole === 'nurse' ? (
            <Stack.Navigator
              initialRouteName="AdministrationProfile"
              screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="AdministrationProfileScreen"
                component={AdministrationProfileScreen}
              />
              <Stack.Screen
                name="AdministrationProfileUpdate"
                component={AdministrationProfileUpdateScreen}
              />
              {/* <Stack.Screen name="PatientQueue" component={PatientQueueScreen} /> */}
              {/* <Stack.Screen name="MedicalTestHistory" component={MedicalTestHistoryScreen} /> */}
              {/* <Stack.Screen name="InputMedicalTest" component={InputMedicalTestScreen} /> */}
              {/* <Stack.Screen name="MedicalTestResult" component={MedicalTestResultScreen} /> */}
            </Stack.Navigator>
          ) : loggedInRole === 'doctor' ? (
            <Stack.Navigator
              initialRouteName="AdministrationProfile"
              screenOptions={{headerShown: false}}>
              {/* <Stack.Screen name="AdministrationProfile" component={AdminstrationProfileScreen} /> */}
              {/* <Stack.Screen name="PatientQueue" component={PatientQueueScreen} /> */}
              {/* <Stack.Screen name="DoctoralConsultationHistory" component={DoctoralConsultationHistoryScreen} /> */}
              {/* <Stack.Screen name="InputDoctoralConsultation" component={InputDoctoralConsultationScreen} /> */}
              {/* <Stack.Screen name="DoctoralConsultationResult" component={DoctoralConsultationResultScreen} /> */}
              {/* <Stack.Screen name="InputMedicine" component={InputMedicineScreen} /> */}
              {/* <Stack.Screen name="MedicineResult" component={MedicineResultScreen} /> */}
            </Stack.Navigator>
          ) : loggedInRole === 'pharmacist' ? (
            <Stack.Navigator
              initialRouteName="AdministrationProfile"
              screenOptions={{headerShown: false}}>
              {/* <Stack.Screen name="AdministrationProfile" component={AdminstrationProfileScreen} /> */}
              {/* <Stack.Screen name="PatientQueue" component={PatientQueueScreen} /> */}
              {/* <Stack.Screen name="MedicineRequested" component={MedicineRequestedScreen} /> */}
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </IsLogedInContext.Provider>
  );
};

export default App;
