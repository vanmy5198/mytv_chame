import React from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import LoginFooter from 'root/components/LoginFooter'
import GlobalStyles from 'root/styles'
import Colors from 'root/constants/Colors'
import {window} from 'root/constants/Layouts'
const {height} = window

export default function Resend ({navigation}) {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{flexGrow: 1}}>
                <View style={{paddingTop: 40, paddingHorizontal: 20, backgroundColor: "white", flexGrow: 1, paddingBottom: 20}}>
                    <Text style={{...GlobalStyles.fontNormal, textAlign: 'center', color: Colors.red}}>⚠︎認証番号が届かない方へ</Text>
                    <Text style={{...GlobalStyles.fontNormal, marginTop: 15}}>{"認証番号を再送することもできます。もう一度電話番号を入力してください。\n\n※SMSが届かない場合は、SMS受信設定を確認してください。\nそれでも届かない場合は、お問い合わせください｡"}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('InputPhone')} style={{justifyContent: 'center', backgroundColor: '#DEDEDE', borderRadius: 8, marginTop: 30, height: 50}}>
                        <Text style={{color: '#888888', textAlign: 'center', fontWeight: 'bold'}}>認証コードを再送</Text>
                    </TouchableOpacity>
                </View>
                <LoginFooter style={{flex: 1, marginTop: 20}} navigation={navigation} />
            </View>
        </ScrollView>
    )
}