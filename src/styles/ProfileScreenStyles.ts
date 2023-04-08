import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 33,
  },
  headerWrapper: {
    marginTop: 25,
  },
  contentWrapper: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#000000',
    letterSpacing: 2,
  },
  id: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: '50%',
    marginBottom: 10,
  },
  inputWrapper: {
    width: '100%',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
});

export default styles;
