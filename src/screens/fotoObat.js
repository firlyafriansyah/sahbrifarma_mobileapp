import React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {CustomHeader} from '../components';

const FotoObat = ({navigation}) => {
  return (
    <View style={style.conatiner}>
      <CustomHeader title={'Foto Obat'} onPress={() => navigation.goBack()} />
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={require('../../assets/images/sample_obat.png')}
            style={style.imageStyle}
          />
          <Image
            source={require('../../assets/images/sample_obat.png')}
            style={style.imageStyle}
          />
          <Image
            source={require('../../assets/images/sample_obat.png')}
            style={style.imageStyle}
          />
          <Image
            source={require('../../assets/images/sample_obat.png')}
            style={style.imageStyle}
          />
        </View>
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
    marginTop: 60,
  },
  imageStyle: {
    width: '100%',
    marginBottom: 30,
  },
});

export default FotoObat;
