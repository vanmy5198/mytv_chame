import React, {useEffect} from "react";
import {
    Text,
    View,
    StyleSheet,
  } from "react-native"
import GlobalStyles from '../../styles/index'
import {getRoom, USER_ID} from 'root/services/request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import httpClient from "root/services/http-client"

export default function CommonInfo ({localStyle, user, setUser}) {
    useEffect(() => {
        // get user info & get current selected room
        AsyncStorage.getItem(USER_ID).then(userId => {
            Promise.all([httpClient.get(`get_resident?resident_id=${userId}`), getRoom()])
                .then(res => {
                    const { name, kana } = res[0].data.data.resident
                    const { article_name, room_number } = res[1]
                    setUser((prev) => ({ ...prev, articleName: article_name, roomNumber: room_number, name, furigana: kana }))
                })
                .catch(({ data }) => {
                    Alert.alert('エラー', data.error[0], [
                        { text: 'OK' }
                    ])
                })
        })
    }, [])
    return (
        <View style={{...localStyle}}>
            <Text style={style.textSection}>{"【契約者情報】"}</Text>
            <Text style={style.textSection}>{"物件名"}</Text>
            <Text style={style.textNormal}>{"　" + user.articleName}</Text>
            <Text style={style.textSection}>{"号室"}</Text>
            <Text style={style.textNormal}>{"　" + user.roomNumber}</Text>
            <Text style={style.textSection}>{"氏名"}</Text>
            <Text style={style.textNormal}>{"　" + user.name}</Text>
            <Text style={style.textSection}>{"フリガナ"}</Text>
            <Text style={style.textNormal}>{"　" + user.furigana}</Text>
        </View>
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
    }
})