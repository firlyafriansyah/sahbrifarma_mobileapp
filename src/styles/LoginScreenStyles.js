import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 23,
    marginTop: -80,
  },
  wrapper: {
    marginBottom: 100,
  },
  image: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 28,
    color: '#2F3542',
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    marginTop: -30,
  },
  loginWrapper: {
    borderRadius: 26,
    backgroundColor: '#fff',
    elevation: 12,
    padding: 30,
    marginBottom: 55,
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 6,
  },
  checkBoxStyle: {
    marginLeft: 5,
    marginBottom: 10,
  },
  checkBoxIconStyle: {
    borderColor: '#A4B0BE80',
    borderRadius: 8,
  },
  checkBoxTextStyle: {
    textDecorationLine: 'none',
  },
  submitBtn: {
    paddingVertical: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5352ED',
    borderRadius: 26,
    elevation: 12,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  touchable: {borderRadius: 26},
  errorText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapper: {
    width: '50%',
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: 'center',
  },
  textModal: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
