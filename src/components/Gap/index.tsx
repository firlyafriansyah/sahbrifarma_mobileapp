import React from 'react';
import {View} from 'react-native';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap = (props: GapProps) => {
  const {height = 0, width = 0} = props;

  return <View style={{height: height, width: width}} />;
};

export default Gap;
