import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
  RefreshControl,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faQrcode,
  faBolt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Card, FloatingButton, InputWithLogo} from '../components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {HOST} from '../data/constants';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation, route}) => {
  const [modal, setModal] = useState(false);
  const [torch, setTorch] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [role, setRole] = useState();

  const onSuccess = e => {
    setSearch(e.data);
    setModal(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData();
    });
  }, []);

  const getData = () => {
    fetch(`${HOST}/pasien`)
      .then(resJson => resJson.json())
      .then(res => {
        setRefreshing(false);
        setData(res.idnPasien);
      });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    getData();
    setRole(route.params?.role);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/header_img.png')}
        style={style.image}
      />
      <View style={style.searchWrapper}>
        <InputWithLogo
          mb={30}
          mr={18}
          placeholder={'Search...'}
          icon={faSearch}
          size={15}
          iconColor={'#2F3542'}
          onChangeText={item => {
            setSearch(item);
          }}
        />
        <TouchableWithoutFeedback onPress={() => setModal(true)}>
          <FontAwesomeIcon
            icon={faQrcode}
            size={35}
            style={style.qrCodeStyle}
          />
        </TouchableWithoutFeedback>
      </View>
      <FloatingButton
        navigation={() =>
          navigation.navigate({
            name: 'Input Pasien Baru',
            params: {role: role},
          })
        }
      />
      {role === 1 ? (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Manage Admin')}>
            <View style={style.manageAdminStyle}>
              <Text style={style.manageAdminText}>Kelola Admin</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert(
                'Apakah anda yakin?',
                'Apakah anda yakin akan keluar dari akun ini?',
                [
                  {
                    text: 'Ya',
                    onPress: () => {
                      navigation.navigate('Login');
                    },
                  },
                  {
                    text: 'Batal',
                  },
                ],
              );
            }}>
            <View style={style.logoutSuper}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={25}
                color={'#FFFFFF'}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Apakah anda yakin?',
              'Apakah anda yakin akan keluar dari akun ini?',
              [
                {
                  text: 'Ya',
                  onPress: () => {
                    navigation.navigate('Login');
                  },
                },
                {
                  text: 'Batal',
                },
              ],
            );
          }}>
          <View style={style.logout}>
            <Text style={style.manageAdminText}>Keluar</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        {data.length >= 1 ? (
          data
            .slice(0)
            .reverse()
            .map(e => {
              if (search) {
                if (
                  e.nama_pasien.toLowerCase().includes(search.toLowerCase()) ||
                  e.id_pasien.includes(search)
                ) {
                  return (
                    <Card
                      key={e.id}
                      press={() =>
                        navigation.navigate({
                          name: 'DetailPasien',
                          params: {id_pasien: e.id_pasien, role: role},
                        })
                      }
                      namaPasien={e.nama_pasien}
                      dateCheck={e.tanggal_berobat_terakhir.split('T')[0]}
                      location={e.alamat_pasien}
                      id={e.id_pasien}
                    />
                  );
                }
              } else {
                return (
                  <Card
                    key={e.id}
                    press={() =>
                      navigation.navigate({
                        name: 'DetailPasien',
                        params: {id_pasien: e.id_pasien},
                      })
                    }
                    namaPasien={e.nama_pasien}
                    dateCheck={e.tanggal_berobat_terakhir.split('T')[0]}
                    location={e.alamat_pasien}
                    id={e.id_pasien}
                  />
                );
              }
            })
        ) : (
          <Text style={style.textLoading}>Tidak ada data pasien</Text>
        )}
      </ScrollView>

      <Modal visible={modal}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={
            torch
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          topContent={
            <TouchableOpacity onPress={() => setTorch(!torch)}>
              <FontAwesomeIcon
                icon={faBolt}
                size={25}
                style={{color: `${torch ? '#000' : '#CCC'}`}}
              />
            </TouchableOpacity>
          }
          bottomContent={
            <TouchableOpacity
              style={style.buttonTouchable}
              onPress={() => setModal(false)}>
              <Text style={style.buttonText}>Kembali</Text>
            </TouchableOpacity>
          }
        />
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 36,
  },
  image: {
    marginBottom: 40,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  qrCodeStyle: {
    color: '#646975',
    marginTop: 5,
  },
  scrollViewStyle: {
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },
  buttonTouchable: {
    marginTop: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#646975',
    borderRadius: 15,
  },
  textLoading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  manageAdminStyle: {
    width: 250,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5352ED',
    borderRadius: 20,
    marginBottom: 30,
  },
  manageAdminText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoutSuper: {
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb2f06',
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
  },
  logout: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb2f06',
    height: 50,
    borderRadius: 20,
    marginBottom: 30,
  },
});

export default Home;
