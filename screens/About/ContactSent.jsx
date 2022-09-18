import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'

export default function ContactSent ({navigation}) {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
            <View style={{padding: 20}}>
                <Text style={{...GlobalStyles.fontNormal}}>{"お問い合わせを受け付けいたしました。\n確認のため、お客様に自動返信メールをお送りしております。\n\nお問い合わせいただいた内容につきましては、近日中にお返事させていただきます。\n今しばらくお待ちくださいませ。"}</Text>
                <TouchableOpacity onPress={() => navigation.pop(2)} style={{justifyContent: 'center', backgroundColor: '#DEDEDE', borderRadius: 8, marginTop: 30, height: 50}}>
                    <Text style={{color: '#888888', textAlign: 'center', fontWeight: 'bold'}}>戻る</Text>
                </TouchableOpacity>
                <View style={{borderColor: Colors.grayBorder, borderWidth: 0.4, marginTop: 20}}></View>
                <Text style={{...GlobalStyles.fontNormal, color: Colors.red, textAlign: 'center', marginTop: 20}}>⚠︎確認のメールが届かない方へ</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: 10}}>{"数分後に確認のメールが届かない方は、迷惑メールフォルダに振り分けられているか、メールアドレスが正しく入力されていない可能性があります。\n\n大変お手数ですが「info@xxxxxx.jp」こちらのメールアドレスの受信許可の設定をして、再度お問い合わせいただくようお願いいたします。"}</Text>
            </View>
        </ScrollView>
    )
}