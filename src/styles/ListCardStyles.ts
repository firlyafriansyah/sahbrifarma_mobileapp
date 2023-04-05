import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginVertical: 4,
  },
  iconWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6c5ce7',
  },
  informationWrapper: {
    display: 'flex',
    width: '60%',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 20,
    width: '95%',
    marginVertical: 1,
  },
  idpasien: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  actionWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
