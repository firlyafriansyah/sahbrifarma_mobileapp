import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {CustomHeader, Input} from '../../components';
import {getDataAsyncStorage} from '../../data/asyncStorage';

const LoginInformation = ({navigation}) => {
  const [admin, setAdmin] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    getDataAsyncStorage('admin')
      .then(res => {
        setAdmin(res.adminName);
        switch (res.adminRole) {
          case 0:
            setRole('Super Admin');
            break;
          case 1:
            setRole('Admin / Frontdesk Staff');
            break;
          case 2:
            setRole('Perawat');
            break;
          case 3:
            setRole('Apoteker');
            break;
          default:
            break;
        }
      })
      .catch(() => {
        Alert.alert('Gagal menarik data dari async storage');
      });
  }, []);

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Login Information'}
        onPress={() => navigation.goBack()}
      />
      <View style={style.wrapper}>
        <Text style={style.label}>Nama</Text>
        <Input mb={20} value={admin} />
        <Text style={style.label}>Tipe User</Text>
        <Input mb={20} value={role} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default LoginInformation;
