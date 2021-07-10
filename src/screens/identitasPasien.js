import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import {CustomButton, CustomHeader, Input, InputSelect} from '../components';

const IdentitasPasien = ({navigation}) => {
  const [editable, setEditable] = useState(false);

  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={'Identitas Pasien'}
      />
      <Image
        source={require('../../assets/images/qr_sample.png')}
        width={150}
        style={style.qrCodeStyle}
      />
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View style={style.formWrapper}>
          <Text style={style.label}>ID Pasien</Text>
          <Input mb={15} placeholder={'ID Pasien'} editable={false} />
          <Text style={style.label}>Nama</Text>
          <Input mb={15} placeholder={'Nama Pasien'} editable={editable} />
          <Text style={style.label}>Alamat</Text>
          <Input mb={15} placeholder={'Alamat Pasien'} editable={editable} />
          <Text style={style.label}>Jenis Kelamin</Text>
          <InputSelect
            editable={editable}
            labelA={'Laki - laki'}
            labelB={'Perempuan'}
            mb={15}
            value={() => null}
            onChangeLabel={() => null}
          />
          <Text style={style.label}>Telepon</Text>
          <Input
            editable={editable}
            mb={15}
            keyboardType={'number-pad'}
            placeholder={'Nomor Telepon Pasien'}
          />
          <CustomButton
            title={editable ? 'Simpan' : 'Ubah'}
            mb={60}
            mt={30}
            navigation={() => setEditable(!editable)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  qrCodeStyle: {
    marginTop: 40,
    marginBottom: 40,
  },
  scrollViewStyle: {
    width: '100%',
  },
  formWrapper: {
    width: '100%',
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default IdentitasPasien;
