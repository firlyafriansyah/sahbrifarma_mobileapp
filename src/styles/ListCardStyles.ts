import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'rgba(119, 139, 235, 0.1)',
    borderRadius: 15,
    marginVertical: 3,
  },
  iconWrapper: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c5ce7ee',
  },
  sequence: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 40,
  },
  informationWrapper: {
    display: 'flex',
    width: '60%',
    padding: 15,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 24,
    width: '95%',
    marginVertical: 1,
  },
  idpasien: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  actionWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
});

export default styles;
