import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const ListItem = props => {
  return (
    <View style={style.container}>
      <Text style={style.textStyle}>{props.title}</Text>
      <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <FontAwesomeIcon icon={faTrash} size={15} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: '#D2D8DF',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
  },
});

export default ListItem;
