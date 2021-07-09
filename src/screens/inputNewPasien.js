import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  BubbleTag,
  CustomButton,
  CustomHeader,
  Input,
  InputSelect,
  InputWithButton,
} from '../components';

const InputNewPasien = ({navigation}) => {
  const [alergiObat, setAlergiObat] = useState(false);
  const [namaObat, setNamaObat] = useState([]);
  const [keluhan, setKeluhan] = useState([]);

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
          <Input mb={15} placeholder={'Nama Pasien'} />
          <Text style={style.label}>Alamat</Text>
          <Input mb={15} placeholder={'Alamat Pasien'} />
          <Text style={style.label}>Jenis Kelamin</Text>
          <InputSelect
            labelA={'Laki - laki'}
            labelB={'Perempuan'}
            mb={15}
            value={() => null}
            onChangeLabel={() => null}
          />
          <Text style={style.label}>Telepon</Text>
          <Input
            mb={15}
            keyboardType={'number-pad'}
            placeholder={'Nomor Telepon Pasien'}
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
            navigation={() => navigation.navigate('Home')}
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
});

export default InputNewPasien;
