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
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 25,
    width: '100%',
  },
  actionWrapper: {
    position: 'absolute',
    width: '100%',
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  manualInputWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idPasienWrapper: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
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
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#00b894',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonDisableWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#e84118',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginRight: 20,
  },
});

export default styles;
