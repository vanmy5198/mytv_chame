import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Footer3({localStyle}) {
    const navigation = useNavigation()
    return (
        <View>
            <View style={{...localStyle, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('WebView', {url: 'https://home.tokyo-gas.co.jp/gas/userguide/anzen/emergency/kusai.html', name: '東京ガス'})} style={{backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, flexGrow: 1, maxWidth: '80%'}}>
                    <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"東京ガス\nガス漏れ通報時サイトページ"}</Text>
                </TouchableOpacity>
            </View>
            <View style={{...localStyle, flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate('WebView', {url: 'https://www.osakagas.co.jp/info/contact.html?_ga=2.61801583.216820008.1601262614-26223875.1601262614#gasleak', name: '大阪ガス'})} style={{backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, flexGrow: 1, maxWidth: '80%'}}>
                    <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"大阪ガス\nガス漏れ通報時サイトページ"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}