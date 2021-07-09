import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomButton, Input, InputPass} from '../components';

const Login = ({navigation}) => {
  return (
    <View style={style.container}>
      <Text style={style.heading}>Silahkan Masuk</Text>
      <View style={style.loginWrapper}>
        <Text style={style.label}>Nama</Text>
        <Input mb={20} />
        <Text style={style.label}>Kata Sandi</Text>
        <InputPass mb={15} />
      </View>
      <CustomButton
        title={'Masuk'}
        navigation={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 23,
  },
  heading: {
    fontSize: 28,
    color: '#2F3542',
    fontFamily: 'Poppins-Bold',
    marginBottom: 35,
    marginTop: -30,
  },
  loginWrapper: {
    borderRadius: 26,
    backgroundColor: '#fff',
    elevation: 12,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginBottom: 55,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 6,
  },
  submitBtn: {
    paddingVertical: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5352ED',
    borderRadius: 26,
    elevation: 12,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  touchable: {borderRadius: 26},
});

export default Login;
