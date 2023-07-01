import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listMedicineRequestCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderWidth: 0.6,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicineRequest: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  deleteButtonWrapper: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});

export default styles;
