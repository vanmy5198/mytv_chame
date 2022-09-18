import React from "react";
import {
    Text,
    View,
    ScrollView,
    Image
  } from "react-native"
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import {window} from 'root/constants/Layouts'
const {width} = window

export default function Note1() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: 20, paddingHorizontal: 20 }}>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', marginTop: 10 }}>{"■１ヶ月以上の予告期間を定めている場合"}</Text>
                <Image resizeMode="contain" style={{marginTop: 10, width: width - 60, height: (width - 40) * 1.61}} source={require('root/assets/chart1.png')} />
            </View>
        </ScrollView>
    )
}