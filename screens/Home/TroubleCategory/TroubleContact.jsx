import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput, StatusBar, Alert, Image} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import {Button, CheckBox} from 'react-native-elements'
import httpClient from 'root/services/http-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {validateEmail} from 'root/services/utils'
import * as ImagePicker from 'expo-image-picker'
import {window} from 'root/constants/Layouts'
import * as ImageManipulator from 'expo-image-manipulator'
import { getRoom, USER_ID, PHONE_NUMBER } from 'root/services/request'

const {width} = window
export default function TroubleContact({navigation}) {
    const [error, setError] = useState({email: '', content: '', place: '', status: '', maker: ''})
    const [email, setEmail] = useState('')
    const [content, setContent] = useState('')
    const [place, setPlace] = useState('')
    const [status, setStatus] = useState('')
    const [maker, setMaker] = useState('')
    const [contactMethod, setContactMethod] = useState('1') // 1 = phone, 2 = email
    const [user, setUser] = useState({name: '', phone_number: '', article_name: '', room_number: ''})
    const [checked, setChecked] = useState(false)
    const [troubleImage, setTroubleImage] = useState([])
    const [equipImage, setEquipImage] = useState([])
    const [imgBtnEnable, setImgBtnEnable] = useState(true)
    const limit = 640 * 480 * 4 //bytes // max 6 images
    // const limit = 3145728 // 1024 * 768 *4 bytes
    // 1mb = 1048576b
    const pickTroubleImage = async () => {
        // gallery permission
        if (!imgBtnEnable) {
            Alert.alert('エラー', 'chameLEONで画像を選択するにはギャラリーへのアクセス権が必要です。', [
                { text: 'OK' }
            ])
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
        if (!result.cancelled) {
            if (result.width * result.height * 4 > limit) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{resize: {width: 640, height: 480}}],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                )
                setTroubleImage(prev => ([...prev, manipResult]))
            } else setTroubleImage(prev => ([...prev, result]))
        }
      }

    const removeTroubleImage = (index) => {
        setTroubleImage(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]))
    }

    const pickEquipImage = async () => {
        // gallery permission
        if (!imgBtnEnable) {
            Alert.alert('エラー', 'chameLEONで画像を選択するにはギャラリーへのアクセス権が必要です。', [
                { text: 'OK' }
            ])
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
            if (result.width * result.height * 4 > limit) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{resize: {width: 640, height: 480}}],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                )
                setEquipImage(prev => ([...prev, manipResult]))
            } else setEquipImage(prev => ([...prev, result]))
        }
      }

    const removeEquipImage = (index) => {
        setEquipImage(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]))
    }

    useEffect(() => {
        // getInfo()
        AsyncStorage.getItem(USER_ID).then(userId => {
            Promise.all([httpClient.get(`get_resident?resident_id=${userId}`), getRoom(), ImagePicker.requestMediaLibraryPermissionsAsync()])
                .then(async res => {
                    const phone = await AsyncStorage.getItem(PHONE_NUMBER)
                    const {name, tel1} = res[0].data.data.resident
                    const {article_name, room_number} = res[1]
                    setUser(prev => ({...prev, name, phone_number: phone, article_name, room_number}))
                    // setUser(() => ({articleName: article_name, roomNumber: room_number, name, furigana: kana}))
                    // gallery permission
                    const { status } = res[2]
                    if (status !== 'granted') {
                        setImgBtnEnable(false)
                    } else {
                        setImgBtnEnable(true)
                    }
                })
                .catch(({ data }) => {
                    Alert.alert('エラー', data.error[0], [
                        { text: 'OK' }
                    ])
                })
        })
    }, [])

    const onSubmit = () => {
        let check = true
        if (!email) {
            setError((val) => ({...val, email: 'メールアドレスを入力してください。'}))
            check = false
        } else if (!validateEmail(email)) {
            setError((val) => ({...val, email: 'メールアドレスを正く入力してください。'}))
            check = false
        } else setError((val) => ({...val, email: ''}))
        if (!content) {
            setError((val) => ({...val, content: 'お問い合わせ内容を入力してください。'}))
            check = false
        } else setError((val) => ({...val, content: ''}))
        if (!place) {
            setError((val) => ({...val, place: 'お問い合わせ内容を入力してください。'}))
            check = false
        } else setError((val) => ({...val, place: ''}))
        if (!status) {
            setError((val) => ({...val, status: 'お問い合わせ内容を入力してください。'}))
            check = false
        } else setError((val) => ({...val, status: ''}))
        if (!maker) {
            setError((val) => ({...val, maker: 'お問い合わせ内容を入力してください。'}))
            check = false
        } else setError((val) => ({...val, maker: ''}))
        if (!check) return
        navigation.navigate('TroubleContactConfirm', {...user, email, content, place, status, maker, contactMethod, troubleImage, equipImage })
    }
    const errortInputStyle = {borderWidth: 1, borderColor: Colors.red, backgroundColor: Colors.pink}

    const marginTop = 5
    const marginTop2 = 20
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
            <View style={{padding: 20}}>
            <StatusBar backgroundColor={Colors.primary} />
                <Text style={style.paragraph}>{"下記フォームに必要事項をご記入ください。"}</Text>
                {/* 物件名 */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"物件名"}</Text>
                <Text style={{...style.paragraph, marginTop}}>{user.article_name}</Text>
                {/* 号室 */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"号室"}</Text>
                <Text style={{...style.paragraph, marginTop}}>{user.room_number}</Text>
                {/* 物件名 */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"名前"}</Text>
                <Text style={{...style.paragraph, marginTop}}>{user.name}</Text>
                {/* 物件名 */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"電話番号"}</Text>
                <Text style={{...style.paragraph, marginTop}}>{user.phone_number}</Text>
                {/* email */}
                <View style={{flexDirection: 'row', marginTop: marginTop2, alignItems: 'flex-end'}}>
                    <Text style={style.header}>{"メールアドレス"}</Text>
                    {!!error.email && (<Text style={style.error}>{" ※" + error.email}</Text>)}
                    {!!error.email || (<Text style={[GlobalStyles.fontNote, {paddingBottom: 2, alignSelf: 'flex-end'}]}>{"  ※半角英数"}</Text>)}
                </View>
                <TextInput style={[GlobalStyles.input, { marginTop }, !!error.email && errortInputStyle]}
                    placeholder="leon@gmail.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(val) => { setEmail(val) }}
                />
                {/* 弊社からの連絡方法 */}
                <Text style={{...style.header, marginTop: marginTop2 + 5}}>{"弊社からの連絡方法"}</Text>
                <View style={{flexDirection: 'row', marginTop}}>
                    <CheckBox
                        title="電話"
                        checked={contactMethod === '1'}
                        onPress={() => setContactMethod('1')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{marginTop: 0, marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0}}
                        checkedColor={Colors.primary}
                    />
                    <CheckBox
                        title="メール"
                        checked={contactMethod === '2'}
                        onPress={() => setContactMethod('2')}
                        textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                        containerStyle={{marginTop: 0, marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0}}
                        checkedColor={Colors.primary}
                    />
                </View>
                {/* トラブル内容 */}
                <View style={{flexDirection: 'row', marginTop: marginTop2, alignItems: 'flex-end'}}>
                    <Text style={style.header}>{"トラブル内容"}</Text>
                    {!!error.content && (<Text style={style.error}>{" ※" + error.content}</Text>)}
                </View>
                <TextInput style={[GlobalStyles.input, { marginTop, height: 100 }, !!error.content && errortInputStyle]}
                    multiline
                    placeholder="トラブル内容をご記入ください。"
                    value={content}
                    onChangeText={(val) => {setContent(val)}}
                />
                {/* 設備箇所 */}
                <View style={{flexDirection: 'row', marginTop: marginTop2, alignItems: 'flex-end'}}>
                    <Text style={style.header}>{"設備箇所"}</Text>
                    {!!error.place && (<Text style={style.error}>{" ※" + error.place}</Text>)}
                </View>
                <TextInput style={[GlobalStyles.input, { marginTop, height: 100 }, !!error.place && errortInputStyle]}
                    multiline
                    placeholder="トラブルの原因箇所をご記入ください。"
                    value={place}
                    onChangeText={(val) => {setPlace(val)}}
                />
                {/* 状況（いつ頃から　どのような） */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"状況（いつ頃から　どのような）"}</Text>
                {!!error.status && (<Text style={style.error}>{" ※" + error.status}</Text>)}
                <TextInput style={[GlobalStyles.input, { marginTop, height: 100 }, !!error.status && errortInputStyle]}
                    multiline
                    placeholder="トラブルの状況をご記入ください。"
                    value={status}
                    onChangeText={(val) => {setStatus(val)}}
                />
                {/* 状況の写真 */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: marginTop2}}>
                    <Text style={style.header}>{"状況の写真"}</Text>
                    <Button title="ファイルを選択" disabled={troubleImage.length >= 3} onPress={pickTroubleImage} titleStyle={GlobalStyles.fontNote} buttonStyle={{backgroundColor: Colors.white, paddingVertical: 0}} containerStyle={{marginLeft: 10, borderWidth: 1, borderColor: Colors.grayBorder, paddingHorizontal: 5}} />
                </View>
                {troubleImage.length === 0 && <Text style={{...GlobalStyles.fontNote, marginLeft: 5, marginTop}}>{"ファイルが選択されていません"}</Text>}
                {troubleImage.length > 0 && 
                    (<View style={{flexDirection: 'row', marginTop, marginBottom: 30}}>
                        {troubleImage.map((i, ind) => (
                            <View key={ind} style={{position: 'relative', width: width / 6, height: width / 6, marginLeft:  ind > 0 ? 5:0}}>
                                <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                                <Button title="削除" onPress={() => removeTroubleImage(ind)} containerStyle={{ borderColor: Colors.grayBorder, borderWidth: 1, marginTop: 3}} buttonStyle={{backgroundColor: Colors.white}} titleStyle={{...GlobalStyles.fontNote}} />
                            </View>
                        ))}
                    </View>)
                }
                {/* 設備のメーカー名・型式品番 */}
                <Text style={{...style.header, marginTop: marginTop2}}>{"設備のメーカー名・型式品番"}</Text>
                {!!error.maker && (<Text style={style.error}>{" ※" + error.maker}</Text>)}
                <TextInput style={[GlobalStyles.input, { marginTop, height: 100 }, !!error.maker && errortInputStyle]}
                    multiline
                    placeholder="設備のメーカー名・型式品番を ご記入ください。"
                    value={maker}
                    onChangeText={(val) => {setMaker(val)}}
                />
                {/* 設備のメーカー写真 */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: marginTop2}}>
                    <Text style={style.header}>{"設備の写真"}</Text>
                    <Button title="ファイルを選択" disabled={equipImage.length >= 3} onPress={pickEquipImage} titleStyle={GlobalStyles.fontNote} buttonStyle={{backgroundColor: Colors.white, paddingVertical: 0}} containerStyle={{marginLeft: 10, borderWidth: 1, borderColor: Colors.grayBorder, paddingHorizontal: 5}} />
                </View>
                {equipImage.length === 0 && <Text style={{...GlobalStyles.fontNote, marginLeft: 5, marginTop}}>{"ファイルが選択されていません"}</Text>}
                {!!equipImage.length && 
                    (<View style={{flexDirection: 'row', marginTop, marginBottom: 30}}>
                        {equipImage.map((i, ind) => (
                            <View key={ind} style={{position: 'relative', width: width / 6, height: width / 6, marginLeft:  ind > 0 ? 5:0}}>
                                <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                                <Button title="削除" onPress={() => removeEquipImage(ind)} containerStyle={{ borderColor: Colors.grayBorder, borderWidth: 1, marginTop: 3}} buttonStyle={{backgroundColor: Colors.white}} titleStyle={{...GlobalStyles.fontNote}} />
                            </View>
                        ))}
                    </View>)
                }
                {/* note */}
                <Text style={{...GlobalStyles.fontNormal, marginTop: marginTop2}}>※不具合の原因が入居者様の故意・過失により損傷したものや、ご使用方法やお手入れ不足等による場合、および確認不足で故障ではない場合は、出張点検費・修理費用は入居者様のご負担となりますので予めご了承下さい。</Text>
                <Text style={{...GlobalStyles.fontNormal, marginTop: marginTop2}}>
                    {"個人情報のお取り扱いについては"}
                    <Text onPress={() => navigation.navigate('Privacy')} style={{color: Colors.blueDark, fontWeight: 'bold', textDecorationLine: 'underline'}}>{"プライバシーポリシー"}</Text>
                    {"をよくお読みいただき、同意いただける場合は送信ボタンを押してください。"}
                </Text>
                <CheckBox
                    center
                    title="同意する"
                    checked={checked}
                    onPress={() => setChecked(prev => !prev)}
                    textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                    containerStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                    checkedColor={Colors.primary}
                />
                <Button
                    titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                    buttonStyle={{ backgroundColor: Colors.primary, borderRadius: 8, height: 50 }}
                    containerStyle={{marginTop: 15}}
                    title="内容を確認する"
                    disabled={!checked}
                    onPress={onSubmit}
                />
            </View>
        </ScrollView>
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
        paddingBottom: 2,
        color: Colors.red,
        fontWeight: 'bold'
    }
})