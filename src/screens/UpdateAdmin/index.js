import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, StyleSheet, Modal, Alert} from 'react-native';
import {CustomButton, CustomHeader, Input, InputPass} from '../../components';
import {HOST} from '../../data/constants';

const UpdateAdmin = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [idAdmin, setIdAdmin] = useState();
  const [loading, setLoading] = useState(false);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      username: name,
      password: pass,
    }),
  };

  const checkInput = () => {
    if (!name && !pass && !passConfirm) {
      setError(true);
      setLoading(false);
      setErrorMessage('Nama, Kata Sandi, tidak boleh dikosongkan!');
    } else if (pass !== passConfirm) {
      setLoading(false);
      setError(true);
      setErrorMessage('Kata Sandi dan Masukan Ulang Kata Sandi harus sama!');
    } else if (pass.length < 6) {
      setLoading(false);
      setError(true);
      setErrorMessage('Panjang kata sandi setidaknya 6 karakter!');
    } else {
      fetch(`${HOST}/admin/update/${idAdmin}`, bodyData)
        .then(resJson => resJson.json())
        .then(res => {
          setLoading(false);
          if (res.status === 'success') {
            Alert.alert('Data berhasil diperbarui!');
            navigation.navigate('Home');
          } else {
            Alert.alert(res.message);
          }
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Terjadi kesalahan pada sistem!');
        });
    }
  };

  useEffect(() => {
    const id = route.params.data;
    setIdAdmin(id);
    fetch(`${HOST}/admin/detail/${id}`)
      .then(resJson => resJson.json())
      .then(res => {
        setName(res.admin.username);
      })
      .catch(() => Alert.alert('Gagal mendapatkan data!'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Update Admin'}
        onPress={() => navigation.goBack()}
      />
      {error ? <Text style={style.errorText}>{errorMessage}</Text> : null}
      <ScrollView style={style.scrollViewStyle}>
        <View style={style.formWrapper}>
          <Text style={style.label}>Nama</Text>
          <Input mb={20} onChangeText={item => setName(item)} value={name} />
          <Text style={style.label}>Kata Sandi</Text>
          <InputPass
            mb={15}
            onChangeText={item => setPass(item)}
            value={pass}
          />
          <Text style={style.label}>Masukan Ulang Kata Sandi</Text>
          <InputPass
            mb={15}
            onChangeText={item => setPassConfirm(item)}
            value={passConfirm}
          />
        </View>
        <CustomButton
          title={'Update'}
          navigation={() => {
            setLoading(true);
            checkInput();
          }}
        />
      </ScrollView>
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
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  formWrapper: {
    width: '100%',
    marginBottom: 50,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
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
  errorText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    marginTop: 30,
  },
});

export default UpdateAdmin;
