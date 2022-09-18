import React, {useState} from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Alert,
    Image
  } from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import {CheckBox, Button} from 'react-native-elements'
import httpClient from 'root/services/http-client'
import {convertImg} from 'root/services/utils'
import {window} from 'root/constants/Layouts'
const {width} = window

export default function CancelContract({navigation, route}) {
    const {params} = route
    const marginTop = 5
    const marginTop2 = 10
    const marginLeft = 15
    const [checked, setChecked] = useState(false)
    const send = () => {
        const formData = new FormData()
        const adaptedImgs = params.images.length > 0 ? convertImg(params.images) : []
        for (let i of adaptedImgs) {
            formData.append('file_cancel[]', i)
        }
        formData.append('article_name', params.user.articleName)
        formData.append('room_name', params.user.roomNumber)
        formData.append('name', params.user.name)
        formData.append('furigana', params.user.furigana || '')
        formData.append('mail', params.email)
        formData.append('phone_number', params.phone)
        formData.append('contact_method', params.contactMethod)
        formData.append('year_cancel', params.cancelDate.year)
        formData.append('month_cancel', params.cancelDate.month)
        formData.append('day_cancel', params.cancelDate.date)
        formData.append('year_hope', params.witnessDate.year)
        formData.append('month_hope', params.witnessDate.month)
        formData.append('day_hope', params.witnessDate.date)
        formData.append('hours_hope', params.witnessDate.time)
        formData.append('undecided', params.witnessCheck ? '1' : '0')
        formData.append('person_hope', params.witnesser)
        formData.append('zip_code_new', params.address.postalCode || '')
        formData.append('perfecture_new', params.address.province)
        formData.append('city_new', params.address.address || '')
        formData.append('article_name_new', params.address.building || '')
        formData.append('undecided_dest', params.address.decidedNewAddress ? '1' : '0')
        formData.append('group_company', params.introduce ? '1' : '0')
        let reason = ''
        switch(params.reason) {
            case '結婚': reason = '1';break;
            case '転勤': reason = '2';break;
            case '転職': reason = '3';break;
            case '帰郷': reason = '4';break;
            case 'その他': reason = '5';break;
            default: reason = ''
        }
        formData.append('reason', reason)
        formData.append('bank_name', params.account.bankName || '')
        formData.append('branch_name', params.account.branch || '')
        formData.append('branch_number', params.account.branchNumber || '')
        formData.append('type', params.account.type || '')
        formData.append('account_name', params.account.accountName || '')
        formData.append('account_furigana', params.account.furigana || '')
        formData.append('account_number', params.account.accountNumber || '')
        formData.append('other_question', params.content || '')
        httpClient.post('send_request_cancel', formData)
            .then(() => {
                showAlertDone()
            })
            .catch(({data}) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
    }
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
    const formatPostalCode = () => {
        return params.address.postalCode.slice(0, 3) + '-' + params.address.postalCode.slice(4)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"解約申請内容の確認"}</Text>
                <Text style={{...GlobalStyles.fontSubHeader, marginTop: 40}}>{"契約者様ご本人の確認"}</Text>
                <View style={style.divider}></View>
                <Text style={{...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop}}>{"運転免許証・健康保険証・パスポート"}</Text>
                {params.images.length > 0 && 
                    (<View style={{flexDirection: 'row', marginTop}}>
                        {params.images.map((i, ind) => (
                            <View key={ind} style={{position: 'relative', width: width / 6, height: width / 6, marginLeft:  ind > 0 ? 5:0}}>
                                <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                            </View>
                        ))}
                    </View>)
                }
                <Text style={{...GlobalStyles.fontSubHeader, marginTop: 20}}>{"必要事項の入力"}</Text>
                <View style={style.divider}></View>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"【契約者情報】"}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"物件名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.user.articleName}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"号室"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.user.roomNumber}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"氏名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.user.name}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"フリガナ"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.user.furigana}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"連絡先（携帯電話番号）"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.phone}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"メールアドレス"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.email}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"弊社からの連絡方法"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.contactMethod === '1' ? '電話':'メール'}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"解約希望日"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{`${params.cancelDate.year}年${params.cancelDate.month}月${params.cancelDate.date}日`}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"立会希望日"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.witnessCheck ? '未定' : `${params.witnessDate.year}年${params.witnessDate.month}月${params.witnessDate.date}日`}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"立会希望時間"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.witnessCheck ? '未定' : params.witnessDate.time + '時'}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"立会人"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.witnesser === '1' ? "契約者本人" : "契約者以外"}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"転居先住所"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.address.decidedNewAddress ? '未定' : `〒${formatPostalCode()}\n${params.address.province}${params.address.address}\n${params.address.building}`}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"当社グループ会社（株式会社レオンワークス）からの 転居先紹介希望の有無"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.introduce ? '希望する' : '希望しない'}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"解約理由"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.reason}</Text>
                {/* blue text */}
                <Text style={{...style.textHeader, marginTop: 20, color: Colors.blueDark}}>{"【敷金等の返還金振込先指定口座】"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: marginTop2, color: Colors.blueDark}}>{"敷金等の返還金が無い場合は表示されません"}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"銀行名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.bankName}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"支店名"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.branch}</Text>
                <View style={{flexDirection: 'row', marginTop: marginTop2}}>
                    <Text style={{...style.textHeader}}>{"店番号"}</Text>
                    <Text style={GlobalStyles.fontNormal}>{"（半角数字のみ）"}</Text>
                </View>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.branchNumber}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"種類"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.type}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"口座名義"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.accountName}</Text>
                <View style={{flexDirection: 'row', marginTop: marginTop2}}>
                    <Text style={{...style.textHeader}}>{"フリガナ"}</Text>
                    <Text style={GlobalStyles.fontNormal}>{"（全角カナ）"}</Text>
                </View>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.furigana}</Text>
                <View style={{flexDirection: 'row', marginTop: marginTop2}}>
                    <Text style={{...style.textHeader}}>{"口座番号"}</Text>
                    <Text style={GlobalStyles.fontNormal}>{"（半角数字のみ）"}</Text>
                </View>
                <Text style={{...GlobalStyles.fontNormal, marginTop, marginLeft}}>{params.account.accountNumber}</Text>
                <Text style={{...style.textHeader, marginTop: marginTop2}}>{"その他質問"}</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop}}>{params.content}</Text>
                <Text style={{...GlobalStyles.fontSubHeader, marginTop: 40}}>{"注意事項の確認"}</Text>
                <View style={style.divider}></View>
                <Text style={{...GlobalStyles.fontNormal, marginTop: 20}}>
                    <Text onPress={() => navigation.navigate('CancelContractPrecautions')} style={{color: Colors.blueDark, fontWeight: 'bold', textDecorationLine: 'underline'}}>{"注意事項"}</Text>
                    {"をよくお読みいただき、同意いただける場合は送信ボタンを押してください。"}
                </Text>
                <CheckBox
                    center
                    title='同意する'
                    checked={checked}
                    onPress={() => setChecked(prev => !prev)}
                    titleStyle={GlobalStyles.fontNormal}
                    containerStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                    checkedColor={Colors.primary}
                />
                <Button title="送信する"
                    onPress={() => showAlert()}
                    disabled={!checked}
                    titleStyle={{...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold'}}
                    buttonStyle={{marginTop: 20, backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 15}}    
                />
                <Button title="入力画面に戻る"
                    onPress={() => navigation.goBack()}
                    titleStyle={{...GlobalStyles.fontNormal, fontWeight: 'bold'}}
                    buttonStyle={{marginTop: 20, borderRadius: 10, paddingVertical: 15, backgroundColor: Colors.white, borderWidth: 0.5, borderColor: Colors.grayLight}}    
                />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    textHeader: {
        ...GlobalStyles.fontNormal,
        fontWeight: 'bold'
    },
    divider: {borderWidth: 0.5, borderColor: Colors.grayBorder}
})