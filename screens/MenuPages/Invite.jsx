import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    Alert
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import httpClient from 'root/services/http-client'
import { getRoom, USER_ID } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer1 from 'root/components/Footer1'
export default function Invite() {
    // const list = [
    //     { name: '礼御　太郎' },
    //     { name: '礼御　花子' }
    // ]

    const [list, setList] = useState([])
    const [room, setRoom] = useState({})

    useEffect(() => {
        getGroupFamily()
    }, [])

    function getGroupFamily() {
        AsyncStorage.getItem(USER_ID).then(userID => {
            getRoom(userID).then(room => {
                setRoom({articleName: room['article_name'], roomNumber: room['room_number']})
                httpClient.get(`get_group_family?resident_id=${userID}&room_id=${room.id}`).then(({ data }) => {
                    setList(() => (data.data.residents))
                }
                ).catch(({data}) => {
                    Alert.alert('エラー', data.error[0], [
                        { text: 'OK' }
                    ])
                })
            })
            .catch(({ data }) => {
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center' }}>{"家族会員招待"}</Text>
                <Text style={{ ...GlobalStyles.fontSubHeader, color: Colors.blueLight, marginTop: 10, textAlign: 'center', fontWeight: 'bold', lineHeight: 25 }}>{`${room.articleName} ${room.roomNumber}\n契約者・入居者一覧`}</Text>
                <Text style={{ ...GlobalStyles.fontNormal, marginTop: 35, fontWeight: 'bold' }}>{"今後、招待することで、弊社管理物件にご同居されるご家族さまにも入居者様用アプリ【chameLEON】をご利用いただけるように予定しております。\n下記にご家族さまのお名前が表示されていない場合は、ご家族さまの招待が出来ません。管理会社までご連絡ください。"}</Text>

                {list.map(member => (
                    <View key={member.name} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: Colors.grayBorder, borderBottomWidth: 1, paddingBottom: 10, marginTop: 25 }}>
                        <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'normal', flexShrink: 1 }}>{member.name}</Text>
                        <View style={{paddingVertical: 3, paddingHorizontal: 20, borderRadius: 8, backgroundColor: Colors.grayLight, flexShrink: 0}}>
                            <Text style={{ ...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold' }}>登録済み</Text>
                        </View>
                    </View>
                ))}
                <Footer1 localStyle={{marginTop: 50}} route={'Contact'} />
            </View>
        </ScrollView>
    )
}