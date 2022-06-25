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
  faSignOutAlt,
  faTrash,
  faUser,
  faChevronLeft,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import {Card, FloatingButton, InputWithLogo} from '../../components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {HOST} from '../../data/constants';
import {CommonActions} from '@react-navigation/routers';
import {
  getDataAsyncStorage,
  multiRemoveDataAsyncStorage,
} from '../../data/asyncStorage';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [torch, setTorch] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
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
        setData(res.pasien);
      });
  };

  const handleSearchButton = () => {
    if (search !== '') {
      setSearch('');
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    getData();
    getDataAsyncStorage('admin')
      .then(res => {
        setRole(res.adminRole);
      })
      .catch(() => {
        Alert('Terjadi kegagalan mengambil data dari Async Storage!');
      });

    return;
  }, [navigation]);

  return (
    <View style={style.container}>
      <Image
        source={require('../../../assets/images/header_img.png')}
        style={style.image}
      />
      <View style={style.searchWrapper}>
        <InputWithLogo
          mb={30}
          mr={18}
          placeholder={'Search...'}
          icon={search !== '' ? faTrash : faSearch}
          size={15}
          value={search}
          iconColor={'#2F3542'}
          onChangeText={item => {
            setSearch(item);
          }}
          onPress={handleSearchButton}
        />
        <TouchableWithoutFeedback onPress={() => setModal(true)}>
          <FontAwesomeIcon
            icon={faQrcode}
            size={35}
            style={style.qrCodeStyle}
          />
        </TouchableWithoutFeedback>
      </View>
      {role !== 2 && role !== 3 ? (
        <FloatingButton
          navigation={() => navigation.navigate({name: 'Input Pasien Baru'})}
        />
      ) : null}
      <View style={style.wrapper}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Login Information')}>
          <View style={style.loginInfo}>
            <FontAwesomeIcon icon={faUser} size={25} color={'#FFFFFF'} />
          </View>
        </TouchableWithoutFeedback>
        {role === 0 || role === 1 ? (
          <>
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
                        multiRemoveDataAsyncStorage('admin', 'autoLogin').then(
                          res => {
                            if (res.status === 'success') {
                              const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [
                                  {
                                    name: 'Login',
                                  },
                                ],
                              });
                              navigation.dispatch(resetAction);
                            } else {
                              Alert('Gagal menghapus async storage!');
                            }
                          },
                        );
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
          </>
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
                      multiRemoveDataAsyncStorage('admin', 'autoLogin').then(
                        res => {
                          if (res.status === 'success') {
                            const resetAction = CommonActions.reset({
                              index: 1,
                              routes: [
                                {
                                  name: 'Login',
                                },
                              ],
                            });
                            navigation.dispatch(resetAction);
                          } else {
                            Alert('Gagal menghapus async storage!');
                          }
                        },
                      );
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
      </View>
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
                  e.nama.toLowerCase().includes(search.toLowerCase()) ||
                  e.id.includes(search)
                ) {
                  return (
                    <View key={e.id} style={style.cardWrapper}>
                      <Card
                        press={() =>
                          navigation.navigate({
                            name: 'Detail Pasien',
                            params: {id_pasien: e.id},
                          })
                        }
                        namaPasien={e.nama}
                        dateCheck={e.tanggal_berobat_terakhir.split('T')[0]}
                        location={e.alamat}
                        id={e.id}
                        unduh={false}
                      />
                    </View>
                  );
                }
              } else {
                return (
                  <View key={e.id} style={style.cardWrapper}>
                    <Card
                      press={() =>
                        navigation.navigate({
                          name: 'Detail Pasien',
                          params: {id_pasien: e.id},
                        })
                      }
                      namaPasien={e.nama}
                      dateCheck={e.tanggal_berobat_terakhir.split('T')[0]}
                      location={e.alamat}
                      id={e.id}
                      unduh={false}
                    />
                  </View>
                );
              }
            })
        ) : (
          <Text style={style.textLoading}>Tidak ada data pasien</Text>
        )}
      </ScrollView>

      <Modal visible={modal}>
        <QRCodeScanner
          showMarker={true}
          onRead={onSuccess}
          flashMode={
            torch
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          topContent={
            <View style={style.scannerTopWrapper}>
              <View style={style.scannerBack}>
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    size={33}
                    style={style.iconHeader}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={style.scannerTitle}>QR Code Scanner</Text>
              <Text style={style.scannerSubTitle}>
                Silahkan scan QR Code pada kartu pasien
              </Text>
            </View>
          }
          bottomContent={
            <TouchableOpacity onPress={() => setTorch(!torch)}>
              <FontAwesomeIcon
                icon={faBolt}
                size={25}
                style={{color: `${torch ? '#000' : '#CCC'}`}}
              />
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
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    marginBottom: 40,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  qrCodeStyle: {
    color: '#646975',
    marginTop: 5,
  },
  scrollViewStyle: {
    width: '100%',
  },
  cardWrapper: {
    alignSelf: 'center',
    width: 350,
    height: 218.75,
    marginBottom: 20,
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
    width: 200,
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
  loginInfo: {
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0662eb',
    height: 50,
    borderRadius: 25,
    marginRight: 20,
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
  scannerTopWrapper: {
    width: '100%',
    display: 'flex',
    padding: 20,
  },
  scannerBack: {
    marginBottom: 30,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scannerSubTitle: {
    fontSize: 16,
    color: '#00000088',
    textAlign: 'center',
    marginBottom: 80,
  },
});

export default Home;
