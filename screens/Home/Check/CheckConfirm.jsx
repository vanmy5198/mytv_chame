import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import { window } from 'root/constants/Layouts'
import httpClient from 'root/services/http-client'
import { convertImg } from 'root/services/utils'
const { width, height } = window

export default function CheckConfirm({ route, navigation }) {
    const { user, entrance, kitchen, bath, change, laundry, toilet, living, styleCheck, balcony, other } = route.params
    const listState = [entrance, kitchen, bath, change, laundry, toilet, living, styleCheck, balcony, other]
    const entranceText = { title: '玄関・廊下', items: ['天井', '壁', '床', '玄関ドア', 'インターホン', 'シューズボックス', '照明', '鏡', 'クローゼット'] }
    const kitchenText = { title: 'キッチン', items: ['天井', '壁', '床', '流し台', '水栓', '吊戸棚', '換気扇', 'コンロ', '照明', '給排水', 'シンク下収納', '給湯機器'] }
    const bathText = { title: 'バスルーム', items: ['天井', '壁', '床', '扉', '浴槽', '水栓', 'シャワー', '給湯機器', '給排水', '照明', '浴室換気乾燥機（換気扇）', '物干しポール', '鏡', '棚'] }
    const changeText = { title: '洗面所・脱衣室', items: ['天井', '壁', '床', '扉', '洗面台 棚', '鏡', '水栓', '洗面ボウル', '給排水', '照明', 'タオルホルダー'] }
    const laundryText = { title: '洗濯機置き場', items: ['洗濯パン', '洗濯機水栓', '棚', '扉', '照明'] }
    const toiletText = { title: 'トイレ', items: ['天井', '壁', '床', '便器', '水洗タンク', '扉', '照明', '換気扇', 'ペーパー ホルダー', 'タオル ホルダー', '棚', 'ウォシュレット'] }
    const livingText = { title: 'リビング・ダイニング', items: ['天井', '壁', '床', '扉', 'クローゼット', '棚', '窓', '網戸', 'カーテン レール', 'バルコニー ガラス', 'エアコン'] }
    const styleCheckText = { title: '洋室', items: ['天井', '壁', '床', '扉', 'クローゼット', '棚', '窓', '網戸', 'カーテン レール', 'バルコニー ガラス', 'エアコン'] }
    const balconyText = { title: 'バルコニー', items: ['バルコニー', '物干し金具'] }
    const otherText = { title: 'その他', items: ['取り扱い説明書', 'エアコンリモコン'] }
    const list = [entranceText, kitchenText, bathText, changeText, laundryText, toiletText, livingText, styleCheckText, balconyText, otherText]
    const status = ['', '損耗無し', '損耗有り', '設備無し']
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
        formData.append('user[article_name]', user.articleName)
        formData.append('user[room_name]', user.roomNumber)
        formData.append('user[name]', user.name)
        formData.append('user[resident_id]', user.id)
        formData.append('user[room_id]', user.roomId)
        formData.append('entrance[ceiling]', entrance.state[0])
        formData.append('entrance[wall]', entrance.state[1])
        formData.append('entrance[floor]', entrance.state[2])
        formData.append('entrance[door]', entrance.state[3])
        formData.append('entrance[intercom]', entrance.state[4])
        formData.append('entrance[foot_box]', entrance.state[5])
        formData.append('entrance[light]', entrance.state[6])
        formData.append('entrance[key]', entrance.state[7])
        formData.append('entrance[closet]', entrance.state[8])
        formData.append('entrance[other]', entrance.other)
        const cvEntrance = entrance.images.length > 0 ? convertImg(entrance.images) : []
        for (let i of cvEntrance) {
            formData.append('entrance_img[]', i)
        }
        formData.append('entrance[explain]', entrance.content)

        formData.append('kitchen[ceiling]', kitchen.state[0])
        formData.append('kitchen[wall]', kitchen.state[1])
        formData.append('kitchen[floor]', kitchen.state[2])
        formData.append('kitchen[sink]', kitchen.state[3])
        formData.append('kitchen[water_faucet]', kitchen.state[4])
        formData.append('kitchen[hanging_cupboard]', kitchen.state[5])
        formData.append('kitchen[fan]', kitchen.state[6])
        formData.append('kitchen[stove]', kitchen.state[7])
        formData.append('kitchen[light]', kitchen.state[8])
        formData.append('kitchen[water_supply_drainage]', kitchen.state[9])
        formData.append('kitchen[under_sink]', kitchen.state[10])
        formData.append('kitchen[hot_supply_water]', kitchen.state[11])
        formData.append('kitchen[other]', kitchen.other)
        const cvKitchen = kitchen.images.length > 0 ? convertImg(kitchen.images) : []
        for (let i of cvKitchen) {
            formData.append('kitchen_img[]', i)
        }
        formData.append('kitchen[explain]', kitchen.content)

        formData.append('bath[ceiling]', bath.state[0])
        formData.append('bath[wall]', bath.state[1])
        formData.append('bath[floor]', bath.state[2])
        formData.append('bath[door]', bath.state[3])
        formData.append('bath[bath_heater]', bath.state[4])
        formData.append('bath[water_faucet]', bath.state[5])
        formData.append('bath[shower]', bath.state[6])
        formData.append('bath[hot_supply_water]', bath.state[7])
        formData.append('bath[water_supply_drainage]', bath.state[8])
        formData.append('bath[light]', bath.state[9])
        formData.append('bath[dryer]', bath.state[10])
        formData.append('bath[clothesline_pole]', bath.state[11])
        formData.append('bath[key]', bath.state[12])
        formData.append('bath[shelf]', bath.state[13])
        formData.append('bath[other]', bath.other)
        formData.append('bath[other_text]', 'caca')
        const cvBath = bath.images.length > 0 ? convertImg(bath.images) : []
        for (let i of cvBath) {
            formData.append('bath_img[]', i)
        }
        formData.append('bath[explain]', bath.content)

        formData.append('changing_room[ceiling]', change.state[0])
        formData.append('changing_room[wall]', change.state[1])
        formData.append('changing_room[floor]', change.state[2])
        formData.append('changing_room[door]', change.state[3])
        formData.append('changing_room[wash]', change.state[4])
        formData.append('changing_room[key]', change.state[5])
        formData.append('changing_room[water_faucet]', change.state[6])
        formData.append('changing_room[wash_basin]', change.state[7])
        formData.append('changing_room[water_supply_drainage]', change.state[8])
        formData.append('changing_room[light]', change.state[9])
        formData.append('changing_room[towel]', change.state[10])
        formData.append('changing_room[other]', change.other)
        const cvChanging = change.images.length > 0 ? convertImg(change.images) : []
        for (let i of cvChanging) {
            formData.append('changing_room_img[]', i)
        }
        formData.append('changing_room[explain]', change.content)

        formData.append('laundry_place[pan]', laundry.state[0])
        formData.append('laundry_place[water_faucet]', laundry.state[1])
        formData.append('laundry_place[shelf]', laundry.state[2])
        formData.append('laundry_place[door]', laundry.state[3])
        formData.append('laundry_place[light]', laundry.state[4])
        formData.append('laundry_place[other]', laundry.other)
        const cvLaundry = laundry.images.length > 0 ? convertImg(laundry.images) : []
        for (let i of cvLaundry) {
            formData.append('laundry_place_img[]', i)
        }
        formData.append('laundry_place[explain]', laundry.content)

        formData.append('toilet[ceiling]', toilet.state[0])
        formData.append('toilet[wall]', toilet.state[1])
        formData.append('toilet[floor]', toilet.state[2])
        formData.append('toilet[bowl]', toilet.state[3])
        formData.append('toilet[faucet_tank]', toilet.state[4])
        formData.append('toilet[door]', toilet.state[5])
        formData.append('toilet[light]', toilet.state[6])
        formData.append('toilet[fan]', toilet.state[7])
        formData.append('toilet[paper_holder]', toilet.state[8])
        formData.append('toilet[towel]', toilet.state[9])
        formData.append('toilet[shelf]', toilet.state[10])
        formData.append('toilet[washlet]', toilet.state[11])
        formData.append('toilet[other]', toilet.other)
        const cvToilet = toilet.images.length > 0 ? convertImg(toilet.images) : []
        for (let i of cvToilet) {
            formData.append('toilet_img[]', i)
        }
        formData.append('toilet[explain]', toilet.content)

        formData.append('living[ceiling]', living.state[0])
        formData.append('living[wall]', living.state[1])
        formData.append('living[floor]', living.state[2])
        formData.append('living[door]', living.state[3])
        formData.append('living[closet]', living.state[4])
        formData.append('living[shelf]', living.state[5])
        formData.append('living[window]', living.state[6])
        formData.append('living[screen_door]', living.state[7])
        formData.append('living[curtain]', living.state[8])
        formData.append('living[glass]', living.state[9])
        formData.append('living[air_condition]', living.state[10])
        formData.append('living[other]', living.other)
        const cvLiving = living.images.length > 0 ? convertImg(living.images) : []
        for (let i of cvLiving) {
            formData.append('living_img[]', i)
        }
        formData.append('living[explain]', living.content)

        formData.append('style_room[ceiling]', styleCheck.state[0])
        formData.append('style_room[wall]', styleCheck.state[1])
        formData.append('style_room[floor]', styleCheck.state[2])
        formData.append('style_room[door]', styleCheck.state[3])
        formData.append('style_room[closet]', styleCheck.state[4])
        formData.append('style_room[shelf]', styleCheck.state[5])
        formData.append('style_room[window]', styleCheck.state[6])
        formData.append('style_room[screen_door]', styleCheck.state[7])
        formData.append('style_room[curtain]', styleCheck.state[8])
        formData.append('style_room[glass]', styleCheck.state[9])
        formData.append('style_room[air_condition]', styleCheck.state[10])
        formData.append('style_room[other]', styleCheck.other)
        const cvStyle = styleCheck.images.length > 0 ? convertImg(styleCheck.images) : []
        for (let i of cvStyle) {
            formData.append('style_room_img[]', i)
        }
        formData.append('style_room[explain]', styleCheck.content)

        formData.append('balcony[balcony]', balcony.state[0])
        formData.append('balcony[clothesline]', balcony.state[1])
        formData.append('balcony[other]', balcony.other)
        const cvBalcony = balcony.images.length > 0 ? convertImg(balcony.images) : []
        for (let i of cvBalcony) {
            formData.append('balcony_img[]', i)
        }
        formData.append('balcony[explain]', balcony.content)

        formData.append('other[user_manual]', other.state[0])
        formData.append('other[remote_air]', other.state[1])
        formData.append('other[other]', other.other)
        const cvOther = other.images.length > 0 ? convertImg(other.images) : []
        for (let i of cvOther) {
            formData.append('other_img[]', i)
        }
        formData.append('other[explain]', other.content)

        httpClient.post('check_in', formData)
            .then(({ data }) => {
                // console.log('ok', data)
                showAlertDone()
            })
            .catch(({ data }) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
                <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: "bold", alignSelf: "center" }}>
                    入居時状況確認チェックシート
                </Text>
                {
                    list.map((section, index) => (
                        <View key={index}>
                            <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 40, lineHeight: 20 }}>
                                {section.title}
                            </Text>
                            <View style={{ borderTopWidth: 1, borderColor: Colors.grayBorder, marginBottom: 5 }}></View>
                            {section.items.map((item, index2) => (
                                <Text key={index2} style={GlobalStyles.fontNormal}>{item + "：" + status[listState[index].state[index2] || 1]}</Text>
                            ))}
                            <Text style={GlobalStyles.fontNormal}>{`その他：${listState[index].other || 'ー'}`}</Text>

                            <Text style={GlobalStyles.fontNormal}>{`現状写真：${listState[index].images.length === 0 ? 'ー' : ''}`}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {listState[index].images.map((i, ind) => (
                                    <View key={ind} style={{ position: 'relative', width: width / 6, height: width / 6, marginLeft: ind > 0 ? 5 : 0 }}>
                                        <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                                    </View>
                                ))}
                            </View>
                            <Text style={{ ...GlobalStyles.fontNormal, marginTop: 5 }}>{`具体的な状況：${listState[index].content || 'ー'}`}</Text>
                        </View>
                    ))
                }
                <TouchableOpacity onPress={showAlert} style={{ marginTop: 40, marginBottom: 20, backgroundColor: Colors.primary, borderRadius: 8, height: 50, justifyContent: 'center' }}>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.white, textAlign: 'center', fontWeight: 'bold' }}>内容を送信する</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}