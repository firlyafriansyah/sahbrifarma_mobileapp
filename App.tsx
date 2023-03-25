/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  // DetailPasienScreen,
  // HomeScreen,
  LoginScreen,
  ScannerScreen,
  // InputNewPasienScreen,
  // IdentitasPasienScreen,
  // AlergiObatScreen,
  // KeluhanScreen,
  // KeluhanByDateScreen,
  // InputKeluhanScreen,
  // HasilPeriksaByDateScreen,
  // InputHasilPeriksaScreen,
  // HasilPeriksaScreen,
  // FotoObatByDateScreen,
  // FotoObatScreen,
  // InputFotoObatScreen,
  // RiwayatBerobatScreen,
  // ManageAdminScreen,
  // RegisterAdminScreen,
  // UpdateAdminScreen,
  // LoginInformation,
} from './src/screens';
// import UnduhKartu from './src/screens/UnduhKartu';

const Stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeActivity"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} />
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
          <Stack.Screen name="Keluhan" component={KeluhanScreen} />
          <Stack.Screen
            name="Keluhan By Date"
            component={KeluhanByDateScreen}
          />
          <Stack.Screen name={'Input Keluhan'} component={InputKeluhanScreen} />
          <Stack.Screen
            name={'Hasil Periksa By Date'}
            component={HasilPeriksaByDateScreen}
          />
          <Stack.Screen
            name={'Input Hasil Periksa'}
            component={InputHasilPeriksaScreen}
          />
          <Stack.Screen name={'Hasil Periksa'} component={HasilPeriksaScreen} />
          <Stack.Screen
            name={'Foto Obat By Date'}
            component={FotoObatByDateScreen}
          />
          <Stack.Screen name={'Foto Obat'} component={FotoObatScreen} />
          <Stack.Screen
            name={'Input Foto Obat'}
            component={InputFotoObatScreen}
          />
          <Stack.Screen
            name={'Riwayat Berobat'}
            component={RiwayatBerobatScreen}
          />
          <Stack.Screen name={'Unduh Kartu'} component={UnduhKartu} />
          <Stack.Screen name={'Manage Admin'} component={ManageAdminScreen} />
          <Stack.Screen
            name={'Register Admin'}
            component={RegisterAdminScreen}
          />
          <Stack.Screen name={'Update Admin'} component={UpdateAdminScreen} />
          <Stack.Screen
            name={'Login Information'}
            component={LoginInformation}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
