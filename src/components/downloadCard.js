// import {
//   faChevronRight,
//   faMapMarkedAlt,
// } from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import React from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   ImageBackground,
// } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import QRCode from 'react-native-qrcode-svg';

// const DownloadCard = props => {
//   const createPDF = async () => {
//     let options = {
//       html: `
//       <div>
//         ${(
//           <View style={style.cardWrapper}>
//             <ImageBackground
//               source={require('../../assets/images/card_bg.png')}
//               imageStyle={style.imageBgStyle}
//               style={style.cardBackground}>
//               <Text style={style.pasienName}>{props.nama}</Text>
//               <View style={style.cardDetail}>
//                 <View style={{width: '50%'}}>
//                   <Text style={style.lastCheck}>Berobat Terakhir</Text>
//                   <Text style={style.dateCheck}>{props.dateCheck}</Text>
//                   <View style={style.locationWrapper}>
//                     <FontAwesomeIcon icon={faMapMarkedAlt} size={15} />
//                     <Text style={style.location}>{props.location}</Text>
//                   </View>
//                 </View>
//                 <View style={style.qrCodeStyle}>
//                   <QRCode value={props.id} size={80} />
//                   <Text style={style.idPasien}>ID : {props.id}</Text>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//         )}
//       </div>
//       `,
//       fileName: `${props.nama}_${props.id}`,
//       directory: 'Documents',
//     };

//     let file = await RNHTMLtoPDF.convert(options);
//     // console.log(file.filePath);
//     alert(`File Card tersimpan di : ${file.filePath}`);
//   };

//   return (
//     <View>
//       <TouchableWithoutFeedback onPress={() => createPDF()}>
//         <View style={style.categoryStyle}>
//           <Image
//             source={require('../../assets/images/hapus_pasien.png')}
//             style={style.imageStyle}
//           />
//           <Text style={style.textStyle}>Download Card</Text>
//           <FontAwesomeIcon icon={faChevronRight} size={20} />
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   categoryStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   imageStyle: {
//     width: 64,
//     height: 64,
//   },
//   textStyle: {
//     flex: 0.6,
//     fontSize: 18,
//     fontFamily: 'Poppins-Medium',
//     color: '#2F3542',
//   },
//   cardWrapper: {
//     flex: 1,
//     width: '100%',
//     marginBottom: 30,
//   },
//   cardBackground: {
//     flex: 1,
//     elevation: 3,
//     borderRadius: 15,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     paddingHorizontal: 23,
//     paddingVertical: 28,
//   },
//   imageBgStyle: {
//     borderRadius: 15,
//   },
//   cardDetail: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   pasienName: {
//     fontSize: 24,
//     fontFamily: 'Poppins-Medium',
//     marginRight: 50,
//     marginBottom: 10,
//     color: '#382F42',
//   },
//   lastCheck: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Medium',
//     color: '#646975',
//   },
//   dateCheck: {
//     fontSize: 14,
//     fontFamily: 'Poppins-Medium',
//     marginBottom: 20,
//     color: '#2F4237',
//   },
//   locationWrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 10,
//   },
//   location: {
//     fontSize: 14,
//     fontFamily: 'Poppins-Medium',
//     color: '#2F3542',
//     marginLeft: 10,
//     marginBottom: -4,
//   },
//   qrCodeStyle: {
//     alignItems: 'center',
//   },
//   idPasien: {
//     marginTop: 10,
//     color: '#2F3542',
//   },
// });

// export default DownloadCard;
