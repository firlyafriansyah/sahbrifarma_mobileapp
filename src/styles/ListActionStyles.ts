import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '23%',
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
  contentWrapper: {
    width: '65%',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 22,
  },
  subTitle: {
    color: '#000000',
    fontFamily: 'Poppins-Light',
  },
  arrowWrapper: {
    display: 'flex',
    width: '12%',
    justifyContent: 'flex-start',
  },
});

export default styles;
