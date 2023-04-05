import * as React from 'react';
import {StatusBar} from 'react-native';

interface CustomStatusBarProps {
  bgColor?: string;
  translucent: boolean;
}

const CustomStatusBar = (props: CustomStatusBarProps) => {
  const {bgColor = 'transparent', translucent} = props;

  return (
    <StatusBar
      translucent={translucent}
      animated={true}
      backgroundColor={bgColor}
      barStyle="default"
      showHideTransition="fade"
      hidden={false}
    />
  );
};

export default CustomStatusBar;
