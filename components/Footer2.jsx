import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Footer2({localStyle}) {
    const navigation = useNavigation()
    return (
        <View style={{...localStyle, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('TroubleContact') } style={{backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 20, paddingHorizontal: 20, flexGrow: 1, maxWidth: '80%'}}>
                <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"24時間WEB受付"}</Text>
            </TouchableOpacity>
        </View>
    )
}