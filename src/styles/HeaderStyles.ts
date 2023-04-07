import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  scannerHeaderIcon: {
    display: 'flex',
    width: '20%',
    alignItems: 'center',
  },
  scannerHeaderText: {
    width: '60%',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#FFFFFF',
  },
  gap: {
    width: '20%',
  },
});

export default styles;
