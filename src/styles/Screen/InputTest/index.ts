import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  wrapper: {
    display: 'flex',
  },
  inputWrapper: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#000000',
  },
  bodyTestWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  posturWrapper: {
    width: '37%',
  },
  tempWrapper: {
    width: '20%',
  },
});

export default styles;
