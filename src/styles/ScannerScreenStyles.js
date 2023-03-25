import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  scanner: {
    position: 'relative',
    width: 320,
    height: 320,
    borderRadius: 30,
    overflow: 'hidden',
  },
  scannerCamera: {
    flex: 1,
    width: '100%',
  },
  qrScannerImage: {
    position: 'absolute',
  },
  manualInputWrapper: {
    width: '80%',
  },
  label: {
    fontSize: 18,
  },
  logoutWrapper: {
    width: '80%',
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
