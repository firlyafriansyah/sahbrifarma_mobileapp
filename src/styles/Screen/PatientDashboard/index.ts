import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 5,
  },
  container: {
    padding: 20,
  },
  buttonActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonActionWrapper: {
    width: '48%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 1,
  },
  buttonActionText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    marginTop: 10,
  },
  subTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 24,
    marginBottom: 10,
  },
});

export default styles;
