import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const CustomHeader = props => {
  return (
    <View style={style.header}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={33}
          style={style.iconHeader}
        />
      </TouchableWithoutFeedback>
      <Text style={style.textHeader}>{props.title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    display: 'flex',
    padding: 14,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconHeader: {
    zIndex: 2,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#2F3542',
    width: '100%',
    marginLeft: -33,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CustomHeader;
