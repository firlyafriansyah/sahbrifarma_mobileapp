import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const Category = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={style.categoryStyle}>
        <Image source={props.source} style={style.imageStyle} />
        <Text style={style.textStyle}>{props.title}</Text>
        <FontAwesomeIcon icon={faChevronRight} size={20} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  categoryStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageStyle: {
    width: 64,
    height: 64,
  },
  textStyle: {
    flex: 0.6,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#2F3542',
  },
});

export default Category;
