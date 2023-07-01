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
  },
  subTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 24,
  },
  historyEmpty: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
  },
  cardForDownload: {
    display: 'none',
  },
});

export default styles;
