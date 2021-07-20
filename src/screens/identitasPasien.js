import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import {CustomButton, CustomHeader, Input, InputSelect} from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';

const Month = e => {
  switch (e) {
    case 0:
      return 'Januari';
    case 1:
      return 'Februari';
    case 2:
      return 'Maret';
    case 3:
      return 'April';
    case 4:
      return 'Mei';
    case 5:
      return 'Juni';
    case 6:
      return 'Juli';
    case 7:
      return 'Agustus';
    case 8:
      return 'September';
    case 9:
      return 'Oktober';
    case 10:
      return 'November';
    case 11:
      return 'Desember';
    default:
      break;
  }
};

const IdentitasPasien = ({navigation, route}) => {
  const [editable, setEditable] = useState(false);
  const [idPasien, setIdPasien] = useState();
  const [namaPasien, setNamaPasien] = useState();
  const [alamatPasien, setAlamatPasien] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [kelaminPasien, setKelaminPasien] = useState();
  const [teleponPasien, setTeleponPasien] = useState();
  const [showDatePicker, setShowDatePicker] = useState();

  useEffect(() => {
    const data = route.params?.data;
    setNamaPasien(data.nama_pasien);
    setIdPasien(data.id_pasien);
    setAlamatPasien(data.alamat_pasien);
    setTanggalLahir(data.tanggal_lahir_pasien);
    setKelaminPasien(data.jenis_kelamin_pasien);
    setTeleponPasien(data.nomor_telepon_pasien);
    return;
  }, [route.params?.data]);

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
          <Input
            mb={15}
            placeholder={'ID Pasien'}
            editable={false}
            value={idPasien}
          />
          <Text style={style.label}>Nama</Text>
          <Input
            mb={15}
            placeholder={'Nama Pasien'}
            onChangeText={item => setNamaPasien(item)}
            value={namaPasien}
            editable={editable}
          />
          <Text style={style.label}>Alamat</Text>
          <Input
            mb={15}
            placeholder={'Alamat Pasien'}
            value={alamatPasien}
            editable={editable}
            onChangeText={item => setAlamatPasien(item)}
          />
          <Text style={style.label}>Tanggal Lahir</Text>
          <TextInput
            style={style.inputStyle}
            placeholder={'Tanggal Lahir Pasien'}
            value={tanggalLahir ? tanggalLahir : ''}
            editable={editable}
            onFocus={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={e => {
                const Date = e.nativeEvent.timestamp;
                if (Date !== undefined) {
                  setTanggalLahir(
                    `${Date.getDate()} ${Month(
                      Date.getMonth(),
                    )} ${Date.getFullYear()}`,
                  );
                  setShowDatePicker(false);
                }
              }}
            />
          )}
          <Text style={style.label}>Jenis Kelamin</Text>
          <InputSelect
            labelA={'Laki - laki'}
            labelB={'Perempuan'}
            mb={15}
            editable={editable}
            valueChange={item =>
              setKelaminPasien(item ? 'Perempuan' : 'Laki - Laki')
            }
            default={kelaminPasien}
            value={item => setKelaminPasien(item ? 'Perempuan' : 'Laki - Laki')}
            onChangeLabel={() => null}
          />
          <Text style={style.label}>Telepon</Text>
          <Input
            mb={15}
            keyboardType={'number-pad'}
            placeholder={'Nomor Telepon Pasien'}
            value={teleponPasien}
            editable={editable}
            onChangeText={item => setTeleponPasien(item)}
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
  inputStyle: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#A4B0BE80',
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
    marginBottom: 15,
  },
});

export default IdentitasPasien;
