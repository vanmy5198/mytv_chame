import React from "react";
import {
    Text,
    View,
    ScrollView,
    Alert
  } from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { Button} from 'react-native-elements'
import httpClient from 'root/services/http-client'

export default function KeyFormConfirm({navigation, route}) {
    const marginTop = 5
    const marginTop2 = 15
    const showAlert = () => {
        Alert.alert("", "この内容で送信しますか？\n送信した後は取り消しができません。", [
            { text: "キャンセル", style: 'cancel' },
            { text: "OK", onPress: () => send() },
          ]);
    }
    const send = () => {
        const formData = new FormData()
        formData.append('article_name', route.params.user.articleName)
        formData.append('room_name', route.params.user.roomNumber)
        formData.append('name', route.params.user.name)
        formData.append('furi_gana', route.params.user.furigana)
        formData.append('mail', route.params.email)
        formData.append('phone_number', route.params.phone)
        formData.append('option_contact', route.params.contactMethod)
        formData.append('option_reciept', route.params.billSendMethod)
        formData.append('count', route.params.amount)

        httpClient.post('send_request_key', formData)
            .then(({data}) => {
                // console.log('data', data)
                showAlertDone()
            })
            .catch(({data}) => {
                Alert.alert('', data.error[0], [
                    { text: 'OK' }
                ])
            })
    }
    const showAlertDone = () => {
        Alert.alert('', '内容の送信が完了しました。', [
            { text: 'OK', onPress: () => navigation.navigate('Main') }
        ])
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"鍵の追加申請　内容確認"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: 40, fontWeight: 'bold'}}>{"物件名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.user.articleName}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"号室（半角数字のみ）"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.user.roomNumber}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"名前"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.user.name}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"フリガナ"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.user.furigana}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"メールアドレス"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.email}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"電話番号（半角数字のみ　携帯電話番号可）"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.phone}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"当社からの連絡希望"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.contactMethod === '1' ? 'メール' : '電話'}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"鍵代請求書の送付方法"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{route.params.billSendMethod === '1' ? 'メール' : '電話'}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"ご希望の本数（半角数字のみ）"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{ route.params.amount + "本"}</Text>

                <Button title="送信する"
                    titleStyle={{...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold'}}
                    containerStyle={{ borderWidth: 1, borderColor: Colors.primary, marginTop: 40, backgroundColor: Colors.white, borderRadius: 10}}
                    buttonStyle={{backgroundColor: Colors.primary, height: 50 }}
                    onPress={showAlert}
                />
                <Button title="編集画面に戻る"
                    titleStyle={{...GlobalStyles.fontNormal, fontWeight: 'bold'}}
                    containerStyle={{borderWidth: 1, borderColor: Colors.grayLight, marginTop: 15, backgroundColor: Colors.white, borderRadius: 10}}
                    buttonStyle={{backgroundColor: Colors.white, height: 50 }}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    )
}