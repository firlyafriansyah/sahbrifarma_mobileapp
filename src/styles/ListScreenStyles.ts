import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 25,
  },
  listWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  endText: {
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    width: '95%',
    height: 80,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  list: {
    width: '90%',
  },
  listTitle: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
  listSubtitle: {
    color: '#1c1c1c',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    width: '10%',
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    marginLeft: 5,
  },
  statusText: {
    color: '#FFFFFF',
  },
});

export default styles;
