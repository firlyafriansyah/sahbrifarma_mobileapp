import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  wrapper: {
    display: 'flex',
  },
  allergiesText: {
    color: '#000000',
  },
  inputWrapper: {
    paddingHorizontal: 20,
  },
  requestMedicineWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#5352ED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 7,
  },
  listMedicineRequestCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderWidth: 1,
    borderRadius: 15,
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
    width: '10%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#000000',
  },
  bodyTestWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  posturWrapper: {
    width: '37%',
  },
  tempWrapper: {
    width: '20%',
  },
  modalRequestContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalRequestWrapper: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 20,
    borderRadius: 15,
  },
  modalRequestHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalRequestTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  error: {
    textAlign: 'center',
    color: '#e84118',
  },
  modalRequestButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalRequestButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#5783FC',
  },
  medicineEmpty: {
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
