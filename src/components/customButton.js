import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableHighlight
      onPress={() => props.navigation()}
      style={[style.touchable, {marginBottom: props.mb, marginTop: props.mt}]}>
      <View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: props.title === 'Hapus' ? '#c0392b' : '#5352ED',
          },
          style.submitBtn,
        ]}>
        <Text style={style.submitText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  submitBtn: {
    paddingVertical: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    elevation: 12,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  touchable: {borderRadius: 26},
});

export default CustomButton;
