import React, {useState, useEffect} from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView
  } from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import {CheckBox} from 'react-native-elements'
import { window } from "../../constants/Layouts"
import {validateEmail} from 'root/services/utils'
import CommonInfo from './CommonInfo'
const {width} = window

export default function KeyForm({navigation}) {
    const marginTop = 5
    const marginTop2 = 15
    const [textForm, setTextForm] = useState({ email: '', phone: '', amount: null})
    const [contactMethod, setContactMethod] = useState('1') // 1: email, 2: phone
    const [billSendMethod, setBillSendMethod] = useState('1') // 1: email, 2: post
    const [user, setUser] = useState({articleName: '', roomNumber: '', name: '', furigana: ''})
    const [err, setErr] = useState({ name: '', email: '', phone: '', amount: ''})

    const updatePhone = (val) => {
        if (val.length > 13) return
        setTextForm(prev => ({...prev, phone: val}))
    }
      useEffect(() => {
        let val = textForm.phone
        let isDirty = false
        if (val.length >= 4 && val[3] !== '-') {
          val = val.substring(0, 3) + '-' + val.substring(3)
          isDirty = true
        }
        if (val.length >= 9 && val[8] !== '-') {
          val = val.substring(0, 8) + '-' + val.substring(8)
          isDirty = true
        }
        if (isDirty) {
            val = val.substring(0, 13)
            setTextForm(prev => ({...prev, phone: val}))
        }
      }, [textForm.phone])

    const check = () => {
        let flag = true
        if (!textForm.email.trim()) {
            setErr(prev => ({...prev, email: 'メールアドレスを入力してください。'}))
            flag = false
        } else if (!validateEmail(textForm.email)) {
            setErr(prev => ({...prev, email: 'メールアドレスを正く入力してください。'}))
            flag = false
        }
        if (!textForm.phone.trim()) {
            setErr(prev => ({...prev, phone: '電話番号を入力してください。'}))
            flag = false
        } else if (textForm.phone.length < 13) {
            setErr(prev => ({...prev, phone: '電話番号は090-1234-5678の形式で入力してください。'}))
            flag = false
        }
        if (!textForm.amount) {
            setErr(prev => ({...prev, amount: '本数を入力してください。'}))
            flag = false
        }
        return flag
    }

    const submit = () => {
        const valid = check()
        if (!valid) return
        navigation.navigate('KeyFormConfirm', {...textForm, contactMethod, billSendMethod, user})
    }

    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios' ? true : false} behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"鍵の追加申請フォーム"}</Text>
                <CommonInfo localStyle={{marginTop: 40}} user={user} setUser={setUser} />
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"メールアドレス"}</Text>
                {!!err.email && (<Text style={style.error}>{" ※" + err.email}</Text>)}
                <TextInput value={textForm.email} onChangeText={(val) => {setErr((prev) => ({...prev, email: ''}));setTextForm(prev => ({...prev, email: val}))}} style={{...GlobalStyles.input, marginTop}} placeholder="example@abc.com" keyboardType="email-address" />
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"電話番号（半角数字のみ　携帯電話番号可）"}</Text>
                {!!err.phone && (<Text style={style.error}>{" ※" + err.phone}</Text>)}
                <TextInput value={textForm.phone} onChangeText={(val) => {setErr((prev) => ({...prev, phone: ''}));updatePhone(val)}} style={{...GlobalStyles.input, marginTop}} placeholder="例）08012345678" keyboardType="numeric" />
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: marginTop2}}>{"当社からの連絡希望"}</Text>
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        center
                        title="メール"
                        checked={contactMethod==='1'}
                        onPress={() => setContactMethod('1')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0, paddingLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                    <CheckBox
                        center
                        title="電話"
                        checked={contactMethod==='2'}
                        onPress={() => setContactMethod('2')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                </View>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop}}>{"鍵代請求書の送付方法"}</Text>
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        center
                        title="メール"
                        checked={billSendMethod==='1'}
                        onPress={() => setBillSendMethod('1')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0, paddingLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                    <CheckBox
                        center
                        title="電話"
                        checked={billSendMethod==='2'}
                        onPress={() => setBillSendMethod('2')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                </View>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop}}>{"ご希望の本数（半角数字のみ）"}</Text>
                {!!err.amount && (<Text style={style.error}>{" ※" + err.amount}</Text>)}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop}}>
                    <TextInput value={textForm.amount} onChangeText={(val) => {setErr((prev) => ({...prev, amount: ''}));setTextForm(prev => ({...prev, amount: val}))}} style={{...GlobalStyles.input, width: width * 0.25}} placeholder="例）1" keyboardType="numeric" />
                    <Text style={{...GlobalStyles.fontNormal, marginLeft: 5}}>本</Text>
                </View>
                <TouchableOpacity onPress={submit} style={{justifyContent: 'center', backgroundColor: Colors.primary, height: 50, borderWidth: 1, borderColor: Colors.primary, marginTop: 40, borderRadius: 10 }}>
                    <Text style={{...GlobalStyles.fontNormal, textAlign: 'center', color: Colors.white, fontWeight: 'bold'}}>申請の内容を確認する</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    error: {
        ...GlobalStyles.fontNote,
        alignSelf: 'flex-start',
        paddingBottom: 2,
        color: Colors.red,
        fontWeight: 'bold'
    }
  });
  