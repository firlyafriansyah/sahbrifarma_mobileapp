import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomStatusBar, Gap, Header, LoadingModal} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetAdministrationAccountList} from '../../services/Administration';
import styles from '../../styles/ListScreenStyles';

const AdministrationManage = ({navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAdministrationAccountList(loggedInToken)
      .then((res: any) => setData(res))
      .catch(() => null)
      .finally(() => setRefreshing(false));
  }, [loggedInToken]);

  React.useEffect(() => {
    setIsLoading(true);
    GetAdministrationAccountList(loggedInToken)
      .then((res: any) => setData(res))
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, [loggedInToken]);

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <Header
        actionOne={() => navigation.goBack()}
        actionTwo={() => navigation.push('AdministrationRegistration')}
        actionTwoText="Buat"
        title="Kelola Akun"
      />
      <Gap height={20} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.listWrapper}>
          {data.length <= 0 ? (
            <Text style={styles.endText}>
              Administration account list not found!
            </Text>
          ) : (
            <>
              {data.map((res, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listContainer}
                  onPress={() =>
                    navigation.navigate('AdministrationEdit', {param: res})
                  }>
                  <View style={styles.list}>
                    <Text style={styles.listTitle}>
                      {res.fullname} - {res.role}
                    </Text>
                    <View style={styles.statusWrapper}>
                      <Text style={styles.listSubtitle}>@{res.username}</Text>
                      <View
                        style={[
                          styles.status,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            backgroundColor:
                              res.status === 'active' ? '#27ae60' : '#c0392b',
                          },
                        ]}>
                        <Text style={styles.statusText}>{res.status}</Text>
                      </View>
                      <View
                        style={[
                          styles.status,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            backgroundColor: res.loggedIn
                              ? '#27ae60'
                              : '#c0392b',
                          },
                        ]}>
                        <Text style={styles.statusText}>
                          {res.loggedIn ? 'Logged In' : 'Logged Out'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.icon}>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color="#6c5ce799"
                      size={28}
                    />
                  </View>
                </TouchableOpacity>
              ))}
              <Gap height={20} />
              <Text style={styles.endText}>Akhir dari daftar.</Text>
            </>
          )}
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default AdministrationManage;
