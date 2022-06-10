import React, {useState} from 'react';
const {RNCamera} = require('react-native-camera');
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNFS from 'react-native-fs';

const Camera = props => {
  const [takingPic, setTakingPic] = useState(false);
  const [modal, setModal] = useState(false);

  const takePicture = async () => {
    if (this.AmbilFotoObat && !takingPic) {
      let options = {
        quality: 0.1,
        base64: true,
      };

      setTakingPic(true);

      try {
        const data = await this.AmbilFotoObat.takePictureAsync(options);
        const image = data.uri;
        RNFS.readFile(image.substr(7), 'base64').then(res => {
          props.uri(res);
        });
        setModal(false);
      } catch (err) {
        Alert.alert('Error', 'Failed take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (props.image.length >= 3) {
            Alert.alert('Kamu sudah ambil 3 foto!');
          } else {
            return setModal(true);
          }
        }}>
        <FontAwesomeIcon icon={faCamera} size={50} />
      </TouchableWithoutFeedback>
      <Modal style={style.flex} visible={modal}>
        <View style={style.flex}>
          <RNCamera
            ref={ref => {
              this.AmbilFotoObat = ref;
            }}
            captureAudio={false}
            style={style.flex}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={style.buttonCameraWrapper}>
            <TouchableWithoutFeedback
              onPress={takePicture}
              style={style.buttonCamera}>
              <FontAwesomeIcon icon={faCamera} size={50} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => setModal(false)}>
          <View style={style.backBtn}>
            <Text style={style.backText}>Kembali</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  buttonCameraWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  buttonCamera: {
    zIndex: 5,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  backBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3436',
    height: 50,
    width: '100%',
  },
  backText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default Camera;
