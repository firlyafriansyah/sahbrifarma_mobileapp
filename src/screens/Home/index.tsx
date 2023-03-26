import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, BackHandler, Text, View} from 'react-native';

const Home = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold on!',
        'Are you sure you want to exit from this patient account?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Scanner'}],
                }),
              );
            },
          },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
