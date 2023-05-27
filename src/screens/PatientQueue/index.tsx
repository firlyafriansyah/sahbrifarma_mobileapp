import * as React from 'react';
import {Text, View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomStatusBar,
  Gap,
  Header,
  ListCard,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetQueueList} from '../../services';
import styles from '../../styles/ListScreenStyles';

const PatientQueue = ({navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetQueueList(loggedInToken)
      .then((res: any) => setData(res))
      .catch(() => null)
      .finally(() => setRefreshing(false));
  }, [loggedInToken]);

  React.useEffect(() => {
    setIsLoading(true);
    GetQueueList(loggedInToken)
      .then((res: any) => setData(res))
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, [loggedInToken]);

  const navigationHandler = (idPasien: string) => {
    navigation.navigate('PatientDashboard', {idPasien});
  };

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <Header actionOne={() => navigation.goBack()} title="Antrean Pasien" />
      <Gap height={20} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.listWrapper}>
          {data.length <= 0 ? (
            <Text style={styles.endText}>Tidak ada antrean</Text>
          ) : (
            <>
              {data.map((res, index) => (
                <ListCard
                  key={index}
                  name={res.patientName}
                  id={res.uidPatient}
                  gender={res.sex}
                  sequence={index + 1}
                  onPress={() => navigationHandler(res.uidPatient)}
                />
              ))}
              <Gap height={20} />
              <Text style={styles.endText}>End of list</Text>
            </>
          )}
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default PatientQueue;
