import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  DevSettings,
} from 'react-native';
import {
  CustomButton,
  CustomStatusBar,
  Gap,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {LogoutService} from '../../services';
import {GetAdministrationAccountDetail} from '../../services/Administration';
import styles from '../../styles/Screen/AdministrationProfile';
import {DayGenerator} from '../../utils';
import {getDataAsyncStorage} from '../../utils/AsyncStorage';

const AdministrationProfile = ({navigation}: any) => {
  const {setLoggedInToken, setLoggedInRole, loggedInToken, loggedInRole} =
    React.useContext(IsLogedInContext);
  const [fullname, setFullname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setIsLoading(true);
    GetAdministrationAccountDetail(loggedInToken)
      .then((res: any) => {
        setFullname(res.fullname);
        setUsername(res.username);
        setData(res);
        setIsLoading(false);
      })
      .catch(() => null);
  }, [loggedInToken, isFocused]);

  const logoutHandler = () => {
    setIsLoading(true);
    getDataAsyncStorage('@loggedUser')
      .then(res => {
        Alert.alert(
          'Logout!',
          'Are you sure want to logout from this account?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                LogoutService(res.loggedInToken)
                  .then(() => {
                    setLoggedInRole('');
                    setLoggedInToken('');
                  })
                  .catch(err => {
                    Alert.alert('Error!', err, [
                      {
                        text: err.includes('re-login') ? 'Oke' : 'Try Again',
                        onPress: () => {
                          if (err.includes('re-login')) {
                            setLoggedInRole('');
                            setLoggedInToken('');
                          } else {
                            DevSettings.reload();
                          }
                        },
                      },
                    ]);
                  })
                  .finally(() => setIsLoading(false));
              },
            },
          ],
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar translucent />
      <Image
        source={require('../../../assets/images/sahbrifarma_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>{`Selamat ${DayGenerator()}`}</Text>
      <Text style={styles.description}>Selamat Datang Kembali</Text>
      <Text style={styles.description}>Selamat Bekerja</Text>
      <Gap height={60} />
      <Text style={styles.heading}>{fullname}</Text>
      <Text style={styles.descriptionTitle}>
        @{username} - {loggedInRole}
      </Text>
      <Gap height={20} />
      <View style={styles.actionContainer}>
        <View style={styles.logoutButton}>
          <CustomButton
            buttonText="Logout"
            bgColor="#e84118"
            onClick={() => logoutHandler()}
          />
        </View>
        <TouchableHighlight
          style={styles.updateButton}
          onPress={() =>
            navigation.navigate('AdministrationProfileUpdate', {data})
          }>
          <FontAwesomeIcon icon={faEdit} size={20} color="#FFFFFF" />
        </TouchableHighlight>
      </View>
      <Gap height={150} />
      <View style={styles.startWorkButton}>
        <CustomButton
          buttonText={
            loggedInRole === 'super-admin'
              ? 'Kelola Akun Administrasi  💻'
              : 'Mulai Bekerja 🔥'
          }
          onClick={() => {
            loggedInRole === 'frontdesk'
              ? navigation.navigate('PatientCardScanner')
              : loggedInRole === 'super-admin'
              ? navigation.navigate('AdministrationManage')
              : navigation.navigate('PatientQueue');
          }}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default AdministrationProfile;
