import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  BubbleTag,
  CustomButton,
  CustomHeader,
  InputWithButton,
} from '../components';

const InputKeluhan = ({navigation}) => {
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

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Input Keluhan'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={style.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.wrapper}>
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
            title={'Simpan'}
            mt={60}
            mb={60}
            navigation={() => navigation.navigate('Keluhan By Date')}
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
  bubbleTag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
});

export default InputKeluhan;
