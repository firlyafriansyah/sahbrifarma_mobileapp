import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableHighlight
      onPress={() => props.navigation()}
      style={[style.touchable, {marginBottom: props.mb, marginTop: props.mt}]}>
      <View style={style.submitBtn}>
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
    backgroundColor: '#5352ED',
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
