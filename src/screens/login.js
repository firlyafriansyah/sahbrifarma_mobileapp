import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const Login = () => {
  const [borderName, setBorderName] = useState('#A4B0BE80');
  const [borderPass, setBorderPass] = useState('#A4B0BE80');

  return (
    <View style={style.container}>
      <Text style={style.heading}>Silahkan Masuk</Text>
      <View style={style.loginWrapper}>
        <Text style={style.label}>Nama</Text>
        <TextInput
          style={[style.input, style.inputNama, {borderColor: borderName}]}
          onFocus={() => setBorderName('#2F3542')}
          onBlur={() => setBorderName('#A4B0BE80')}
        />
        <Text style={style.label}>Kata Sandi</Text>
        <TextInput
          style={[style.input, style.inputNama, {borderColor: borderPass}]}
          onFocus={() => setBorderPass('#2F3542')}
          onBlur={() => setBorderPass('#A4B0BE80')}
        />
      </View>
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
    fontSize: 24,
    color: '#2F3542',
    fontFamily: 'Poppins-Bold',
    marginBottom: 35,
  },
  loginWrapper: {
    flex: 0.4,
    borderRadius: 26,
    backgroundColor: '#fff',
    elevation: 12,
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
  },
  inputNama: {
    marginBottom: 20,
  },
});

export default Login;
