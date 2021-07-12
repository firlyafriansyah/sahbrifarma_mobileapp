import React, {useState} from 'react';
import {ScrollView, View, Image, Text, StyleSheet} from 'react-native';
import {Camera, CustomButton, CustomHeader} from '../components';

const FotoObat = ({navigation}) => {
  const [img, setImg] = useState([]);

  return (
    <View style={style.conatiner}>
      <CustomHeader title={'Foto Obat'} onPress={() => navigation.goBack()} />
      <View style={style.btnCameraWrapper}>
        <Camera uri={uri => setImg(arr => [...arr, `${uri}`])} />
      </View>
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View style={style.imageWrapper}>
          {img.length <= 0 ? (
            <Text style={style.textStyle}>Tidak ada foto</Text>
          ) : (
            img.map((item, index) => (
              <Image
                key={index}
                style={style.imageStyle}
                source={{
                  uri: `data:image/jpg;base64,${item}`,
                }}
              />
            ))
          )}
        </View>
        <CustomButton
          mt={30}
          mb={30}
          title={'Simpan'}
          navigation={() => navigation.navigate('Foto Obat By Date')}
        />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
    paddingHorizontal: 30,
  },
  btnCameraWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
  },
});

export default FotoObat;
