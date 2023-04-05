/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Alert, DevSettings} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {IsLogedInContext} from './src/context/AuthContext';
import {
  HomeScreen,
  ListKonsultasiScreen,
  ListPeriksaScreen,
  LoginScreen,
  ScannerScreen,
  SplashScreen,
} from './src/screens';
import {DatabaseCheck} from './src/services';
import {getDataAsyncStorage} from './src/utils/AsyncStorage';

const Stack = createStackNavigator();

const App = () => {
  const [loggedInUsername, setLoggedInUsername] = React.useState('');
  const [loggedInRole, setLoggedInRole] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const isLoggedInValue = React.useMemo(
    () => ({
      loggedInUsername,
      setLoggedInUsername,
      loggedInRole,
      setLoggedInRole,
    }),
    [loggedInUsername, loggedInRole],
  );

  React.useEffect(() => {
    setIsLoading(true);
    DatabaseCheck.then(() => {
      getDataAsyncStorage('@loggedUser')
        .then(res => {
          if (res) {
            setLoggedInUsername(res.loggedUsername);
            setLoggedInRole(res.loggedRole);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }).catch((err: string) => {
      Alert.alert('Error!', err, [
        {
          text: 'Close',
          onPress: () => null,
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
          {/* {isLoading ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
          ) : loggedInUsername === '' ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          ) : loggedInRole === 0 ? ( */}
          <Stack.Navigator
            initialRouteName="ListKonsultasi"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="ListPeriksa" component={ListPeriksaScreen} />
            <Stack.Screen
              name="ListKonsultasi"
              component={ListKonsultasiScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
          {/* ) : (
            <Stack.Navigator
              initialRouteName="Scanner"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Scanner" component={ScannerScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          )} */}
        </NavigationContainer>
      </SafeAreaProvider>
    </IsLogedInContext.Provider>
  );
};

export default App;
