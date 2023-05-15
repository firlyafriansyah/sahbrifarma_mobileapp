import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  inputWrapper: {
    width: '80%',
  },
  iconWrapper: {
    width: '20%',
  },
});

export default styles;
