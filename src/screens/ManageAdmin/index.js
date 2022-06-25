import {faPen, faTrash, faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomHeader, FloatingButton} from '../../components';
import {getDataAsyncStorage} from '../../data/asyncStorage';
import {HOST} from '../../data/constants';

const ManageAdmin = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    getDataAsyncStorage('admin')
      .then(res => {
        setRole(res.adminRole);
      })
      .catch(() => {
        Alert.alert('Gagal menarik data dari async storage');
      });
    setLoading(true);
    fetch(`${HOST}/admin`)
      .then(resJson => resJson.json())
      .then(res => {
        setLoading(false);
        if (res.status === 'success') {
          const admin = [];
          res.admin.forEach(item => {
            admin.push(item);
          });
          setAdminData(admin);
        } else {
          setLoading(false);
          Alert.alert('Data gagal dimuat!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  }, []);

  const deleteAdmin = id => {
    setLoading(true);
    fetch(`${HOST}/admin/delete/${id}`, {method: 'DELETE'})
      .then(resJson => resJson.json())
      .then(res => {
        setLoading(false);
        if (res.status === 'success') {
          Alert.alert('Admin berhasil dihapus!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Admin gagal dihapus!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  };

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Manage Admin'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollViewStyle}>
        {adminData.length <= 0 ? (
          <Text style={style.textWarning}>Tidak ada data admin!</Text>
        ) : (
          adminData.map((item, index) => {
            if (role === 1) {
              if (adminData.filter(i => i.role !== 1).length > 0) {
                if (item.role !== 1) {
                  return (
                    <View style={style.listWrapper} key={index}>
                      <Text style={style.listText}>{item.username}</Text>
                      <View style={style.listBtnWrapper}>
                        <TouchableWithoutFeedback
                          onPress={() =>
                            navigation.navigate({
                              name: 'Update Admin',
                              params: {data: item.id},
                            })
                          }>
                          <View style={style.listBtn}>
                            <FontAwesomeIcon icon={faPen} size={20} />
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                          onPress={() => {
                            Alert.alert(
                              'Apakah anda yakin?',
                              'Apakah anda yakin akan menghapus admin ini?',
                              [
                                {
                                  text: 'Ya',
                                  onPress: () => {
                                    deleteAdmin(item.id);
                                  },
                                },
                                {
                                  text: 'Batal',
                                },
                              ],
                            );
                          }}>
                          <View style={style.listBtn}>
                            <FontAwesomeIcon icon={faTrash} size={20} />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  );
                }
              } else {
                return (
                  <Text style={style.textWarning}>Tidak ada data admin!</Text>
                );
              }
            } else {
              return (
                <View style={style.listWrapper} key={index}>
                  <Text style={style.listText}>{item.username}</Text>
                  <View style={style.listBtnWrapper}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate({
                          name: 'Update Admin',
                          params: {data: item.id},
                        })
                      }>
                      <View style={style.listBtn}>
                        <FontAwesomeIcon icon={faPen} size={20} />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        Alert.alert(
                          'Apakah anda yakin?',
                          'Apakah anda yakin akan menghapus admin ini?',
                          [
                            {
                              text: 'Ya',
                              onPress: () => {
                                deleteAdmin(item.id);
                              },
                            },
                            {
                              text: 'Batal',
                            },
                          ],
                        );
                      }}>
                      <View style={style.listBtn}>
                        <FontAwesomeIcon icon={faTrash} size={20} />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            }
          })
        )}
      </ScrollView>
      <FloatingButton
        navigation={() => navigation.navigate('Register Admin')}
      />
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyleLoading}>
          <View style={style.modalWrapperLoading}>
            <FontAwesomeIcon icon={faWalking} size={25} sty />
            <Text style={style.textModal}>Mohon Tunggu!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  listText: {fontSize: 18, fontFamily: 'Poppins-SemiBold'},
  listBtnWrapper: {display: 'flex', flexDirection: 'row'},
  listBtn: {marginHorizontal: 10, zIndex: 99},
  modalStyleLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapperLoading: {
    width: '50%',
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: 'center',
  },
  textModal: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textWarning: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
  },
});

export default ManageAdmin;
