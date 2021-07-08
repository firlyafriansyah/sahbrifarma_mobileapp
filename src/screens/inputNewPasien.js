import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {CustomHeader, Input, InputSelect} from '../components';

let alergi = true;

const InputNewPasien = ({navigation}) => {
  const [alergiObat, setAlergiObat] = useState(false);

  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={'Input Pasien Baru'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.scrollViewStyle}>
        <View style={style.formWrapper}>
          <Text style={style.label}>Nama</Text>
          <Input mb={15} placeholder={'Nama Pasien'} />
          <Text style={style.label}>Alamat</Text>
          <Input mb={15} placeholder={'Alamat Pasien'} />
          <Text style={style.label}>Jenis Kelamin</Text>
          <InputSelect
            labelA={'Laki - laki'}
            labelB={'Perempuan'}
            mb={15}
            value={() => null}
          />
          <Text style={style.label}>Telephone</Text>
          <Input mb={15} keyboardType={'number-pad'} />
          <Text style={style.label}>Alergi Obat</Text>
          <InputSelect
            labelA={'Tidak'}
            labelB={'Ya'}
            mb={15}
            value={item => {
              setAlergiObat(item);
              alergi = alergiObat;
            }}
          />
          {alergiFunction()}
          <Text style={style.label}>Keluhan</Text>
          <Input mb={15} />
        </View>
      </ScrollView>
    </View>
  );
};

const alergiFunction = () => {
  if (!alergi) {
    return (
      <>
        <Text style={style.label}>Nama Obat</Text>
        <Input mb={15} />
      </>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
  },
  formWrapper: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default InputNewPasien;
