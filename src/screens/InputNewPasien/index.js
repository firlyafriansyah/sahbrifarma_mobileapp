/* eslint-disable radix */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  BubbleTag,
  CustomButton,
  CustomHeader,
  InputSelect,
  InputWithButton,
  Input,
} from '../../components';
import {HOST} from '../../data/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import {faCalendar, faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CommonActions} from '@react-navigation/routers';
import {getDataAsyncStorage} from '../../data/asyncStorage';

const InputNewPasien = ({navigation, route}) => {
  const monthBirth = useRef(null);
  const yearBirth = useRef(null);
  const [alergiObat, setAlergiObat] = useState(false);
  const [namaObat, setNamaObat] = useState([]);
  const [keluhan, setKeluhan] = useState([]);
  const [namaPasien, setNamaPasien] = useState();
  const [alamatPasien, setAlamatPasien] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [bulanLahir, setBulanLahir] = useState();
  const [tahunLahir, setTahunLahir] = useState();
  const [date, setDate] = useState(new Date());
  const [kelaminPasien, setKelaminPasien] = useState('Laki - Laki');
  const [teleponPasien, setTeleponPasien] = useState();
  const [showDatePicker, setShowDatePicker] = useState();
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataAsyncStorage('admin')
      .then(res => {
        setAdmin(res.adminName);
      })
      .catch(() => {
        Alert('Terjadi kegagalan mengambil data dari Async Storage!');
      });
  }, []);

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
      tanggal_lahir_pasien: `${tanggalLahir}/${bulanLahir}/${tahunLahir}`,
      jenis_kelamin_pasien: kelaminPasien,
      foto: '',
      nama_obat: namaObat.length <= 0 ? null : arrayToString(namaObat),
      keluhan: keluhan.length <= 0 ? null : arrayToString(keluhan),
      admin: admin,
    }),
  };

  const savePasien = () => {
    setLoading(true);
    fetch(`${HOST}/pasien`, data)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Berhasil!', 'Data pasien berhasil disimpan!', [
            {
              text: 'Oke',
              onPress: () => {
                const resetAction = CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Home'}],
                });
                navigation.dispatch(resetAction);
              },
            },
          ]);
        } else {
          setLoading(false);
          Alert.alert('Terjadi kesalahan pada saat menyimpan!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
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
          <View style={style.wrapper}>
            <View style={style.wrapperInput}>
              <TextInput
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'DD'}
                onChangeText={text => {
                  setTanggalLahir(text);
                  if (parseInt(text) > 31) {
                    setTanggalLahir('31');
                  } else {
                    setTanggalLahir(text);
                  }
                  if (text.length === 2) {
                    monthBirth.current.focus();
                  }
                }}
                value={tanggalLahir}
                maxLength={2}
                selectTextOnFocus={true}
              />
              <Text style={style.slash}>/</Text>
              <TextInput
                ref={monthBirth}
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'MM'}
                selectTextOnFocus={true}
                onChangeText={text => {
                  setBulanLahir(text);
                  if (parseInt(text) > 12) {
                    setBulanLahir('12');
                  } else {
                    setBulanLahir(text);
                  }
                  if (text.length === 2) {
                    yearBirth.current.focus();
                  }
                }}
                value={bulanLahir}
                maxLength={2}
              />
              <Text style={style.slashdua}>/</Text>
              <TextInput
                ref={yearBirth}
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'YYYY'}
                onChangeText={text => setTahunLahir(text)}
                selectTextOnFocus={true}
                value={tahunLahir}
                maxLength={4}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
              <FontAwesomeIcon
                icon={faCalendar}
                size={20}
                style={style.iconStyle}
              />
            </TouchableWithoutFeedback>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={e => {
                setShowDatePicker(false);
                const Date = e.nativeEvent.timestamp;
                if (Date !== undefined) {
                  setTanggalLahir(
                    `${Date.getDate()}`.length === 1
                      ? `0${Date.getDate()}`
                      : `${Date.getDate()}`,
                  );
                  setBulanLahir(
                    `${Date.getMonth()}`.length === 1
                      ? `0${Date.getMonth()}`
                      : `${Date.getMonth()}`,
                  );
                  setTahunLahir(`${Date.getFullYear()}`);
                  setDate(Date);
                  setShowDatePicker(false);
                }
              }}
            />
          )}
          <Text style={style.label}>Jenis Kelamin</Text>
          <InputSelect
            labelA={'Laki - Laki'}
            labelB={'Perempuan'}
            mb={15}
            default={kelaminPasien}
            value={item => {
              setKelaminPasien(item);
            }}
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
            value={() => {
              setAlergiObat(!alergiObat);
            }}
            onChangeLabel={() => setNamaObat([])}
          />
          {!alergiObat || (
            <>
              <Text style={style.label}>Nama Obat</Text>
              <InputWithButton
                placeholder={'Nama Obat'}
                mb={5}
                onPress={item => setNamaObat(arr => [...arr, `${item}`])}
              />
              <Text style={style.textCoution}>
                Klik tanda + untuk menambahkan.
              </Text>
              <View style={style.bubbleTag}>
                {showBubbleTag(namaObat, setNamaObat)}
              </View>
            </>
          )}
          <Text style={style.label}>Keluhan</Text>
          <InputWithButton
            placeholder={'Keluhan Pasien'}
            mb={5}
            onPress={item => setKeluhan(arr => [...arr, `${item}`])}
          />
          <Text style={style.textCoution}>Klik tanda + untuk menambahkan.</Text>
          <View style={style.bubbleTag}>
            {showBubbleTag(keluhan, setKeluhan)}
          </View>
          <CustomButton
            title="Simpan"
            mb={30}
            mt={15}
            navigation={() => {
              if (namaPasien && alamatPasien && tanggalLahir) {
                savePasien();
              } else {
                Alert.alert('Mohon untuk melengkapi data pasien!');
              }
            }}
          />
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
  },
  formWrapper: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
  },
  textCoution: {
    color: '#00000080',
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
  wrapper: {
    borderWidth: 1,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 15,
    borderColor: '#A4B0BE80',
  },
  wrapperInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A4B0BE80',
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
    flex: 0.2,
    textAlign: 'center',
    color: '#000000',
    width: 2,
  },
  iconStyle: {
    color: '#2F3542',
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
  slash: {fontSize: 14, fontFamily: 'Poppins-Bold', color: '#A4B0BEDD'},
  slashdua: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    marginRight: 5,
    color: '#A4B0BEDD',
  },
});

export default InputNewPasien;
