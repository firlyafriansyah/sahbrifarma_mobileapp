/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  DetailPasienScreen,
  HomeScreen,
  LoginScreen,
  InputNewPasienScreen,
  IdentitasPasienScreen,
  AlergiObatScreen,
  KeluhanPasienScreen,
  KeluhanByDateScreen,
  InputKeluhanScreen,
  HasilDokterByDateScreen,
  InputHasilDokterScreen,
  HasilDokterScreen,
  FotoObatByDateScreen,
  FotoObatScreen,
  AmbilFotoObatScreen,
} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeActivity"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail Pasien" component={DetailPasienScreen} />
          <Stack.Screen
            name="Input Pasien Baru"
            component={InputNewPasienScreen}
          />
          <Stack.Screen
            name="Identitas Pasien"
            component={IdentitasPasienScreen}
          />
          <Stack.Screen name="Alergi Obat" component={AlergiObatScreen} />
          <Stack.Screen name="Keluhan" component={KeluhanPasienScreen} />
          <Stack.Screen
            name="Keluhan By Date"
            component={KeluhanByDateScreen}
          />
          <Stack.Screen name={'Input Keluhan'} component={InputKeluhanScreen} />
          <Stack.Screen
            name={'Hasil Dokter By Date'}
            component={HasilDokterByDateScreen}
          />
          <Stack.Screen
            name={'Input Hasil Dokter'}
            component={InputHasilDokterScreen}
          />
          <Stack.Screen name={'Hasil Dokter'} component={HasilDokterScreen} />
          <Stack.Screen
            name={'Foto Obat By Date'}
            component={FotoObatByDateScreen}
          />
          <Stack.Screen name={'Foto Obat'} component={FotoObatScreen} />
          <Stack.Screen
            name={'Ambil Foto Obat'}
            component={AmbilFotoObatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
