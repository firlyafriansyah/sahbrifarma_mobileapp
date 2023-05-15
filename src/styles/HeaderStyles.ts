import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
  },
  actionOne: {
    display: 'flex',
    width: '20%',
    alignItems: 'flex-start',
  },
  title: {
    width: '60%',
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  actionTwo: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    width: '20%',
    textAlign: 'right',
    color: '#5783FC',
  },
});

export default styles;
