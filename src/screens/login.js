import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

import {Input, InputPass} from '../components';

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
      <TouchableHighlight
        onPress={() => navigation.navigate('Home')}
        style={style.touchable}>
        <View style={style.submitBtn}>
          <Text style={style.submitText}>Masuk</Text>
        </View>
      </TouchableHighlight>
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
