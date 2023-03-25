import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {DatabaseCheck, LoginService} from '../../services';
import styles from '../../styles/LoginScreenStyles';
import {AutoLoginCheck, InputCheck} from '../../utils';
import {storeDataAsyncStorage} from '../../utils/AsyncStorage';
import {CustomButton, CustomInput, Gap, LoadingModal} from './../../components';

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveLogin, setSaveLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    DatabaseCheck.then(() => {
      AutoLoginCheck.then(() => {
        setLoading(false);
        navigation.navigate({name: 'Scanner'});
      }).catch(() => {
        setLoading(false);
      });
    }).catch((err: string) => {
      setLoading(false);
      Alert.alert(err);
    });
  }, [navigation]);

  const loginHandler = () => {
    InputCheck(username, password)
      .then(() => {
        storeDataAsyncStorage('autoLogin', saveLogin).catch(err =>
          Alert.alert(err),
        );
        LoginService(username, password)
          .then(() => {
            navigation.navigate({name: 'Scanner'});
            setPassword('');
            setUsername('');
            setError(false);
            setLoading(false);
          })
          .catch(err => {
            setError(true);
            setLoading(false);
            setErrorMessage(err);
          });
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        setErrorMessage(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('../../../assets/images/header_img.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Silahkan Masuk</Text>
      {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.loginWrapper}>
        <Text style={styles.label}>Username</Text>
        <CustomInput
          placeholder="Enter your username . . ."
          onChangeText={(item: string) => setUsername(item)}
          value={username}
        />
        <Gap height={20} />
        <Text style={styles.label}>Password</Text>
        <CustomInput
          placeholder="Enter your password . . ."
          onChangeText={(item: string) => setPassword(item)}
          value={password}
          inputPassword
        />
        <Gap height={30} />
        <BouncyCheckbox
          style={styles.checkBoxStyle}
          size={20}
          fillColor="#5352ED"
          unfillColor="#FFFFFF"
          text="Aktifkan Login Otomatis"
          iconStyle={styles.checkBoxIconStyle}
          textStyle={styles.checkBoxTextStyle}
          onPress={() => setSaveLogin(!saveLogin)}
        />
      </View>
      <CustomButton
        buttonText={'Masuk'}
        onClick={() => {
          setLoading(true);
          loginHandler();
        }}
      />
      <LoadingModal visible={loading} />
    </View>
  );
};

export default Login;
