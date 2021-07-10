import React, {useState} from 'react';
const {RNCamera} = require('react-native-camera');
import {Alert, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AmbilFotoObat = () => {
  const [takingPic, setTakingPic] = useState(false);

  const takePicture = async () => {
    if (this.AmbilFotoObat && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPic(true);

      try {
        const data = await this.AmbilFotoObat.takePictureAsync(options);
        Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', 'Failed take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={ref => {
          this.AmbilFotoObat = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
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
  );
};

const style = StyleSheet.create({
  buttonCameraWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  buttonCamera: {
    zIndex: 5,
  },
});

export default AmbilFotoObat;
