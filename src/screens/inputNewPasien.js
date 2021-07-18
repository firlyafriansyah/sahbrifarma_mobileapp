import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {
  BubbleTag,
  CustomButton,
  CustomHeader,
  InputSelect,
  InputWithButton,
  Input,
} from '../components';
import {HOST} from '../data/constants';
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

const InputNewPasien = ({navigation}) => {
  const [alergiObat, setAlergiObat] = useState(false);
  const [namaObat, setNamaObat] = useState([]);
  const [keluhan, setKeluhan] = useState([]);
  const [namaPasien, setNamaPasien] = useState();
  const [alamatPasien, setAlamatPasien] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [kelaminPasien, setKelaminPasien] = useState('Laki - Laki');
  const [teleponPasien, setTeleponPasien] = useState();
  const [showDatePicker, setShowDatePicker] = useState();

  const showBubbleTag = (arrayState, setArrayState) => {
    if (arrayState.length) {
      return arrayState.map((item, index) => (
        <BubbleTag
          key={index}
          name={item}
          onPress={() => setArrayState(arrayState.filter(it => it !== item))}
        />
      ));
    }
  };

  const arrayToString = array => {
    let result = '';
    array.forEach(item => {
      result += `${item}, `;
    });
    return result;
  };

  const data = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      nama_pasien: namaPasien,
      alamat_pasien: alamatPasien,
      nomor_telepon_pasien: teleponPasien,
      tanggal_lahir_pasien: tanggalLahir,
      jenis_kelamin_pasien: kelaminPasien,
      foto: '',
      nama_obat: namaObat.length <= 0 ? null : arrayToString(namaObat),
      keluhan: arrayToString(keluhan),
    }),
  };

  const savePasien = () => {
    fetch(`${HOST}/pasien`, data)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          Alert.alert('Data pasien berhasil disimpan!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Terjadi kesalahan pada saat menyimpan!');
        }
      })
      .catch(() => Alert.alert('Terjadi kesalahan pada sistem!'));
  };

  const alergiFunction = () => {
    if (alergiObat) {
      return (
        <>
          <Text style={style.label}>Nama Obat</Text>
          <InputWithButton
            placeholder={'Nama Obat'}
            mb={5}
            onPress={item => setNamaObat(arr => [...arr, `${item}`])}
          />
          <View style={style.bubbleTag}>
            {showBubbleTag(namaObat, setNamaObat)}
          </View>
        </>
      );
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={'Input Pasien Baru'}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={style.scrollViewStyle}>
        <View style={style.formWrapper}>
          <Text style={style.label}>Nama</Text>
          <Input
            mb={15}
            placeholder={'Nama Pasien'}
            onChangeText={item => setNamaPasien(item)}
          />
          <Text style={style.label}>Alamat</Text>
          <Input
            mb={15}
            placeholder={'Alamat Pasien'}
            onChangeText={item => setAlamatPasien(item)}
          />
          <Text style={style.label}>Tanggal Lahir</Text>
          <TextInput
            style={style.inputStyle}
            placeholder={'Tanggal Lahir Pasien'}
            value={tanggalLahir ? tanggalLahir : ''}
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
            value={item => setKelaminPasien(item ? 'Perempuan' : 'Laki - Laki')}
            onChangeLabel={() => null}
          />
          <Text style={style.label}>Telepon</Text>
          <Input
            mb={15}
            keyboardType={'number-pad'}
            placeholder={'Nomor Telepon Pasien'}
            onChangeText={item => setTeleponPasien(item)}
          />
          <Text style={style.label}>Alergi Obat</Text>
          <InputSelect
            labelA={'Ya'}
            labelB={'Tidak'}
            mb={15}
            value={item => {
              setAlergiObat(item);
            }}
            onChangeLabel={() => setNamaObat([])}
          />
          {alergiFunction()}
          <Text style={style.label}>Keluhan</Text>
          <InputWithButton
            placeholder={'Keluhan Pasien'}
            mb={5}
            onPress={item => setKeluhan(arr => [...arr, `${item}`])}
          />
          <View style={style.bubbleTag}>
            {showBubbleTag(keluhan, setKeluhan)}
          </View>
          <CustomButton
            title="Simpan"
            mb={30}
            mt={15}
            navigation={() => {
              if (
                namaPasien &&
                alamatPasien &&
                teleponPasien &&
                keluhan &&
                tanggalLahir
              ) {
                savePasien();
              } else {
                Alert.alert('Mohon untuk melengkapi data pasien!');
              }
            }}
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
  bubbleTag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
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

export default InputNewPasien;
