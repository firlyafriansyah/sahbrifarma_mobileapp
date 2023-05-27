import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#2F3542',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  description: {
    fontSize: 24,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: '#2F3542',
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#2F3542',
  },
  logo: {
    width: '40%',
    height: 200,
  },
  actionContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
  },
  logoutButton: {
    width: '70%',
  },
  updateButton: {
    borderRadius: 10,
    marginLeft: '5%',
    width: '25%',
    paddingVertical: 12,
    backgroundColor: '#10ac84',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startWorkButton: {
    width: '70%',
  },
});

export default styles;
