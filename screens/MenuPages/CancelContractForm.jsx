import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { CheckBox, Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { daysInMonth } from '../../utils'
import { window } from '../../constants/Layouts'
import { FontAwesome } from '@expo/vector-icons';
import { listPrefecture } from '../../constants/utils.js'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { validateEmail } from 'root/services/utils'
import axios from 'axios'
import CommonInfo from './CommonInfo'
const { width } = window

export default function CancelContract({ navigation }) {
    const date = new Date()
    const [error, setError] = useState({ phone: '', email: '', postalCode: '', province: '', address: '' })
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [witnessCheck, setWitnessCheck] = useState(false)
    const [witnesser, setWitnesser] = useState('1') // 1: contractor, 2: not contractor
    // const [witnesser, setWitnesser] = useState({contractor: false, other: false}) // 1: contractor, 2: not contractor
    const [contactMethod, setContactMethod] = useState('1') // 1: phone, 2: email
    const [address, setAddress] = useState({ postalCode: '', province: '', address: '', building: '', decidedNewAddress: false })
    const [reason, setReason] = useState('')
    const [account, setAccount] = useState({ bankName: '', branch: '', branchNumber: '', type: '', accountNumber: '', accountName: '', furigana: '' })
    const [introduce, setIntroduce] = useState(true)
    const [user, setUser] = useState({ articleName: '', roomNumber: '', name: '', furigana: '' })
    const [content, setContent] = useState('')
    const limit = 1024 * 768 * 4 // max = 3mb; 1mb = 1048576
    const [images, setImages] = useState([])
    const pickImage = async () => {
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
                    [{ resize: { width: 1024, height: 768 } }],
                    { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
                )
                setImages(prev => ([...prev, manipResult]))
            } else setImages(prev => ([...prev, result]))
        }
    }

    const removeImage = (index) => {
        setImages(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]))
    }

    const getAddress = () => {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address.postalCode}&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes&language=ja`)
            .then(({ data }) => {
                let province = address.province
                const split = data.predictions[0].terms.slice(3) // 012 is 日本|〒542-0072|府
                if (listPrefecture.some(i => i.value === data.predictions[0].terms[2].value)) {
                    province = data.predictions[0].terms[2].value
                }
                const foundAddress = split.reduce((acc, item) => acc + item.value, '')
                setAddress(prev => ({ ...prev, address: foundAddress, province }))
            })
            .catch(e => {
                Alert.alert('エラー', 'アドレスが見つからなかった。郵便番号をご確認してください。', [
                    { text: 'OK' }
                ])
            })
    }

    // select cancel contract day. cancelDate
    const [yearList, setYearList] = useState([
        { label: `${date.getFullYear()}`, value: `${date.getFullYear()}` },
        { label: `${date.getFullYear() + 1}`, value: `${date.getFullYear() + 1}` }
    ])

    const currentMonth = date.getMonth() + 1
    const [cancelDate, setCancelDate] = useState({ date: `${date.getDate()}`, month: `${currentMonth}`, year: `${yearList[0].value}` })

    // day setup
    const initDay = () => {
        const arr = []
        for (let i = date.getDate(); i <= daysInMonth(currentMonth, date.getFullYear()); i++) {
            arr.push({ label: `${i}`, value: `${i}` })
        }
        return arr
    }
    const [dayList, setDayList] = useState(initDay())
    //year setup
    const leftMonthOfYear = () => {
        const arr = []
        for (let i = currentMonth; i <= 12; i++) {
            arr.push({ label: `${i}`, value: `${i}` })
        }
        return arr
    }
    const [monthList, setMonthList] = useState(leftMonthOfYear())

    const onSelectedYear = (val) => {
        // update year
        setCancelDate((prev) => ({ ...prev, year: val }))
        setMonthList([])
        // if selected year is current year. return months left in the year
        const check = val === `${date.getFullYear()}`
        if (check) {
            // const arr = []
            for (let i = currentMonth; i <= 12; i++) {
                setMonthList(prev => ([...prev, { label: `${i}`, value: `${i}` }]))
            }
        } else {
            for (let i = 1; i <= 12; i++) {
                setMonthList(prev => ([...prev, { label: `${i}`, value: `${i}` }]))
            }
        }
        // check if selected month not in monthList
        if (check && Number(cancelDate.month) <= currentMonth) {
            onSelectedMonth(`${currentMonth}`, null, val)
        } else {
            onSelectedMonth(cancelDate.month, null, val)
        }
    }

    const onSelectedMonth = (value, index, newYear) => {
        // update month
        const selectedYear = newYear ? newYear : cancelDate.year
        setCancelDate((prev) => ({ ...prev, month: value }))
        setDayList([])
        // if selected month & year is current day. return days left in the month
        const arr = []
        let check = selectedYear === `${date.getFullYear()}` && `${currentMonth}` === value
        let start = check ? date.getDate() : 1
        for (let i = start; i <= daysInMonth(Number(value), Number(selectedYear)); i++) {
            arr.push({ label: `${i}`, value: `${i}` })
        }
        setDayList(arr)
        // check if selected day not in daylist
        if (check && Number(cancelDate.date) < date.getDate()) {
            setCancelDate((prev) => ({ ...prev, date: `${date.getDate()}` }))
        }
    }

    // select witness day
    const timeList = [
        { label: '10時', value: '10' },
        { label: '11時', value: '11' },
        { label: '12時', value: '12' },
        { label: '13時', value: '13' },
        { label: '14時', value: '14' },
        { label: '15時', value: '15' },
        { label: '16時', value: '16' },
        { label: '17時', value: '17' }
    ]

    const [yearList2, setYearList2] = useState([
        { label: `${date.getFullYear()}`, value: `${date.getFullYear()}` }
    ])

    const [witnessDate, setWitnessDate] = useState({ time: '10', date: `${date.getDate()}`, month: `${currentMonth}`, year: `${yearList[0].value}` })

    const [dayList2, setDayList2] = useState([{ label: `${date.getDate()}`, value: `${date.getDate()}` }])
    const [monthList2, setMonthList2] = useState([{ label: `${date.getFullYear()}`, value: `${date.getFullYear()}` }])

    const onSelectedYear2 = (val) => {
        // update year
        setWitnessDate((prev) => ({ ...prev, year: val }))
        setMonthList2([])
        // if selected year is current year. return months left in the year
        const check = val === `${date.getFullYear()}`
        // if cancelDate's year = witnessDate's then monthBound = cancelDate.month (witnessDate must <= cancelDate)
        const monthBound = cancelDate.year === val ? Number(cancelDate.month) : 12
        if (check) {
            for (let i = currentMonth; i <= monthBound; i++) {
                setMonthList2(prev => ([...prev, { label: `${i}`, value: `${i}` }]))
            }
        } else {
            for (let i = 1; i <= monthBound; i++) {
                setMonthList2(prev => ([...prev, { label: `${i}`, value: `${i}` }]))
            }
        }
        // check if selected month not in monthList
        if (check && Number(witnessDate.month) <= currentMonth) {
            onSelectedMonth2(`${currentMonth}`, null, val)
        } else {
            onSelectedMonth2(witnessDate.month, null, val)
        }
    }

    // pass param newYear because year may not be updated yet
    const onSelectedMonth2 = (value, index, newYear) => {
        // update month
        const selectedYear = newYear ? newYear : witnessDate.year
        setWitnessDate((prev) => ({ ...prev, month: value }))
        setDayList2([])
        // if selected month & year is current day. return days left in the month
        const arr = []
        let check = selectedYear === `${date.getFullYear()}` && `${currentMonth}` === value
        let start = check ? date.getDate() : 1
        const dayBound = cancelDate.year === selectedYear && cancelDate.month === value ? Number(cancelDate.date) : daysInMonth(Number(value), Number(selectedYear))
        for (let i = start; i <= dayBound; i++) {
            arr.push({ label: `${i}`, value: `${i}` })
        }
        setDayList2(arr)
        // check if selected day not in daylist
        if (check && Number(witnessDate.date) < date.getDate()) {
            setWitnessDate((prev) => ({ ...prev, date: `${date.getDate()}` }))
        }
    }
    // end of select witness day
    const updatePhone = (val) => {
        if (val.length > 13) return
        setPhone(val)
    }

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

    useEffect(() => {
        const cancel = new Date(Number(cancelDate.year), Number(cancelDate.month) - 1, Number(cancelDate.date))
        const witness = new Date(Number(witnessDate.year), Number(witnessDate.month) - 1, Number(witnessDate.date))
        if (cancel < witness) {
            // set witness = cancel
            setWitnessDate((prev) => ({ ...prev, ...cancelDate }))
        }

        onSelectedYear2(witnessDate.year)
        let newWitnessYearList = []
        for (let i = date.getFullYear(); i <= Number(cancelDate.year); i++) {
            newWitnessYearList.push({ label: `${i}`, value: `${i}` })
        }
        setYearList2(newWitnessYearList)
    }, [cancelDate])

    // gallery permission
    const [imgBtnEnable, setImgBtnEnable] = useState(true)
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                setImgBtnEnable(false)
            } else {
                setImgBtnEnable(true)
            }
          }
        })();
      }, []);

    const submit = () => {
        let check = true
        if (!phone.trim()) {
            setError(val => ({ ...val, phone: '連絡先を入力してください。' }))
            check = false
        } else if (phone.length < 13) {
            setError(val => ({ ...val, phone: '電話番号は090-1234-5678の形式で入力してください。' }))
            check = false
        } else setError(val => ({ ...val, phone: '' }))
        // email
        if (!email.trim()) {
            setError(val => ({ ...val, email: 'メールアドレスを入力してください。' }))
            check = false
        } else if (!validateEmail(email)) {
            setError(val => ({ ...val, email: 'メールアドレスを正く入力してください。' }))
            check = false
        } else setError(val => ({ ...val, email: '' }))
        if (!address.decidedNewAddress && (!address.postalCode || !address.province || !address.address)) {
            if (!address.postalCode) setError(val => ({ ...val, postalCode: '郵便番号が必須' }))
            else setError(val => ({ ...val, postalCode: '' }))
            if (!address.province) setError(val => ({ ...val, province: '都道府県が必須' }))
            else setError(val => ({ ...val, province: '' }))
            if (!address.address) setError(val => ({ ...val, address: '市区町村・番地が必須' }))
            else setError(val => ({ ...val, address: '' }))
            check = false
        } else setError(val => ({ ...val, postalCode: '', province: '', address: '' }))
        if (!check) return
        //
        navigation.navigate('CancelContractConfirm', { user, images, phone, email, contactMethod, cancelDate, witnessDate, witnessCheck, witnesser, address, introduce, account, reason, content })
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' ? true : false} behavior="padding">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center' }}>{"解約申請フォーム"}</Text>
                    <Text style={{ ...GlobalStyles.fontSubHeader, marginTop: 50 }}>{"契約者様ご本人の確認"}</Text>
                    <View style={{ borderTopWidth: 1, borderTopColor: Colors.grayBorder, marginTop: 2 }}></View>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop: 10 }}>{"身分証のアップロードをお願いいたします。（運転免許証・健康保険証・パスポート）"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', marginTop: 10 }}>{"■ファイル選択して、アップロードしてください。"}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Button onPress={pickImage}
                            containerStyle={{ borderWidth: 1, borderColor: Colors.grayBorder, paddingHorizontal: 5 }}
                            buttonStyle={{ backgroundColor: Colors.white, paddingVertical: 0 }}
                            title="ファイルを選択"
                            titleStyle={GlobalStyles.fontNote}
                            disabled={images.length >= 2}
                        />
                        {images.length === 0 && <Text style={{ ...GlobalStyles.fontNote, marginLeft: 5 }}>{"ファイルが選択されていません"}</Text>}
                    </View>
                    {images.length > 0 &&
                        (<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                            {images.map((i, ind) => (
                                <View key={ind} style={{ position: 'relative', width: width / 6, height: width / 6, marginLeft: ind > 0 ? 5 : 0 }}>
                                    <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                                    <Button title="削除" onPress={() => removeImage(ind)} containerStyle={{ borderColor: Colors.grayBorder, borderWidth: 1, marginTop: 3 }} buttonStyle={{ backgroundColor: Colors.white }} titleStyle={{ ...GlobalStyles.fontNote }} />
                                </View>
                            ))}
                        </View>)
                    }
                    {/* 必要事項の入力 */}
                    <Text style={{ ...GlobalStyles.fontSubHeader, marginTop: 50 }}>{"必要事項の入力"}</Text>
                    <View style={{ borderTopWidth: 1, borderTopColor: Colors.grayBorder, marginTop: 2 }}></View>
                    <CommonInfo user={user} setUser={setUser} />
                    {/* phone */}
                    <Text style={style.textSection}>{"連絡先（携帯電話番号）"}</Text>
                    {!!error.phone && (
                        <Text style={([GlobalStyles.fontNote], { color: "red" })}>{` *${error.phone}`}</Text>
                    )}
                    <TextInput
                        style={[GlobalStyles.input, { marginTop: 5 }]}
                        onChangeText={(val) => {
                            updatePhone(val);
                        }}
                        maxLength={13}
                        value={phone}
                        keyboardType="numeric"
                    />
                    {/* email */}
                    <Text style={style.textSection}>{"メールアドレス"}</Text>
                    {!!error.email && (
                        <Text style={([GlobalStyles.fontNote], { color: "red" })}>{` *${error.email}`}</Text>
                    )}
                    <TextInput
                        style={[GlobalStyles.input, { marginTop: 5 }]}
                        onChangeText={(val) => {
                            setEmail(val);
                        }}
                        value={email}
                        keyboardType="email-address"
                    />
                    {/* contact method */}
                    <Text style={style.textSection}>{"弊社からの連絡方法"}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            center
                            title="電話"
                            checked={contactMethod === '1'}
                            onPress={() => setContactMethod('1')}
                            titleStyle={GlobalStyles.fontNormal}
                            containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0, paddingLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                        <CheckBox
                            center
                            title="メール"
                            checked={contactMethod === '2'}
                            onPress={() => setContactMethod('2')}
                            titleStyle={GlobalStyles.fontNormal}
                            containerStyle={{ backgroundColor: Colors.white, borderWidth: 0, marginLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                    </View>
                    {/* blue border */}
                    <View style={style.divider}></View>
                    <Text style={[style.textSection, { color: Colors.blueDark }]}>{"【解約希望日】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"解約希望日は建物賃貸借契約書の条文に規定した予告期間以降でご入力下さい。"}</Text>
                    {/* 解約希望日 */}
                    <Text style={style.textSection}>{"解約希望日"}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={onSelectedYear}
                            items={yearList}
                            value={cancelDate.year}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, padding: 5 }}>{"年"}</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(val) => onSelectedMonth(val)}
                            items={monthList}
                            value={cancelDate.month}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, padding: 5 }}>{"月"}</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(val) => setCancelDate(prev => ({ ...prev, date: val }))}
                            items={dayList}
                            value={cancelDate.date}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, paddingLeft: 5 }}>{"日"}</Text>
                    </View>
                    {/* 例 */}
                    <Button
                        buttonStyle={{
                            marginTop: 10,
                            backgroundColor: "transparent",
                        }}
                        titleStyle={[GlobalStyles.fontNormal, { textAlign: 'left', color: Colors.primary, fontWeight: 'bold' }]}
                        title={"■（例1）１ヶ月以上の予告期間を定めている場合"}
                        icon={
                            <FontAwesome
                                name="caret-right"
                                size={22}
                                color={Colors.primary}
                                style={{ paddingLeft: 5 }}
                            />
                        }
                        iconRight
                        onPress={() => navigation.navigate('CancelContractNote1')}
                    />
                    <Button
                        buttonStyle={{
                            backgroundColor: "transparent",
                        }}
                        titleStyle={[GlobalStyles.fontNormal, { textAlign: 'left', color: Colors.primary, fontWeight: 'bold' }]}
                        title={"■（例2）２ヶ月以上の予告期間を定めている場合"}
                        icon={
                            <FontAwesome
                                name="caret-right"
                                size={22}
                                color={Colors.primary}
                                style={{ paddingLeft: 5 }}
                            />
                        }
                        iconRight
                        onPress={() => navigation.navigate('CancelContractNote2')}
                    />
                    {/* 【退去立会希望日時】 */}
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【退去立会希望日時】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"解約日までの間に引越しを済ませ、退去立会の上お部屋の明渡しを行います。\n契約に基づき、賃貸人指定の立会業者にて退去立会を行いますので、立会希望日時をご入力ください。\n※立会希望日時につきましてはご希望に添えない場合がございますので予めご了承ください。"}</Text>
                    {/* picker 2 */}
                    <Text style={style.textSection}>{"立会希望日"}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={onSelectedYear2}
                            items={yearList2}
                            value={witnessDate.year}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, padding: 5 }}>{"年"}</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(val) => onSelectedMonth2(val)}
                            items={monthList2}
                            value={witnessDate.month}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, padding: 5 }}>{"月"}</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(val) => setWitnessDate(prev => ({ ...prev, date: val }))}
                            items={dayList2}
                            value={witnessDate.date}
                            style={{
                                ...pickerStyle,
                                iconContainer: {
                                    top: 5,
                                    left: (width - 40) / 4 - 20
                                }
                            }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                            }}
                        />
                        <Text style={{ ...GlobalStyles.fontNormal, paddingLeft: 5 }}>{"日"}</Text>
                    </View>
                    {/* time */}
                    <Text style={{ ...style.textSection, marginBottom: 5 }}>{"立会希望時間"}</Text>
                    <RNPickerSelect
                        placeholder={{}}
                        onValueChange={(val) => setWitnessDate(prev => ({ ...prev, time: val }))}
                        items={timeList}
                        value={witnessDate.time}
                        style={{
                            ...pickerStyle,
                            iconContainer: {
                                top: 5,
                                left: (width - 40) / 4 - 20
                            }
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                        }}
                    />
                    <Text style={{ ...style.textNormal, color: Colors.blueDark }}>{"立会日未定の場合は下記をチェックしてください"}</Text>
                    {/* 立会希望時間 */}
                    <CheckBox
                        iconRight
                        title="立会希望日時未定"
                        checked={witnessCheck}
                        onPress={() => setWitnessCheck(prev => !prev)}
                        textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginLeft: 0 }}
                        containerStyle={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                    {/* 【立会人情報】 */}
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【立会人情報】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"原則契約者ご本人様にお立会いただく必要がございます。\n※特別な事情があり契約者様以外が立会を行う場合、当社指定の委任状提出が必要です。"}</Text>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【立会人が契約者以外の場合】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"後日、契約中マンションへ委任状を郵送いたします。必ず立会前日までに当社へ到着する様ご返送下さい。\n委任状の提出が無く立会当日に契約者以外が立会に来られた場合、退去立会は実施できません。"}</Text>
                    <Text style={style.textSection}>{"立会人"}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            title="契約者本人"
                            checked={witnesser === '1'}
                            onPress={() => setWitnesser('1')}
                            textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                            containerStyle={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                        <CheckBox
                            title="契約者以外"
                            checked={witnesser === '2'}
                            onPress={() => setWitnesser('2')}
                            textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                            containerStyle={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                    </View>
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【転居先住所】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop: 5 }}>{"転居先住所をご入力ください。"}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', }}>{"郵便番号 "}</Text>
                        <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5 }}>{"必須"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal }}>{"（半角数字のみ）"}</Text>
                    </View>
                    {!!error.postalCode && <Text style={{ ...GlobalStyles.fontNote, color: Colors.red }}>{error.postalCode}</Text>}
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 5, width: (window.width - 40) * 0.4 }}
                        placeholder="例）5300042"
                        keyboardType="numeric"
                        value={address.postalCode}
                        onChangeText={(val) => setAddress(prevVal => ({ ...prevVal, postalCode: val }))}
                        maxLength={7}
                        onBlur={getAddress}
                    />
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"都道府県"}</Text>
                                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5 }}>{"必須"}</Text>
                            </View>
                            {!!error.province && <Text style={{ ...GlobalStyles.fontNote, color: Colors.red }}>{error.province}</Text>}
                            <RNPickerSelect
                                placeholder={{ label: '都道府県を洗濯', value: '', color: Colors.disabled }}
                                onValueChange={(val) => setAddress(prev => ({ ...prev, province: val }))}
                                items={listPrefecture}
                                value={address.province}
                                style={{
                                    ...pickerStyle2,
                                    iconContainer: {
                                        top: 10,
                                        left: (width - 40) * 0.4 - 30
                                    }
                                }}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => {
                                    return <FontAwesome name="caret-down" size={30} color={Colors.blueDark} />
                                }}
                            />
                        </View>
                        {/* right: address */}
                        <View style={{ marginLeft: 10, flexGrow: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"市区町村・番地"}</Text>
                                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5 }}>{"必須"}</Text>
                            </View>
                            {!!error.address && <Text style={{ ...GlobalStyles.fontNote, color: Colors.red }}>{error.address}</Text>}
                            <TextInput
                                style={{ ...GlobalStyles.input }}
                                placeholder="例）大阪市北区0-000"
                                value={address.address}
                                onChangeText={(val => setAddress(prev => ({ ...prev, address: val })))}
                            />
                        </View>
                    </View>
                    {/* row end */}
                    <Text style={style.textSection}>{"建物名等・号室"}</Text>
                    <TextInput style={GlobalStyles.input} value={address.building} onChangeText={(val) => setAddress(prev => ({ ...prev, building: val }))} placeholder="例）レオンビルディング" />
                    {/* checkbox 転居先未定 */}
                    <CheckBox
                        title="転居先未定"
                        iconRight
                        checked={address.decidedNewAddress}
                        onPress={() => setAddress(prevVal => ({ ...prevVal, decidedNewAddress: !prevVal.decidedNewAddress }))}
                        textStyle={{ ...GlobalStyles.fontNormal, marginLeft: 0 }}
                        containerStyle={{ marginTop: 15, marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0, width: (window.width - 40) * 0.4 }}
                        checkedColor={Colors.primary}
                    />
                    {/* 【転居先紹介】 */}
                    <View style={style.divider}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ ...style.textSection, color: Colors.blueDark, marginTop: 0 }}>{"【転居先紹介】"}</Text>
                        <Text style={{ ...style.fontNote }}>{"（転居先未定にチェックを入れた場合）"}</Text>
                    </View>
                    <Text style={{ ...style.textSection, marginTop: 10 }}>{"当社グループ会社（株式会社レオンワークス）からの 転居先紹介希望の有無"}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <CheckBox
                            title="希望する"
                            checked={introduce}
                            onPress={() => setIntroduce(preVal => !preVal)}
                            textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                            containerStyle={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                        <CheckBox
                            title="希望しない"
                            checked={!introduce}
                            onPress={() => setIntroduce(preVal => !preVal)}
                            textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                            containerStyle={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                            checkedColor={Colors.primary}
                        />
                    </View>
                    {/* 【解約理由】 */}
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【解約理由】"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, marginVertical: 5 }}>{"解約の理由を選んでください。"}</Text>
                    <RNPickerSelect
                        placeholder={{ label: '解約理由を選択', value: '', color: Colors.disabled }}
                        onValueChange={(val) => setReason(() => val)}
                        items={[{ label: '結婚', value: '結婚' }, { label: '転勤', value: '転勤' }, { label: '転職', value: '転職' }, { label: '帰郷', value: '帰郷' }, { label: 'その他', value: 'その他' }]}
                        value={reason}
                        style={{
                            ...pickerStyle2,
                            iconContainer: {
                                top: 10,
                                left: (width - 40) * 0.4 - 30
                            }
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <FontAwesome name="caret-down" size={30} color={Colors.blueDark} />
                        }}
                    />
                    {/* 【敷金等の返還金振込先指定口座】 */}
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【敷金等の返還金振込先指定口座】"}</Text>
                    <Text style={{ ...style.textNormal, color: Colors.blueDark, marginTop: 5 }}>{"敷金等の返還金が無い場合は入力不要です。"}</Text>
                    <Text style={style.textSection}>{"銀行名"}</Text>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）レオン銀行"
                        val={account.bankName}
                        onChangeText={val => setAccount(prev => ({ ...prev, bankName: val }))}
                    />
                    <Text style={style.textSection}>{"支店名"}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ ...GlobalStyles.input, marginTop: 2, width: width * 0.6 }}
                            placeholder=""
                            val={account.branch}
                            onChangeText={val => setAccount(prev => ({ ...prev, branch: val }))}
                        />
                        <Text style={[GlobalStyles.fontNormal], { marginLeft: 5, color: '#333' }}>{"支店"}</Text>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"店番号"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal }}>{"（半角数字のみ）"}</Text>
                    </View>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）000"
                        val={account.branchNumber}
                        onChangeText={val => setAccount(prev => ({ ...prev, branchNumber: val }))}
                        keyboardType="numeric"
                    />
                    <Text style={style.textSection}>{"種類"}</Text>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）普通預金"
                        val={account.type}
                        onChangeText={val => setAccount(prev => ({ ...prev, type: val }))}
                    />
                    <Text style={style.textSection}>{"口座名義"}</Text>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）礼御太郎"
                        val={account.accountName}
                        onChangeText={val => setAccount(prev => ({ ...prev, accountName: val }))}
                    />
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"フリガナ"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal }}>{"（全角カナ）"}</Text>
                    </View>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）レオンタロウ"
                        val={account.furigana}
                        onChangeText={val => setAccount(prev => ({ ...prev, furigana: val }))}
                    />
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"口座番号"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal }}>{"（半角数字のみ）"}</Text>
                    </View>
                    <TextInput
                        style={{ ...GlobalStyles.input, marginTop: 2 }}
                        placeholder="例）12345678"
                        val={account.accountNumber}
                        onChangeText={val => setAccount(prev => ({ ...prev, accountNumber: val }))}
                        keyboardType="numeric"
                    />
                    {/* other */}
                    <View style={style.divider}></View>
                    <Text style={{ ...style.textSection, color: Colors.blueDark }}>{"【その他ご質問など】"}</Text>
                    <Text style={{ ...style.textNormal, color: Colors.blueDark, marginTop: 5 }}>{"その他ご質問等がございましたらご入力ください。"}</Text>
                    <Text style={style.textSection}>{"その他質問"}</Text>
                    <TextInput
                        style={{ ...GlobalStyles.input, height: 250, marginTop: 2 }}
                        multiline={true}
                        numberOfLines={20}
                        value={content}
                        onChangeText={(val) => setContent(val)}
                    />
                    <Button
                        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                        buttonStyle={{ backgroundColor: Colors.primary, borderRadius: 8, marginTop: 15, height: 50 }}
                        title="次へ"
                        onPress={submit}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    textSection: {
        ...GlobalStyles.fontNormal,
        fontWeight: 'bold',
        marginTop: 15
    },
    textNormal: {
        ...GlobalStyles.fontNormal,
        marginTop: 10
    },
    divider: { borderColor: Colors.blueDark, borderWidth: 0.5, borderStyle: 'dashed', marginTop: 20 }
})

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 30,
        color: Colors.text,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: (width - 40) / 4
    },
    inputAndroid: {
        fontSize: 16,
        height: 30,
        color: Colors.text,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: (width - 40) / 4
    }
})

const pickerStyle2 = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 50,
        color: Colors.text,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: (width - 40) * 0.4
    },
    inputAndroid: {
        fontSize: 16,
        height: 50,
        color: Colors.text,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: (width - 40) * 0.4
    }
})