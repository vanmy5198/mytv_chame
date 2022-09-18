import React, { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    TextInput, Linking
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { CheckBox, Button } from 'react-native-elements'
import { window } from "../../constants/Layouts";
import { daysInMonth } from '../../utils'
import RNPickerSelect from 'react-native-picker-select'
import { FontAwesome } from '@expo/vector-icons'
import { validateEmail } from 'root/services/utils'
import CommonInfo from './CommonInfo'

const { width } = window
export default function PetForm({ navigation }) {
    const marginTop = 10
    const marginTop2 = 15
    const [checked, setChecked] = useState(false)
    const [petType, setPetType] = useState('1') // 1 = dog, 2 = cat
    const [textForm, setTextForm] = useState({ variety: '', length: '', email: '' })
    const [error, setError] = useState({ variety: '', length: '', email: '' })
    const [user, setUser] = useState({ articleName: '', roomNumber: '', name: '', furigana: '' })

    // time picker
    const date = new Date()
    const [yearList, setYearList] = useState([
        { label: `${date.getFullYear()}`, value: `${date.getFullYear()}` },
        { label: `${date.getFullYear() + 1}`, value: `${date.getFullYear() + 1}` }
    ])

    const currentMonth = date.getMonth() + 1
    const [hopeDate, setHopeDate] = useState({ date: `${date.getDate()}`, month: `${currentMonth}`, year: `${yearList[0].value}` })

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
        setHopeDate((prev) => ({ ...prev, year: val }))
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
        if (check && Number(hopeDate.month) <= currentMonth) {
            onSelectedMonth(`${currentMonth}`, null, val)
        } else {
            onSelectedMonth(hopeDate.month, null, val)
        }
    }

    const onSelectedMonth = (value, index, newYear) => {
        // update month
        const selectedYear = newYear ? newYear : hopeDate.year
        setHopeDate((prev) => ({ ...prev, month: value }))
        setDayList([])
        // if selected month & year is current day. return days left in the month
        const arr = []
        const check = selectedYear === `${date.getFullYear()}` && `${currentMonth}` === value
        let start = check ? date.getDate() : 1
        for (let i = start; i <= daysInMonth(Number(value), Number(selectedYear)); i++) {
            arr.push({ label: `${i}`, value: `${i}` })
        }
        setDayList(arr)
        // check if selected day not in daylist
        if (check && Number(hopeDate.date) < date.getDate()) {
            setHopeDate((prev) => ({ ...prev, date: `${date.getDate()}` }))
        }
    }

    const onSubmit = () => {
        let check = true
        if (!textForm.variety.trim()) {
            setError(prev => ({ ...prev, variety: '品種を入力してください。' }))
            check = false
        } else setError(prev => ({ ...prev, variety: '' }))
        if (!textForm.length.trim()) {
            setError(prev => ({ ...prev, length: '体調を入力してください。' }))
            check = false
        } else if (isNaN(Number(textForm.length))) {
            setError(prev => ({ ...prev, length: '数値を入力してください。' }))
            check = false
        } else if (Number(textForm.length > 50)) {
            setError(prev => ({ ...prev, length: '体長５０cmを超えるのはできません。' }))
            check = false
        } else setError(prev => ({ ...prev, length: '' }))
        if (!textForm.email.trim()) {
            setError(prev => ({ ...prev, email: 'メールアドレスを入力してください。' }))
            check = false
        } else if (!validateEmail(textForm.email)) {
            setError(prev => ({ ...prev, email: 'メールアドレスを正く入力してください。' }))
            check = false
        } else setError(prev => ({ ...prev, email: '' }))
        if (!check) return
        navigation.navigate('PetFormConfirm', { ...textForm, petType, ...hopeDate, user })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center' }}>{"ペット飼育仮申請"}</Text>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop: 40 }}>{"ご契約内容によってペット飼育可否、飼育可能なペットの種類が異なります。ペット飼育申請の可否を確認いたしますので、下記内容を入力し、ペット飼育仮申請を行ってください。"}</Text>
                <CommonInfo localStyle={{ marginTop: 20 }} user={user} setUser={setUser} />
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 20 }}>{"【ペット飼育仮申請情報】"}</Text>
                <Text style={{ ...GlobalStyles.fontNormal, marginTop, fontWeight: 'bold' }}>{"ペットの種類"}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <CheckBox
                        title="犬"
                        checked={petType === '1'}
                        onPress={() => setPetType('1')}
                        textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                        containerStyle={{ marginTop: 0, marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                    <CheckBox
                        title="猫"
                        checked={petType === '2'}
                        onPress={() => setPetType('2')}
                        textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                        containerStyle={{ marginTop: 0, marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0, paddingTop: 0, paddingLeft: 0 }}
                        checkedColor={Colors.primary}
                    />
                </View>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"その他のペット飼育を希望される場合は直接お電話にてご相談下さいませ。"}</Text>
                <Button
                    title="問い合わせ先　06-6356-2512"
                    titleStyle={{ ...GlobalStyles.fontNormal }}
                    buttonStyle={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.grayBorderDark, width: window.width * 0.7, alignSelf: 'center' }}
                    containerStyle={{ marginTop: marginTop2 }}
                    onPress={() => Linking.openURL('tel:0663562512')}
                />
                <View style={{ flexDirection: 'row', marginTop: marginTop2, alignItems: 'center' }}>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"品種"}</Text>
                    {!!error.variety && <Text style={[GlobalStyles.fontNote], { color: 'red' }}>{` *${error.variety}`}</Text>}
                </View>
                <TextInput style={{ ...GlobalStyles.input }} value={textForm.variety} onChangeText={(val) => setTextForm(prev => ({ ...prev, variety: val }))} />
                <View style={{ flexDirection: 'row', marginTop: marginTop2, alignItems: 'center' }}>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"体長（半角数字のみ）"}</Text>
                </View>
                {!!error.length && <Text style={[GlobalStyles.fontNote], { color: 'red' }}>{` *${error.length}`}</Text>}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <TextInput style={{ ...GlobalStyles.input, width: window.width * 0.4 }} keyboardType="numeric" value={textForm.length} onChangeText={(val) => setTextForm(prev => ({ ...prev, length: val }))} />
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginLeft: 10 }}>{"cm"}</Text>
                </View>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop }}>{"※成獣の状態で体長５０ｃｍ（頭・尻尾は除く）を超える可能性のあるペットの飼育申請はできません。"}</Text>
                {/* dog image */}
                <Image source={require('../../assets/pet.png')} resizeMode="contain" style={{ marginTop, height: window.width * 0.7 * 0.6, alignSelf: 'center', width: window.width * 0.7 }} />
                {/* time pickers */}
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 25 }}>{"飼育開始希望日"}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <RNPickerSelect
                        placeholder={{}}
                        onValueChange={onSelectedYear}
                        items={yearList}
                        value={hopeDate.year}
                        style={{
                            ...pickerStyle,
                            iconContainer: {
                                top: 5,
                                left: width / 4 - 20
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
                        value={hopeDate.month}
                        style={{
                            ...pickerStyle,
                            iconContainer: {
                                top: 5,
                                left: width / 4 - 20
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
                        onValueChange={(val) => setHopeDate(prev => ({ ...prev, date: val }))}
                        items={dayList}
                        value={hopeDate.date}
                        style={{
                            ...pickerStyle,
                            iconContainer: {
                                top: 5,
                                left: width / 4 - 20
                            }
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <FontAwesome name="caret-down" size={20} color={Colors.blueDark} />
                        }}
                    />
                </View>
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 30 }}>{"連絡先メールアドレス（ペット飼育申請 可否 送信先）"}</Text>
                {!!error.email && <Text style={[GlobalStyles.fontNote], { color: 'red' }}>{` *${error.email}`}</Text>}
                <TextInput style={{ ...GlobalStyles.input, marginTop }} placeholder="example@abc.com" keyboardType="email-address" value={textForm.email} onChangeText={(val) => setTextForm(prev => ({ ...prev, email: val }))} />
                {/* blue text */}
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark, fontWeight: 'bold', marginTop: 30 }}>{"【注意事項】"}</Text>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{"・ペット飼育仮申請送信だけではペット飼育はできません。\n\n・ペット飼育仮申請送信後、3日以内（当社長期休暇時は休暇後3日以内）に、ご入力いただいたメールアドレスへ、ペット飼育申請可否のご連絡をいたします。\n\n・ペット申請可能な場合は、お送りするメールに正式なペット申請フォームのURLを添付いたしますので、そちらから正式なペット申請をお願いいたします。\n\n・契約内容でペット飼育が禁止されている等、ペット申請不可の場合はその旨をメールにてお知らせいたします。\n\n・ペット飼育申請を行う際に、別途礼金もしくは敷金のお支払いが必要になります。予め賃貸借契約書の条文ならびに特約条項の確認をお願いいたします。"}</Text>
                <CheckBox
                    center
                    title="注意事項に同意する"
                    checked={checked}
                    onPress={() => setChecked(prev => !prev)}
                    textStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'normal' }}
                    containerStyle={{ backgroundColor: Colors.white, borderWidth: 0 }}
                    checkedColor={Colors.primary}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'stretch', alignContent: 'stretch' }}>
                    <Button onPress={() => navigation.goBack()}
                        containerStyle={{ borderWidth: 0.5, flexGrow: 1, marginRight: 8, justifyContent: 'center', borderRadius: 8, borderColor: Colors.grayLight }}
                        buttonStyle={{ backgroundColor: Colors.white, height: 50 }}
                        title="キャンセル"
                        titleStyle={{ ...GlobalStyles.fontNormal, justifyContent: 'center', fontWeight: 'bold' }}
                    />
                    <Button title={"上記に同意して\n入力内容確認画面へ"}
                        onPress={onSubmit}
                        disabled={!checked}
                        titleStyle={{ ...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold' }}
                        buttonStyle={{ backgroundColor: Colors.primary, marginLeft: 8, borderColor: Colors.grayLight, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 30,
        color: Colors.text,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: window.width / 4
    },
    inputAndroid: {
        fontSize: 16,
        height: 30,
        color: Colors.text,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 3,
        width: window.width / 4
    }
})