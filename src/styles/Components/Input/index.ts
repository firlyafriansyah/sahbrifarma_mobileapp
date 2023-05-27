import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    color: '#000000',
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  slash: {
    color: '#a9abb0',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  input: {
    color: '#2F3542',
    paddingVertical: 10,
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  inputWrapper: {
    width: '80%',
  },
  inputDate: {
    color: '#2F3542',
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  inputDateWrapper: {
    display: 'flex',
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    width: '12%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
