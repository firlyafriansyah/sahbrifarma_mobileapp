import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, Image} from 'react-native';
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomButton, Input, InputPass} from '../../components';
import {HOST} from '../../data/constants';
import {storeDataAsyncStorage} from '../../data/asyncStorage';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkInput = () => {
    if (name === '' || pass === '') {
      setError(true);
      setErrorMessage('Nama dan Kata Sandi tidak boleh kosong!');
      setLoading(false);
    } else {
      fetch(`${HOST}/admin/login`, optionsRequest)
        .then(resJson => resJson.json())
        .then(res => {
          if (res.status === 'success') {
            storeDataAsyncStorage('admin', {
              adminName: res.data.username,
              adminRole: res.data.role,
            })
              .then(result => {
                if (res.status === 'success') {
                  navigation.navigate({name: 'Home'});
                  setPass('');
                  setName('');
                  setError(false);
                  setLoading(false);
                } else {
                  setError(true);
                  setErrorMessage(res.status);
                }
              })
              .catch(() => {
                setError(true);
                setErrorMessage(
                  'Async storage pada device tidak bisa digunakan!',
                );
              });
          } else {
            setError(true);
            setErrorMessage('Nama dan Kata Sandi salah. Periksa Kembali!');
            setLoading(false);
          }
        })
        .catch(() => {
          setError(true);
          setErrorMessage('Kesalahan pada sistem. Silahkan coba lagi!');
          setLoading(false);
        });
    }
  };

  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      password: pass,
    }),
  };

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Image
          source={require('../../../assets/images/header_img.png')}
          style={style.image}
        />
      </View>
      <Text style={style.heading}>Silahkan Masuk</Text>
      {error ? <Text style={style.errorText}>{errorMessage}</Text> : null}
      <View style={style.loginWrapper}>
        <Text style={style.label}>Nama</Text>
        <Input mb={20} onChangeText={item => setName(item)} value={name} />
        <Text style={style.label}>Kata Sandi</Text>
        <InputPass mb={15} onChangeText={item => setPass(item)} value={pass} />
      </View>
      <CustomButton
        title={'Masuk'}
        navigation={() => {
          setLoading(true);
          checkInput();
        }}
      />
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyle}>
          <View style={style.modalWrapper}>
            <FontAwesomeIcon icon={faWalking} size={25} sty />
            <Text style={style.textModal}>Mohon Tunggu!</Text>
          </View>
        </View>
      </Modal>
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
  wrapper: {
    marginBottom: 100,
  },
  heading: {
    fontSize: 28,
    color: '#2F3542',
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    marginTop: -30,
  },
  loginWrapper: {
    borderRadius: 26,
    backgroundColor: '#fff',
    elevation: 12,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginBottom: 55,
    marginTop: 30,
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
  errorText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapper: {
    width: '50%',
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: 'center',
  },
  textModal: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
