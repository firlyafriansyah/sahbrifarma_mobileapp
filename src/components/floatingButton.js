import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const FloatingButton = props => {
  return (
    <TouchableHighlight
      onPress={() => props.navigation()}
      style={style.floatingBtn}>
      <FontAwesomeIcon icon={faPlus} size={25} style={style.floatingBtnIcon} />
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  floatingBtn: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#4D42CF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64,
    elevation: 6,
    zIndex: 5,
  },
  floatingBtnIcon: {
    color: '#FFF',
  },
});

export default FloatingButton;
