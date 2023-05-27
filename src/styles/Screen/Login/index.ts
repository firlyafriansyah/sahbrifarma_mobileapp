import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.56)',
  },
  heading: {
    fontSize: 30,
    color: '#2F3542',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  description: {
    fontSize: 24,
    color: '#2F3542',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  loginWrapper: {
    padding: 30,
    marginTop: 30,
  },
  checkBoxStyle: {
    marginLeft: 5,
    marginBottom: 10,
  },
  checkBoxIconStyle: {
    marginTop: -5,
    borderColor: '#A4B0BE80',
    borderRadius: 8,
  },
  checkBoxTextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'none',
  },
  wrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  made: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  imagename: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
  },
  errorText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
});

export default styles;
