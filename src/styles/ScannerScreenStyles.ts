import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerCamera: {
    flex: 1,
    width: '100%',
  },
  qrScannerImage: {
    position: 'absolute',
    top: 220,
  },
  scannerHeaderIcon: {
    position: 'absolute',
    display: 'flex',
    width: 100,
    height: 100,
    top: 70,
    left: 25,
  },
  scannerHeaderText: {
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#FFFFFF',
    top: 70,
  },
  actionWrapper: {
    position: 'absolute',
    width: '100%',
    height: 250,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 35,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 24,
    marginBottom: 30,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  manualInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  idPasienWrapper: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  idPasien: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    letterSpacing: 10,
    textAlign: 'center',
  },
  gap: {
    width: '4%',
  },
  buttonWrapper: {
    elevation: 2,
    backgroundColor: '#00b894',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonDisableWrapper: {
    elevation: 2,
    backgroundColor: '#b2bec3',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default styles;
