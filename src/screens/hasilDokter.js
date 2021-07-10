import React from 'react';
import {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {CustomButton, CustomHeader, Input} from '../components';

const HasilDokter = ({navigation}) => {
  const [editable, setEditable] = useState(false);
  return (
    <View style={style.container}>
      <CustomHeader
        title={'Hasil Cek Dokter'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={style.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.wrapper}>
          <Text style={style.label}>Tensi</Text>
          <Input mb={15} placeholder={'Tensi Pasien'} editable={editable} />
          <Text style={style.label}>Gula Darah</Text>
          <Input
            mb={15}
            placeholder={'Gula Darah Pasien'}
            editable={editable}
          />
          <Text style={style.label}>Asam Urat</Text>
          <Input mb={15} placeholder={'Asam Urat Pasien'} editable={editable} />
          <Text style={style.label}>Kolestrol</Text>
          <Input mb={15} placeholder={'Kolestrol Pasien'} editable={editable} />
          <CustomButton
            title={editable ? 'Simpan' : 'Ubah'}
            mt={60}
            mb={60}
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
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
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

export default HasilDokter;
