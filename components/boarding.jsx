import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import GlobalStyles from '../styles'
import a from '../constants/Layouts'

// export default function Walkthrough({ index, textHeader, textSubHeader, textNote, textContent, image }) {
//     if (index === 0) {
//         return (
//             <View style={[styles.slide, {alignItems: "center", backgroundColor: '#fff'}]}>
//                 <Text style={[styles.textHeader, GlobalStyles.fontHeader]}>{textHeader}</Text>
//                 <Text style={[styles.textContent, {marginTop: 30}]}>{textContent}</Text>
//                 <Image style={{ flex: 1, width: window.width - 70, height: 275, alignContent: "center" }} source={image} />
//             </View>
//         )
//     } else {
//         return (
//             <View style={styles.slide, {backgroundColor: '#D1F2F2'}}>
//                 <Text style={[styles.textHeader, GlobalStyles.fontHeader]}>{textHeader}</Text>
//                 <Text style={[styles.textContent, GlobalStyles.fontNote, {marginTop: 30}]}>{textNote}</Text>
//                 <View style={styles.main}>
//                     <Text style={[styles.textHeader, GlobalStyles.fontSubHeader]}>{textSubHeader}</Text>
//                     <Image resizeMode="contain" style={{ width: window.width - 120, height: window.width *  0.5, marginTop: 20}} source={image} />
//                     <Text style={[styles.textContent, GlobalStyles.fontNormal, {marginTop: 20}]}>{textContent}</Text>
//                 </View>
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     slide: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     textHeader: {
//         color: '#00aab7',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         width: '100%',
//         letterSpacing: 1,
//     },
//     textContent: {
//         lineHeight: 20,
//         letterSpacing: 0,
//         color: "#333333"
//     },
//     main: {
//         height: '75%',
//         backgroundColor: "#FDFFC9",
//         padding: 20,
//         paddingTop: 30,
//         paddingBottom: 30,
//         borderRadius: 10,
//         alignItems: "center",
//         marginTop: 10
//     }
// })