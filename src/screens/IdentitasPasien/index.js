/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomButton, CustomHeader, Input, InputSelect} from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {HOST} from '../../data/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faWalking} from '@fortawesome/free-solid-svg-icons';
import {CommonActions} from '@react-navigation/routers';
import QRCode from 'react-native-qrcode-svg';
import {getDataAsyncStorage} from '../../data/asyncStorage';

const IdentitasPasien = ({navigation, route}) => {
  const [editable, setEditable] = useState(false);
  const [idPasien, setIdPasien] = useState();
  const [namaPasien, setNamaPasien] = useState();
  const [alamatPasien, setAlamatPasien] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [bulanLahir, setBulanLahir] = useState();
  const [tahunLahir, setTahunLahir] = useState();
  const [kelaminPasien, setKelaminPasien] = useState();
  const [teleponPasien, setTeleponPasien] = useState();
  const [showDatePicker, setShowDatePicker] = useState();
  const [date, setDate] = useState(new Date());
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = route.params?.data;
    setNamaPasien(data.nama);
    setIdPasien(data.id);
    setAlamatPasien(data.alamat);
    setTanggalLahir(data.tanggal_lahir.split('/')[0]);
    setBulanLahir(data.tanggal_lahir.split('/')[1]);
    setTahunLahir(data.tanggal_lahir.split('/')[2]);
    setKelaminPasien(data.jenis_kelamin);
    setTeleponPasien(data.nomor_telepon);
    getDataAsyncStorage('admin')
      .then(res => {
        setAdmin(res.adminName);
      })
      .catch(() => {
        Alert('Terjadi kegagalan mengambil data dari Async Storage!');
      });
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      nama_pasien: namaPasien,
      alamat_pasien: alamatPasien,
      tanggal_lahir_pasien: `${tanggalLahir}/${bulanLahir}/${tahunLahir}`,
      jenis_kelamin_pasien: kelaminPasien,
      nomor_telepon_pasien: teleponPasien,
      admin: admin,
    }),
  };

  const updatePasien = () => {
    fetch(`${HOST}/pasien/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          setEditable(!editable);
          Alert.alert('Berhasil!', 'Data berhasil disimpan!', [
            {
              text: 'Oke',
              onPress: () => {
                const resetAction = CommonActions.reset({
                  index: 1,
                  routes: [
                    {
                      name: 'DetailPasien',
                      params: {id_pasien: idPasien},
                    },
                  ],
                });
                navigation.dispatch(resetAction);
              },
            },
          ]);
        } else {
          setLoading(false);
          Alert.alert('Gagal mengupdate data!');
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
        title={'Identitas Pasien'}
      />
      <View style={style.qrCodeStyle}>
        <QRCode value={idPasien} size={80} />
      </View>
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
          <View style={style.wrapper}>
            <View style={style.wrapperInput}>
              <TextInput
                keyboardType={'number-pad'}
                style={style.input}
                editable={editable}
                placeholder={'DD'}
                onChangeText={text => {
                  setTanggalLahir(text);
                  if (parseInt(text) > 31) {
                    setTanggalLahir('31');
                  } else {
                    setTanggalLahir(text);
                  }
                }}
                value={tanggalLahir}
                maxLength={2}
                selectTextOnFocus={true}
              />
              <Text style={style.slash}>/</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={style.input}
                editable={editable}
                placeholder={'MM'}
                selectTextOnFocus={true}
                onChangeText={text => {
                  setBulanLahir(text);
                  if (parseInt(text) > 12) {
                    setBulanLahir('12');
                  } else {
                    setBulanLahir(text);
                  }
                }}
                value={bulanLahir}
                maxLength={2}
              />
              <Text style={style.slashdua}>/</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'YYYY'}
                editable={editable}
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
            editable={editable}
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
            value={teleponPasien}
            editable={editable}
            onChangeText={item => setTeleponPasien(item)}
          />
          <CustomButton
            title={editable ? 'Simpan' : 'Ubah'}
            mb={60}
            mt={30}
            navigation={() => {
              if (editable) {
                updatePasien();
                setLoading(true);
              } else {
                setEditable(true);
              }
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
  slash: {fontSize: 14, fontFamily: 'Poppins-Bold', color: '#A4B0BEDD'},
  slashdua: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    marginRight: 5,
    color: '#A4B0BEDD',
  },
});

export default IdentitasPasien;
