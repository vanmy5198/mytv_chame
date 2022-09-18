import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import { window } from 'root/constants/Layouts'
import TableSheet from './TableSheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    getRoom, USER_ID, CHECKED_IN,
    ENTRANCE_STATE, ENTRANCE_OTHER, ENTRANCE_CONTENT,
    KITCHEN_STATE, KITCHEN_OTHER, KITCHEN_CONTENT,
    BATH_STATE, BATH_OTHER, BATH_CONTENT,
    CHANGE_STATE, CHANGE_OTHER, CHANGE_CONTENT,
    LAUNDRY_STATE, LAUNDRY_OTHER, LAUNDRY_CONTENT,
    TOILET_STATE, TOILET_OTHER, TOILET_CONTENT,
    LIVING_STATE, LIVING_OTHER, LIVING_CONTENT,
    STYLE_STATE, STYLE_OTHER, STYLE_CONTENT,
    BALCONY_STATE, BALCONY_OTHER, BALCONY_CONTENT,
    OTHER_STATE, OTHER_OTHER, OTHER_CONTENT
} from 'root/services/request'
import httpClient from 'root/services/http-client'
import * as ImagePicker from 'expo-image-picker'
import { debounce } from 'lodash-es'

const { height } = window
export default function RoomCheckScreen({ route, navigation }) {
    const [isMounted, setIsMounted] = useState(false)
    function transformStateToString(state) {
        return state.reduce((acc, val) => {
            if (acc === '') return acc + val
            return acc + ', ' + val
        }, '')
    }
    const saveTextToStorage = useCallback(
        debounce((key, content) => {
            AsyncStorage.setItem(key, content)
        }, 250), []
    )
    const [entranceOther, setEntranceOther] = useState('')
    const [entranceContent, setEntranceContent] = useState('')
    const [entranceState, setEntranceState] = useState([null, null, null, null, null, null, null, null, null])
    const [entranceImages, setEntranceImages] = useState([])
    const entrance = {
        title: '玄関・廊下',
        item: ['天井', '壁', '床', '玄関ドア', 'インターホン', 'シューズ\nボックス', '照明', '鏡', 'クローゼット'],
        state: entranceState,
        setState: setEntranceState,
        other: entranceOther,
        setOther: setEntranceOther,
        content: entranceContent,
        setContent: setEntranceContent,
        images: entranceImages,
        setImages: setEntranceImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(entranceState)
        AsyncStorage.setItem(ENTRANCE_STATE, dataToSave)
    }, entranceState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(ENTRANCE_OTHER, entranceOther)
    }, [entranceOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(ENTRANCE_CONTENT, entranceContent)
    }, [entranceContent])

    // kitchen
    const [kitchenOther, setKitchenOther] = useState('')
    const [kitchenContent, setKitchenContent] = useState('')
    const [kitchenState, setKitchenState] = useState([null, null, null, null, null, null, null, null, null, null, null, null])
    const [kitchenImages, setKitchenImages] = useState([])
    const kitchen = {
        title: 'キッチン',
        item: ['天井', '壁', '床', '流し台', '水栓', '吊戸棚', '換気扇', 'コンロ', '照明', '給排水', 'シンク下収納', '給湯機器'],
        state: kitchenState,
        setState: setKitchenState,
        other: kitchenOther,
        setOther: setKitchenOther,
        content: kitchenContent,
        setContent: setKitchenContent,
        images: kitchenImages,
        setImages: setKitchenImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(kitchenState)
        AsyncStorage.setItem(KITCHEN_STATE, dataToSave)
    }, kitchenState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(KITCHEN_OTHER, kitchenOther)
    }, [kitchenOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(KITCHEN_CONTENT, kitchenContent)
    }, [kitchenContent])
    // bath
    const [bathOther, setBathOther] = useState('')
    const [bathContent, setBathContent] = useState('')
    const [bathState, setBathState] = useState([null, null, null, null, null, null, null, null, null, null, null, null, null, null])
    const [bathImages, setBathImages] = useState([])
    const bath = {
        title: 'バスルーム',
        item: ['天井', '壁', '床', '扉', '浴槽', '水栓', 'シャワー', '給湯機器', '給排水', '照明', '浴室換気乾燥機\n（換気扇）', '物干しポール', '鏡', '棚'],
        state: bathState,
        setState: setBathState,
        other: bathOther,
        setOther: setBathOther,
        content: bathContent,
        setContent: setBathContent,
        images: bathImages,
        setImages: setBathImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(bathState)
        AsyncStorage.setItem(BATH_STATE, dataToSave)
    }, bathState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(BATH_OTHER, bathOther)
    }, [bathOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(BATH_CONTENT, bathContent)
    }, [bathContent])
    // Changing Room
    const [changeOther, setChangeOther] = useState('')
    const [changeContent, setChangeContent] = useState('')
    const [changeState, setChangeState] = useState([null, null, null, null, null, null, null, null, null, null, null])
    const [changeImages, setChangeImages] = useState([])
    const change = {
        title: '洗面所・脱衣室',
        item: ['天井', '壁', '床', '扉', '洗面台 棚', '鏡', '水栓', '洗面ボウル', '給排水', '照明', 'タオル\nホルダー'],
        state: changeState,
        setState: setChangeState,
        other: changeOther,
        setOther: setChangeOther,
        content: changeContent,
        setContent: setChangeContent,
        images: changeImages,
        setImages: setChangeImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(changeState)
        AsyncStorage.setItem(CHANGE_STATE, dataToSave)
    }, changeState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(CHANGE_OTHER, changeOther)
    }, [changeOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(CHANGE_CONTENT, changeContent)
    }, [changeContent])
    // laundry
    const [laundryOther, setLaundryOther] = useState('')
    const [laundryContent, setLaundryContent] = useState('')
    const [laundryState, setLaundryState] = useState([null, null, null, null, null])
    const [laundryImages, setLaundryImages] = useState([])
    const laundry = {
        title: '洗濯機置き場',
        item: ['洗濯パン', '洗濯機水栓', '棚', '扉', '照明'],
        state: laundryState,
        setState: setLaundryState,
        other: laundryOther,
        setOther: setLaundryOther,
        content: laundryContent,
        setContent: setLaundryContent,
        images: laundryImages,
        setImages: setLaundryImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(laundryState)
        AsyncStorage.setItem(LAUNDRY_STATE, dataToSave)
    }, laundryState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(LAUNDRY_OTHER, laundryOther)
    }, [laundryOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(LAUNDRY_CONTENT, laundryContent)
    }, [laundryContent])
    // toilet
    const [toiletOther, setToiletOther] = useState('')
    const [toiletContent, setToiletContent] = useState('')
    const [toiletState, setToiletState] = useState([null, null, null, null, null, null, null, null, null, null, null, null])
    const [toiletImages, setToiletImages] = useState([])
    const toilet = {
        title: 'トイレ',
        item: ['天井', '壁', '床', '便器', '水洗タンク', '扉', '照明', '換気扇', 'ペーパー\nホルダー', 'タオル\nホルダー', '棚', 'ウォシュレット'],
        state: toiletState,
        setState: setToiletState,
        other: toiletOther,
        setOther: setToiletOther,
        content: toiletContent,
        setContent: setToiletContent,
        images: toiletImages,
        setImages: setToiletImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(toiletState)
        AsyncStorage.setItem(TOILET_STATE, dataToSave)
    }, toiletState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(TOILET_OTHER, toiletOther)
    }, [toiletOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(TOILET_CONTENT, toiletContent)
    }, [toiletContent])
    // living
    const [livingOther, setLivingOther] = useState('')
    const [livingContent, setLivingContent] = useState('')
    const [livingState, setLivingState] = useState([null, null, null, null, null, null, null, null, null, null, null])
    const [livingImages, setLivingImages] = useState([])
    const living = {
        title: 'リビング・ダイニング',
        item: ['天井', '壁', '床', '扉', 'クローゼット', '棚', '窓', '網戸', 'カーテン\nレール', 'バルコニー\nガラス', 'エアコン'],
        state: livingState,
        setState: setLivingState,
        other: livingOther,
        setOther: setLivingOther,
        content: livingContent,
        setContent: setLivingContent,
        images: livingImages,
        setImages: setLivingImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(livingState)
        AsyncStorage.setItem(LIVING_STATE, dataToSave)
    }, livingState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(LIVING_OTHER, livingOther)
    }, [livingOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(LIVING_CONTENT, livingContent)
    }, [livingContent])
    // style
    const [styleOther, setStyleOther] = useState('')
    const [styleContent, setStyleContent] = useState('')
    const [styleState, setStyleState] = useState([null, null, null, null, null, null, null, null, null, null, null])
    const [contentImages, setContentImages] = useState([])
    const styleCheck = {
        title: '洋室',
        item: ['天井', '壁', '床', '扉', 'クローゼット', '棚', '窓', '網戸', 'カーテン\nレール', 'バルコニー\nガラス', 'エアコン'],
        state: styleState,
        setState: setStyleState,
        other: styleOther,
        setOther: setStyleOther,
        content: styleContent,
        setContent: setStyleContent,
        images: contentImages,
        setImages: setContentImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(styleState)
        AsyncStorage.setItem(STYLE_STATE, dataToSave)
    }, styleState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(STYLE_OTHER, styleOther)
    }, [styleOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(STYLE_CONTENT, styleContent)
    }, [styleContent])
    // balcony
    const [balconyOther, setBalconyOther] = useState('')
    const [balconyContent, setBalconyContent] = useState('')
    const [balconyState, setBalconyState] = useState([null, null])
    const [balconyImages, setBalconyImages] = useState([])
    const balcony = {
        title: 'バルコニー',
        item: ['床', '壁', '物干し金具'],
        state: balconyState,
        setState: setBalconyState,
        other: balconyOther,
        setOther: setBalconyOther,
        content: balconyContent,
        setContent: setBalconyContent,
        images: balconyImages,
        setImages: setBalconyImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(balconyState)
        AsyncStorage.setItem(BALCONY_STATE, dataToSave)
    }, balconyState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(BALCONY_OTHER, balconyOther)
    }, [balconyOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(BALCONY_CONTENT, balconyContent)
    }, [balconyContent])
    // other
    const [otherOther, setOtherOther] = useState('')
    const [otherContent, setOtherContent] = useState('')
    const [otherState, setOtherState] = useState([null, null])
    const [otherImages, setOtherImages] = useState([])
    const other = {
        title: 'その他',
        item: ['取り扱い\n説明書', 'エアコン\nリモコン'],
        state: otherState,
        setState: setOtherState,
        other: otherOther,
        setOther: setOtherOther,
        content: otherContent,
        setContent: setOtherContent,
        images: otherImages,
        setImages: setOtherImages
    }
    // save state on update
    useEffect(() => {
        if (!isMounted) return
        const dataToSave = transformStateToString(otherState)
        AsyncStorage.setItem(OTHER_STATE, dataToSave)
    }, otherState)
    // when user type into other input, save other text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(OTHER_OTHER, otherOther)
    }, [otherOther])
    // when user type into content input, save content text to storage
    useEffect(() => {
        if (!isMounted) return
        saveTextToStorage(OTHER_CONTENT, otherContent)
    }, [otherContent])

    const checklist = [entrance, kitchen, bath, change, laundry, toilet, living, styleCheck, balcony, other]
    //(320*240*4) / 1048576 = 0.29mb
    const [show, setShow] = useState(true)
    const [user, setUser] = useState({ id: '', articleName: '', roomNumber: '', name: '', furigana: '', roomId: '' })
    const [imgBtnEnable, setImgBtnEnable] = useState(true)
    useEffect(() => {
        // get user info & get current selected room
        AsyncStorage.getItem(USER_ID).then(userId => {
            Promise.all([httpClient.get(`get_resident?resident_id=${userId}`), getRoom()])
                .then(res => {
                    const { name, kana } = res[0].data.data.resident
                    const { article_name, room_number, id } = res[1]
                    setUser(() => ({ roomId: id, id: userId, articleName: article_name, roomNumber: room_number, name, furigana: kana }))
                })
                .catch(({ data }) => {
                    return false
                    Alert.alert('エラー', data.error[0], [
                        { text: 'OK' }
                    ])
                })
        })
        AsyncStorage.getItem(CHECKED_IN).then(async status => {
            if (status === '1') {
                // hide form
                setShow(false)
            } else {
                setShow(true)
                if (Platform.OS !== 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        setImgBtnEnable(false)
                    } else {
                        setImgBtnEnable(true)
                    }
                }
            }
        })
        // WARNING: make sure arrKeys items order
        // is the same as checklist items order
        const arrKeys = [
            ENTRANCE_STATE,
            KITCHEN_STATE,
            BATH_STATE,
            CHANGE_STATE,
            LAUNDRY_STATE,
            TOILET_STATE,
            LIVING_STATE,
            STYLE_STATE,
            BALCONY_STATE,
            OTHER_STATE]
        setIsMounted(true)
        // get saved state then fill into table
        for (const i in checklist) {
            AsyncStorage.getItem(arrKeys[i]).then(val => {
                if (!val) return
                const savedState = convertStateBackToArray(val)
                checklist[i].setState(savedState)
            })
        }
        // retreive other text in storage and fill in the input
        const arrOtherTextKeys = [
            ENTRANCE_OTHER,
            KITCHEN_OTHER,
            BATH_OTHER,
            CHANGE_OTHER,
            LAUNDRY_OTHER,
            TOILET_OTHER,
            LIVING_OTHER,
            STYLE_OTHER,
            BALCONY_OTHER,
            OTHER_OTHER
        ]
        for (const i in checklist) {
            AsyncStorage.getItem(arrOtherTextKeys[i]).then(val => {
                if (!val) return
                checklist[i].setOther(val)
            })
        }
        // retreive content text in storage and fill in the input
        const arrContentTextKeys = [
            ENTRANCE_CONTENT,
            KITCHEN_CONTENT,
            BATH_CONTENT,
            CHANGE_CONTENT,
            LAUNDRY_CONTENT,
            TOILET_CONTENT,
            LIVING_CONTENT,
            STYLE_CONTENT,
            BALCONY_CONTENT,
            OTHER_CONTENT
        ]
        for (const i in checklist) {
            AsyncStorage.getItem(arrContentTextKeys[i]).then(val => {
                if (!val) return
                checklist[i].setContent(val)
            })
        }
    }, [])
    function convertStateBackToArray(state) {
        return state.split(', ').map(item => {
            if (item === 'null') return null
            return Number(item)
        })
    }

    const goNext = () => {
        let check = true
        for (let i of checklist) {
            if (i.state.some(state => state === null)) {
                check = false
                break
            }
        }
        if (!check) {
            Alert.alert('エラー', 'チェックしていないものがありますが、ご確認してください。', [
                { text: 'OK' }
            ])
            return
        }
        navigation.navigate('CheckConfirm', {
            user,
            entrance: { state: entrance.state, content: entrance.content, other: entrance.other, images: entrance.images },
            kitchen: { state: kitchen.state, content: kitchen.content, other: kitchen.other, images: kitchen.images },
            bath: { state: bath.state, content: bath.content, other: bath.other, images: bath.images },
            change: { state: change.state, content: change.content, other: change.other, images: change.images },
            laundry: { state: laundry.state, content: laundry.content, other: laundry.other, images: laundry.images },
            toilet: { state: toilet.state, content: toilet.content, other: toilet.other, images: toilet.images },
            living: { state: living.state, content: living.content, other: living.other, images: living.images },
            styleCheck: { state: styleCheck.state, content: styleCheck.content, other: styleCheck.other, images: styleCheck.images },
            balcony: { state: balcony.state, content: balcony.content, other: balcony.other, images: balcony.images },
            other: { state: other.state, content: other.content, other: other.other, images: other.images }
        })
    }
    // const renderItem = ({item}) => (
    //     <TableSheet list={item} />
    // )

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' ? true : false} behavior="padding" style={{ flexGrow: 1 }}>
            <ScrollView nestedScrollEnabled={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
                <View style={{ flexGrow: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: "bold", alignSelf: "center", paddingTop: 5 }}>
                        入居時状況確認チェックシート
                </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, lineHeight: 20, marginTop: 40 }}>
                        {`※退去時の原状回復におけるトラブルを未然に防ぐ目的でご契約開始時の室内の状況をご確認頂いております。ご契約開始日から2週間以内にご回答下さい。\n※契約開始日から30日が経過しますと、未回答とみなし、以降の入力はできなくなります。\n※入居時状況確認シートが未回答である場合、発生時期不明の損傷や設備の不具合の修繕費をご負担いただく可能性がございます。予めご了承ください。`}
                    </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 20, lineHeight: 20 }}>
                        【契約者情報】
                </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 12, lineHeight: 20 }}>
                        物件名
                </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, marginTop: 10, marginStart: 8, lineHeight: 20 }}>
                        {user.articleName}
                    </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 12, lineHeight: 20 }}>
                        号室
                </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, marginTop: 10, marginStart: 8, lineHeight: 20 }}>
                        {user.roomNumber}
                    </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 12, lineHeight: 20 }}>
                        氏名
                </Text>
                    <Text style={{ ...GlobalStyles.fontNormal, marginTop: 10, marginStart: 8, lineHeight: 20, marginBottom: 40 }}>
                        {user.name}
                    </Text>
                    {show &&
                        <View>
                            <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', lineHeight: 20 }}>
                                ■現状の損耗有無のチェックしてください
                        </Text>
                            <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', lineHeight: 20 }}>
                                ■設備がない場合は設備無しにチェックしてください
                        </Text>
                            <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', lineHeight: 20 }}>
                                ■損耗箇所がある場合、具体的な状況をご記入の上、損耗箇所の写真を撮って添付してください。
                        </Text>
                            {checklist.map((list, index) => <TableSheet imgBtnEnable={imgBtnEnable} key={index} list={list} />)}
                            <TouchableOpacity onPress={goNext} style={{ marginTop: 40, marginBottom: 20, backgroundColor: Colors.primary, borderRadius: 8, height: 50, justifyContent: 'center' }}>
                                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.white, textAlign: 'center', fontWeight: 'bold' }}>内容を確認する</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        // <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
        //         <FlatList
        //             data={checklist}
        //             renderItem={renderItem}
        //             keyExtractor={item => item.title}
        //         />
        //     </View>
    )
}

