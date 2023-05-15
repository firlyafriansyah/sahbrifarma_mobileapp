import * as React from 'react';
import {StatusBar} from 'react-native';

interface CustomStatusBarProps {
  translucent: boolean;
  bgColor?: string;
  barStyle?: any;
}

const CustomStatusBar = (props: CustomStatusBarProps) => {
  const {
    translucent,
    bgColor = 'transparent',
    barStyle = 'dark-content',
  } = props;

  return (
    <StatusBar
      translucent={translucent}
      animated
      backgroundColor={bgColor}
      barStyle={barStyle}
      showHideTransition="fade"
      hidden={false}
    />
  );
};

export default CustomStatusBar;
