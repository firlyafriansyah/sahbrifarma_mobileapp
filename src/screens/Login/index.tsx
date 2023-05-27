import * as React from 'react';
import {Image, Text, View, KeyboardAvoidingView} from 'react-native';
import {IsLogedInContext} from '../../context/AuthContext';
import {LoginService} from '../../services';
import styles from '../../styles/Screen/Login';
import {DayGenerator, InputCheck} from '../../utils';
import {
  clearAsyncStorage,
  storeDataAsyncStorage,
} from '../../utils/AsyncStorage';
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
  CustomStatusBar,
  Gap,
  LoadingModal,
} from '../../components';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {setLoggedInRole, setLoggedInToken} =
    React.useContext(IsLogedInContext);

  React.useEffect(() => {
    setIsLoading(true);
    clearAsyncStorage().finally(() => setIsLoading(false));
  }, []);

  const loginHandler = () => {
    InputCheck(username, password)
      .then(() => {
        setIsLoading(true);
        LoginService(username, password)
          .then((res: any) => {
            storeDataAsyncStorage('@loggedUser', {
              loggedInRole: res.role,
              loggedInToken: res.token,
            }).catch((err: any) => {
              setError(true);
              setErrorMessage(err);
            });
            setLoggedInRole(res.role);
            setLoggedInToken(res.token);
            setPassword('');
            setUsername('');
            setError(false);
          })
          .catch((err: any) => {
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
      <KeyboardAvoidingView>
        <CustomStatusBar translucent />
        <Gap height={40} />
        <Text style={styles.heading}>{`Selamat ${DayGenerator()}`}</Text>
        <Text style={styles.description}>Selamat Datang Kembali</Text>
        <Text style={styles.description}>Selamat Bekerja</Text>
        <View style={styles.loginWrapper}>
          {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <CustomInput
            label="Username"
            placeholder="Enter your username . . ."
            onChangeText={(item: string) => {
              setError(false);
              setUsername(item);
            }}
            value={username}
          />
          <Gap height={20} />
          <CustomInputPassword
            label="Password"
            placeholder="Enter your password . . ."
            onChangeText={(item: string) => {
              setError(false);
              setPassword(item);
            }}
            value={password}
          />
          <Gap height={60} />
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
