import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, ScrollView, TextInput, StatusBar, Alert, TouchableOpacity, Platform } from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'
import httpClient from 'root/services/http-client'
import { validateEmail } from 'root/services/utils'
import {getRoom, USER_ID} from 'root/services/request'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Contact({ navigation }) {
    const marginTop = 20
    const [error, setError] = useState({ name: '', articleName: '', roomNumber: '', email: '', phone: '', content: '' })
    const [name, setName] = useState('')
    const [articleName, setArticleName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')

    const updatePhone = (val) => {
        if (val.length > 13) return
        setPhone(val)
    }

    const resetField = () => {
        setName('')
        setArticleName('')
        setRoomNumber('')
        setEmail('')
        setPhone('')
        setContent('')
    }
    useEffect(() => {
        function getInfo () {
            AsyncStorage.getItem(USER_ID).then(userId => {
                if (!userId) return
                Promise.all([httpClient.get(`get_resident?resident_id=${userId}`), getRoom()])
                    .then(res => {
                        const { name, mail, tel1 } = res[0].data.data.resident
                        const { article_name, room_number } = res[1]
                        setArticleName(article_name)
                        setRoomNumber(room_number)
                        setName(name)
                        setEmail(mail)
                        setPhone(tel1)
                    })
                .catch(({ data }) => {
                    Alert.alert('エラー', data.error[0], [
                        { text: 'OK' }
                    ])
                })
            })
        }
        getInfo()
    }, [])
    useEffect(() => {
        let val = phone
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
            setPhone(val)
        }
    }, [phone])

    const onSubmit = () => {
        let check = true
        if (!articleName) {
            setError((val) => ({ ...val, articleName: '物件名を入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, articleName: '' }))
        }
        if (!roomNumber) {
            setError((val) => ({ ...val, roomNumber: '号室を入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, roomNumber: '' }))
        }
        if (!name) {
            setError((val) => ({ ...val, name: 'お名前を入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, name: '' }))
        }
        if (!email) {
            setError((val) => ({ ...val, email: 'メールアドレスを入力してください。' }))
            check = false
        } else if (!validateEmail(email)) {
            setError((val) => ({ ...val, email: 'メールアドレスを正く入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, email: '' }))
        }
        if (!phone) {
            setError((val) => ({ ...val, phone: '電話番号を入力してください。' }))
            check = false
        } else if (phone.length < 13) {
            setError((val) => ({ ...val, phone: '電話番号は090-1234-5678の形式で入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, phone: '' }))
        }
        if (!content) {
            setError((val) => ({ ...val, content: 'お問い合わせ内容を入力してください。' }))
            check = false
        } else {
            setError((val) => ({ ...val, content: '' }))
        }
        if (!check) return

        const formData = new FormData()
        formData.append('article_name', articleName)
        formData.append('room_number', roomNumber)
        formData.append('name', name)
        formData.append('mail', email)
        formData.append('phone_number', phone)
        formData.append('content', content)

        httpClient.post('send_mail_support', formData)
            .then(({ data }) => {
                resetField()
                navigation.navigate('ContactSent')
            })
            .catch(({ data }) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
    }

    const errortInputStyle = { borderWidth: 1, borderColor: Colors.red, backgroundColor: Colors.pink }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' ? true : false} behavior="padding" style={{flexGrow: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
                <View style={{ padding: 20 }}>
                    <StatusBar backgroundColor={Colors.primary} />
                    <Text style={style.paragraph}>{"下記フォームに必要事項をご記入ください。"}</Text>
                    {/* article name */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"物件名"}</Text>
                        {!!error.articleName && (<Text style={style.error}>{" ※" + error.articleName}</Text>)}
                    </View>
                    <TextInput style={[GlobalStyles.input, { marginTop: 5 }, !!error.articleName && errortInputStyle]}
                        placeholder="000"
                        keyboardType="default"
                        value={articleName}
                        onChangeText={(val) => { setArticleName(val) }}
                    />
                    {/* room number */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"号室"}</Text>
                        {!!error.roomNumber && (<Text style={style.error}>{" ※" + error.roomNumber}</Text>)}
                    </View>
                    <TextInput style={[GlobalStyles.input, { marginTop: 5 }, !!error.roomNumber && errortInputStyle]}
                        placeholder="000"
                        keyboardType="default"
                        value={roomNumber}
                        onChangeText={(val) => { setRoomNumber(val) }}
                    />
                    {/* name */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"お名前"}</Text>
                        {!!error.name && (<Text style={style.error}>{" ※" + error.name}</Text>)}
                    </View>
                    <TextInput style={[GlobalStyles.input, { marginTop: 5 }, !!error.name && errortInputStyle]}
                        placeholder="山田太郎"
                        keyboardType="default"
                        value={name}
                        onChangeText={(val) => { setName(val) }}
                    />
                    {/* email */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"メールアドレス"}</Text>
                        {!!error.email && (<Text style={style.error}>{" ※" + error.email}</Text>)}
                        {!!error.email || (<Text style={[GlobalStyles.fontNote, { paddingBottom: 2, alignSelf: 'flex-end' }]}>{" ※半角"}</Text>)}
                    </View>
                    <TextInput style={[GlobalStyles.input, { marginTop: 5 }, !!error.email && errortInputStyle]}
                        placeholder="leon@gmail.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(val) => { setEmail(val) }}
                    />
                    {/* phone */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"電話番号"}</Text>
                        <Text style={[GlobalStyles.fontNote, { paddingBottom: 2, alignSelf: 'flex-end' }]}>{" ※半角、ハイフンなし"}</Text>
                    </View>
                    {!!error.phone && (<Text style={{ ...style.error, alignSelf: 'flex-start' }}>{" ※" + error.phone}</Text>)}
                    <TextInput style={[GlobalStyles.input, { marginTop: 5 }, !!error.phone && errortInputStyle]}
                        placeholder="09012345678"
                        keyboardType="number-pad"
                        value={phone}
                        maxLength={13}
                        onChangeText={(val) => { updatePhone(val) }}
                    />
                    {/* content */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={style.header}>{"お問い合わせ内容"}</Text>
                        {!!error.content && (<Text style={style.error}>{" ※" + error.content}</Text>)}
                    </View>
                    <TextInput style={[GlobalStyles.input, { marginTop: 5, height: 100 }, !!error.content && errortInputStyle]}
                        multiline
                        placeholder="ご要望をご記入ください。"
                        value={content}
                        onChangeText={(val) => { setContent(val) }}
                    />

                    <Text style={[style.paragraph, { marginTop }]}>
                        <Text style={{ color: Colors.blue, textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Policy')}>
                            {"利用規約"}
                        </Text>
                        <Text style={{ color: Colors.blue }}>{"・"}</Text>
                        <Text style={{ color: Colors.blue, textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Privacy')}>
                            {"個人情報"}
                        </Text>
                        {"の取扱いをご確認いただき、ご同意の上で送信してください。"}
                    </Text>
                    <TouchableOpacity onPress={onSubmit} style={{ justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: 8, marginTop: 15, height: 50 }}>
                        <Text style={{ ...GlobalStyles.fontNormal, textAlign: 'center', fontWeight: 'bold', color: Colors.white }}>送信する</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    header: {
        ...GlobalStyles.fontNormal,
        lineHeight: 20,
        fontWeight: 'bold'
    },
    paragraph: {
        ...GlobalStyles.fontNormal,
        lineHeight: 24
    },
    error: {
        ...GlobalStyles.fontNote,
        alignSelf: 'flex-end',
        paddingBottom: 2,
        color: Colors.red,
        fontWeight: 'bold'
    }
})