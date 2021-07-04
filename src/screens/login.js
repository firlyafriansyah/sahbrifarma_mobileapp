import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Login = ({navigation}) => {
  const [borderName, setBorderName] = useState('#A4B0BE80');
  const [borderPass, setBorderPass] = useState('#A4B0BE80');
  const [hide, setHide] = useState(true);

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
        <View style={[style.inputPassWrapper, {borderColor: borderPass}]}>
          <TextInput
            secureTextEntry={hide}
            autoCorrect={false}
            style={[style.inputPass, {flex: 1}]}
            onFocus={() => setBorderPass('#2F3542')}
            onBlur={() => setBorderPass('#A4B0BE80')}
          />
          <FontAwesomeIcon
            icon={hide ? faEyeSlash : faEye}
            size={22}
            onPress={() => setHide(!hide)}
          />
        </View>
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
    fontSize: 24,
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
  inputPassWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
  },
  inputPass: {
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
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
  showPass: {flexDirection: 'row', alignItems: 'center', marginLeft: 5},
  showPassText: {marginLeft: 10, fontSize: 15, fontFamily: 'Poppins-Reguler'},
});

export default Login;
