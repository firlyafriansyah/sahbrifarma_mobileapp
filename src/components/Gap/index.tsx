import React from 'react';
import {View} from 'react-native';

interface GapProps {
  height: number;
}

const Gap = (props: GapProps) => {
  const {height = 20} = props;

  return <View style={{height: height}} />;
};

export default Gap;
