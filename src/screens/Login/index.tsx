import * as React from 'react';
import {Image, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {IsLogedInContext} from '../../context/AuthContext';
import {LoginService} from '../../services';
import styles from '../../styles/LoginScreenStyles';
import {DayGenerator, InputCheck} from '../../utils';
import {storeDataAsyncStorage} from '../../utils/AsyncStorage';
import {
  CustomButton,
  CustomInput,
  CustomStatusBar,
  Gap,
  LoadingModal,
} from './../../components';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [saveLogin, setSaveLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {setLoggedInUsername, setLoggedInRole} =
    React.useContext(IsLogedInContext);

  const loginHandler = () => {
    InputCheck(username, password)
      .then(() => {
        setIsLoading(true);
        LoginService(username, password)
          .then((res: any) => {
            if (saveLogin) {
              storeDataAsyncStorage('@loggedUser', {
                loggedUsername: res.username,
                loggedRole: res.role,
              });
            }
            setLoggedInUsername(res.username);
            setLoggedInRole(res.role);
            setPassword('');
            setUsername('');
            setError(false);
          })
          .catch(err => {
            setError(true);
            setErrorMessage(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(err => {
        setError(true);
        setErrorMessage(err);
      });
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar translucent />
      <Text style={styles.heading}>{`Selamat ${DayGenerator()}`}</Text>
      <Text style={styles.description}>Selamat Datang Kembali</Text>
      <Text style={styles.description}>Selamat Bekerja</Text>
      <View style={styles.loginWrapper}>
        {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <CustomInput
          placeholder="Enter your username . . ."
          onChangeText={(item: string) => {
            setError(false);
            setUsername(item);
          }}
          value={username}
        />
        <Gap height={20} />
        <CustomInput
          placeholder="Enter your password . . ."
          onChangeText={(item: string) => {
            setError(false);
            setPassword(item);
          }}
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
        <Gap height={40} />
        <CustomButton buttonText={'Masuk'} onClick={() => loginHandler()} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.made}>Dibuat dan disiapkan oleh:</Text>
        <Image
          source={require('../../../assets/images/sahbrifarma_logo.png')}
          style={styles.image}
        />
        <Image
          source={require('../../../assets/images/sahbrifarma_logoname.png')}
          style={styles.imagename}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default Login;
