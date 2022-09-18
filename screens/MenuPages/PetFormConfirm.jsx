import React from "react";
import {
    Text,
    View,
    ScrollView,
    Alert,
    TouchableOpacity
  } from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { window } from "../../constants/Layouts"
import httpClient from 'root/services/http-client'

export default function PetFormConfirm ({navigation, route}) {
    const marginTop2 = 15
    const showAlert = () => {
        Alert.alert("", "この内容で送信しますか？\n送信した後は取り消しができません。", [
            { text: "キャンセル", style: 'cancel' },
            { text: "OK", onPress: send },
          ]);
    }
    const showAlertDone = () => {
        Alert.alert('', '内容の送信が完了しました。', [
            { text: 'OK', onPress: () => navigation.navigate('Main') }
        ])
    }

    const send = () => {
        const formData = new FormData()
        formData.append('pet_kind', route.params.petType)
        formData.append('product_kind', route.params.variety)
        formData.append('name', route.params.user.name)
        formData.append('article_name', route.params.user.articleName)
        formData.append('room_name', route.params.user.roomNumber)
        formData.append('furi_gana', route.params.user.furigana)
        formData.append('mail', route.params.email)
        formData.append('height', route.params.length)
        formData.append('day_hope', route.params.date)
        formData.append('month_hope', route.params.month)
        formData.append('year_hope', route.params.year)
        httpClient.post('send_request_pet', formData)
            .then(() => {
                showAlertDone()
            })
            .catch(({data}) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                  ])
            })
    }
    const marginLeft = 15
    const marginTop = 5
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"ペット飼育申請の内容確認"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: 40, fontWeight: 'bold'}}>{"【契約者情報】"}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"物件名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{route.params.user.articleName}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: marginTop2}}>{"号室"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{route.params.user.roomNumber}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"氏名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{route.params.user.name}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"フリガナ"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{route.params.user.furigana}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: 20, fontWeight: 'bold'}}>{"【ペット飼育仮申請情報】"}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"ペットの種類"}</Text>
                <Text style={{...GlobalStyles.fontNormal}}>{route.params.petType === '1' ? '犬' : '猫'}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"品種"}</Text>
                <Text style={{...GlobalStyles.fontNormal}}>{route.params.variety}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"体長（半角数字のみ）"}</Text>
                <Text style={{...GlobalStyles.fontNormal}}>{route.params.length + "cm"}</Text>
                <Text style={{...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop: marginTop2}}>{"※成獣の状態で体長５０ｃｍ（頭・尻尾は除く）を超える可能性のあるペットの飼育申請はできません。"}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"飼育開始希望日"}</Text>
                <Text style={{...GlobalStyles.fontNormal}}>{`${route.params.year}年${route.params.month}月${route.params.date}日`}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"連絡先メールアドレス（ペット飼育申請 可否 送信先）"}</Text>
                <Text style={{...GlobalStyles.fontNormal}}>{route.params.email}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'stretch', alignContent: 'stretch'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{width: (window.width - 50) / 2, alignItems: 'center', borderWidth: 0.5, marginRight: 10, justifyContent: 'center', borderRadius: 8,  borderColor: Colors.grayLight}}>
                        <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold'}}>入力画面に戻る</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showAlert()} 
                        style={{width: (window.width - 50) / 2, backgroundColor: Colors.primary, marginLeft: 10, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20}} >
                        <Text style={{...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold'}}>送信する</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}