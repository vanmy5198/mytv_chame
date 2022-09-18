import React from 'react'
import {View, Text, TouchableOpacity, Linking} from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import {window} from 'root/constants/Layouts'
const {width} = window
export default function Footer1({localStyle, route}) {
    const navigation = useNavigation()
    return (
        <View style={{...localStyle}}>
            <Text style={{...GlobalStyles.fontSubHeader}}>
                <FontAwesome name="phone" size={16} color="black" />
                {" お電話・WEBのお問い合せ"}
            </Text>
            <View style={{height: 1, backgroundColor: Colors.grayBorder, width: '100%'}}></View>
            <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10}}>{"営業時間：１０：００～１９：００\n（年末年始・GW・夏季休暇除く）\n株式会社レオン都市開発　管理部"}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'stretch', alignContent: 'stretch'}}>
                <TouchableOpacity onPress={() => navigation.navigate(route) } style={{width: width / 2 - 40,backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'center'}}>
                    <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"24時間WEB受付"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('tel:0663562512')} style={{width: width / 2 - 40, backgroundColor: Colors.primary, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10}}>
                    <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"電話をかける\n06-6356-2512"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}