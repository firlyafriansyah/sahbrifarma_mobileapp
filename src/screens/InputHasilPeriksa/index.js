/* eslint-disable radix */
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {CustomButton, CustomHeader, Input, TextArea} from '../../components';
import {CommonActions} from '@react-navigation/routers';
import {HOST} from '../../data/constants';
import {getDataAsyncStorage} from '../../data/asyncStorage';

const InputHasilPeriksa = ({navigation, route}) => {
  const sistolRef = useRef(null);
  const diastolRef = useRef(null);
  const pulseRef = useRef(null);
  const [idPasien, setIdPasien] = useState();
  const [sistol, setSistol] = useState();
  const [diastol, setDiastol] = useState();
  const [pulse, setPulse] = useState();
  const [gula, setGula] = useState();
  const [asam, setAsam] = useState();
  const [kolestrol, setKolestrol] = useState();
  const [anamnesa, setAnamnesa] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [keterangan, setKeterangan] = useState();
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIdPasien(route.params?.data);
    getDataAsyncStorage('admin')
      .then(res => {
        setAdmin(res.adminName);
      })
      .catch(() => {
        Alert('Terjadi kegagalan mengambil data dari Async Storage!');
      });
    sistolRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      tensi_darah:
        sistol || diastol || pulse
          ? `${sistol && '0'}/${diastol && '0'}/${pulse && '0'}`
          : null,
      gula_darah: gula ? parseInt(gula) : null,
      asam_urat: asam ? parseInt(asam) : null,
      kolestrol: kolestrol ? parseInt(kolestrol) : null,
      anamnesa,
      diagnosis,
      keterangan,
      admin: admin,
    }),
  };

  const simpan = () => {
    setLoading(true);
    fetch(`${HOST}/hasil-periksa/tambah/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
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
          Alert.alert('Data gagal disimpan!');
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
        title={'Input Hasil Periksa'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={style.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.wrapper}>
          <Text style={style.label}>Tensi</Text>
          <View style={style.wrapperLahir}>
            <View style={style.wrapperInput}>
              <TextInput
                ref={sistolRef}
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'XXX'}
                onChangeText={text => {
                  setSistol(text);
                  if (text.length === 3) {
                    diastolRef.current.focus();
                  }
                }}
                value={sistol}
                maxLength={3}
                selectTextOnFocus={true}
              />
              <Text style={style.slash}>/</Text>
              <TextInput
                ref={diastolRef}
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'XX'}
                onChangeText={text => {
                  setDiastol(text);
                  if (text.length === 2) {
                    pulseRef.current.focus();
                  }
                }}
                value={diastol}
                maxLength={2}
                selectTextOnFocus={true}
              />
              <Text style={style.slash}>.</Text>
              <TextInput
                ref={pulseRef}
                keyboardType={'number-pad'}
                style={style.input}
                placeholder={'XX'}
                onChangeText={text => setPulse(text)}
                value={pulse}
                maxLength={2}
                selectTextOnFocus={true}
              />
            </View>
          </View>
          <Text style={style.label}>Gula Darah</Text>
          <Input
            mb={15}
            placeholder={'Gula Darah Pasien'}
            onChangeText={item => setGula(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Asam Urat</Text>
          <Input
            mb={15}
            placeholder={'Asam Urat Pasien'}
            onChangeText={item => setAsam(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Kolestrol</Text>
          <Input
            mb={15}
            placeholder={'Kolestrol Pasien'}
            onChangeText={item => setKolestrol(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Anamnesa</Text>
          <TextArea
            mb={15}
            height={120}
            placeholder={'Anamnesa Pasien'}
            selectTextOnFocus={true}
            onChangeText={item => setAnamnesa(item)}
            value={anamnesa}
          />
          <Text style={style.label}>Diagnosis</Text>
          <TextArea
            mb={15}
            height={120}
            placeholder={'Diagnosis Pasien'}
            selectTextOnFocus={true}
            onChangeText={item => setDiagnosis(item)}
            value={diagnosis}
          />
          <Text style={style.label}>Keterangan</Text>
          <TextArea
            mb={15}
            height={120}
            placeholder={'Keterangan lainnya'}
            selectTextOnFocus={true}
            onChangeText={item => setKeterangan(item)}
            value={keterangan}
          />
          <CustomButton
            title={'Simpan'}
            mt={60}
            mb={60}
            navigation={() => {
              simpan();
            }}
          />
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyleLoading}>
          <View style={style.modalWrapperLoading}>
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
  bubbleTag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  modalStyleLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapperLoading: {
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
  wrapperLahir: {
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
  slash: {fontSize: 14, fontFamily: 'Poppins-Bold', color: '#A4B0BEDD'},
});

export default InputHasilPeriksa;
