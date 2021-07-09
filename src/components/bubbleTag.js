import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const BubbleTag = props => {
  return (
    <View style={style.container}>
      <Text style={style.textStyle}>{props.name}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          props.onPress();
          Keyboard.dismiss();
        }}>
        <FontAwesomeIcon icon={faTimes} size={15} style={style.iconStyle} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5352ED',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingTop: 3,
    paddingBottom: 4,
    marginRight: 3,
    marginBottom: 3,
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    marginRight: 7,
  },
  iconStyle: {
    color: '#FFF',
  },
});

export default BubbleTag;
