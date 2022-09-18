import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    Alert
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { FontAwesome } from '@expo/vector-icons'
import httpClient from 'root/services/http-client'
import { getRoom, USER_ID } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Bookmarks() {
    const [bookmark, setBookmark] = useState({ mailBox: '', deliveryBox: '', name: '', roomNumber: '', contacts: [] })

    useEffect(() => {
        AsyncStorage.getItem(USER_ID).then(userId => {
            getRoom().then(room => {
                httpClient.get(`get_bookmark?resident_id=${userId}&room_id=${room.id}`)
                    .then(({ data }) => {
                        console.log('TEST: ', data)
                        const resident = data.data.resident
                        const contacts = []
                        if (resident.article['mng_corp_name']) contacts.push({ name: resident.article['mng_corp_name'], phone: resident.article['mng_corp_tel'] })
                        if (resident.article['mng_corp_name2']) contacts.push({ name: resident.article['mng_corp_name2'], phone: resident.article['mng_corp_tel2'] })
                        if (resident.article['mng_corp_name3']) contacts.push({ name: resident.article['mng_corp_name3'], phone: resident.article['mng_corp_tel3'] })
                        if (resident.article['mng_corp_name4']) contacts.push({ name: resident.article['mng_corp_name4'], phone: resident.article['mng_corp_tel4'] })
                        setBookmark(() => ({
                            roomNumber: room['room_number'],
                            mailBox: resident['mail_box_pin'],
                            deliveryBox: resident.article['delivery_box_pin'],
                            name: resident.article.name,
                            contacts
                        }))
                    })
                    .catch(({ data }) => {
                        Alert.alert('エラー', data.error[0], [
                            { text: 'OK' }
                        ])
                    })
            }).catch(({ data }) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
        })
    }, [])
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center' }}>{"入居のしおり"}</Text>
                <Text style={{ ...GlobalStyles.fontSubHeader, color: Colors.blueLight, marginTop: 10, textAlign: 'center', fontWeight: 'bold', lineHeight: 25 }}>{bookmark.name + bookmark.roomNumber}</Text>
                {/* <Text style={{ ...GlobalStyles.fontNormal, marginTop: 35, fontWeight: 'bold' }}>{"ご入居に際しての注意事項や、ご入居後の様々なご質問について取りまとめた『入居のしおり』をご一読ください"}</Text>
                <Button
                    titleStyle={{ ...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold' }}
                    title="入居のしおり（PDF）"
                    buttonStyle={{ marginTop: 15, borderRadius: 10, backgroundColor: Colors.primary, paddingVertical: 10 }} /> */}
                {/* yellow box */}
                <View style={{ paddingHorizontal: 10, paddingVertical: 15, marginTop: 25, backgroundColor: Colors.bgYellow }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center', lineHeight: 25 }}>{"メールボックス解錠番号\n及び操作方法"}</Text>
                    <View style={{ backgroundColor: Colors.white, paddingHorizontal: 10, paddingVertical: 20, marginTop: 15 }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"メールボックスは暗証番号に合わせていただくと開錠できます。暗証番号はレオン都市開発へお問い合わせ下さい。\n"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blue, fontWeight: 'bold' }}>{"メールボックス"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blue, fontWeight: 'bold' }}>{bookmark.mailBox || '開閉方法は【レオン都市開発 管理部　06-6356-2512】へお問い合わせ下さい。'}</Text>
                        {/* horizontal divider */}
                        <View style={{ borderTopWidth: 0.5, borderTopColor: Colors.blueLight, marginVertical: 10 }}></View>
                        <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blue, fontWeight: 'bold' }}>{"宅配ボックス"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blue, fontWeight: 'bold' }}>{bookmark.deliveryBox || '開閉方法は【レオン都市開発 管理部　06-6356-2512】へお問い合わせ下さい。'}</Text>
                    </View>
                </View>
                {/* footer */}
                <Text style={{ ...GlobalStyles.fontSubHeader, marginTop: 30 }}>{"共用部分管理会社連絡先"}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayBorder }}></View>
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10, lineHeight: 25, color: Colors.blue }}> {`エントランス・エレベーター・共用廊下・駐車場・駐輪場等の不具合やご契約に関しては下記へご連絡下さい。`}</Text>
                {bookmark.contacts.map((contact, index) => (
                    <View key={index}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10, lineHeight: 25 }}>
                            {`${contact.name}`}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <FontAwesome name="phone" size={16} color="black" />
                            <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{contact.phone}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
// {/* `営業時間：0：00～00：00\n定休日：毎週土・日曜日及び祝祭日\n */ }