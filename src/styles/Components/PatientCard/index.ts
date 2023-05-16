import {Dimensions, StyleSheet} from 'react-native';

const cardWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
  cardWrapper: {
    height: cardWidth / 1.585772508336421,
  },
  imageBgStyle: {
    borderRadius: 15,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 15,
    resizeMode: 'cover',
    padding: 20,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  informationWrapper: {
    width: '70%',
    height: cardWidth / 1.585772508336421 - 40,
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 40,
  },
  name: {
    letterSpacing: 2,
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  id: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    letterSpacing: 2,
  },
  additionalInformationWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  birthdayWrapper: {
    marginRight: 30,
  },
  birthdayLabel: {
    fontFamily: 'Poppins-Light',
  },
  birthday: {
    fontFamily: 'Poppins-Light',
    color: '#000000',
  },
  genderLabel: {
    fontFamily: 'Poppins-Light',
  },
  gender: {
    fontFamily: 'Poppins-Light',
    color: '#000000',
  },
  qrWrapper: {
    width: '30%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
