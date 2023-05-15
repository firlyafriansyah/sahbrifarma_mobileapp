import React from 'react';
import {
  SafeAreaView,
  Text,
  Alert,
  DevSettings,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  CustomButton,
  CustomStatusBar,
  Gap,
  LoadingModal,
} from '../../components';
import {DayGenerator} from '../../utils';
import styles from '../../styles/Screen/AdministrationProfile';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetAdministrationAccountDetail} from '../../services/Administration';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const AdministrationProfile = ({navigation}: any) => {
  const {loggedInToken, loggedInRole} = React.useContext(IsLogedInContext);
  const [fullname, setFullname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    GetAdministrationAccountDetail(loggedInToken)
      .then((res: any) => {
        setFullname(res.fullname);
        setUsername(res.username);
        setData(res);
      })
      .catch(err => {
        Alert.alert('Error!', err, [
          {
            text: 'Try Again',
            onPress: () => DevSettings.reload(),
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  }, [loggedInToken]);

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
          <CustomButton buttonText="Logout" bgColor="#e84118" />
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
        <CustomButton buttonText="Mulai Bekerja 🔥" />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default AdministrationProfile;
