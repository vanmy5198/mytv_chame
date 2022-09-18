import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, StatusBar, Image } from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import httpClient from 'root/services/http-client'
import { Button } from 'react-native-elements'
import { convertImg } from 'root/services/utils'
import { window } from 'root/constants/Layouts'
const { width } = window

export default function TroubleContact({ navigation, route }) {

    const marginTop = 5
    const marginTop2 = 20
    const send = async () => {
        const formData = new FormData()
        formData.append('article_name', route.params.article_name)
        formData.append('room_name', route.params.room_number)
        formData.append('name', route.params.name)
        formData.append('mail', route.params.email)
        formData.append('phone_number', route.params.phone_number)
        formData.append('contact_method', route.params.contactMethod)
        formData.append('content', route.params.content)
        formData.append('trouble_explain', route.params.status)
        formData.append('manufacture_name', route.params.maker)
        formData.append('equipment_location', route.params.place)
        const troubleImg64 = route.params.troubleImage.length > 0 ? convertImg(route.params.troubleImage) : []
        const equipImg64 = route.params.equipImage.length > 0 ? convertImg(route.params.equipImage) : []
        for (let i of troubleImg64) {
            formData.append('trouble_img[]', i)
        }
        for (let i of equipImg64) {
            formData.append('equipment_img[]', i)
        }
        httpClient.post('send_trouble', formData)
            .then(() => {
                showAlertDone()
            })
            .catch(({ data }) => {
                // console.log('errrrrr', data)
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
    }
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
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 20 }}>
                <StatusBar backgroundColor={Colors.primary} />
                <Text style={style.paragraph}>{"下記フォームに必要事項をご記入ください。"}</Text>
                {/* 物件名 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"物件名"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.article_name}</Text>
                {/* 号室 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"号室"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.room_number}</Text>
                {/* 物件名 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"名前"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.name}</Text>
                {/* 物件名 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"電話番号"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.phone_number}</Text>
                {/* メールアドレス */}
                <View style={{ flexDirection: 'row', marginTop: marginTop2 }}>
                    <Text style={style.header}>{"メールアドレス"}</Text>
                    <Text style={[GlobalStyles.fontNote, { paddingBottom: 2, alignSelf: 'flex-end' }]}>{"  ※半角英数"}</Text>
                </View>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.email}</Text>
                {/* 弊社からの連絡方法 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"弊社からの連絡方法"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.contactMethod === '1' ? '電話' : 'メール'}</Text>
                {/* トラブル内容 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"トラブル内容"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.content}</Text>
                {/* 設備箇所 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"設備箇所"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.place}</Text>
                {/* 状況（いつ頃から　どのような） */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"状況（いつ頃から　どのような）"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.status}</Text>
                {/* 状況の写真 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"状況の写真"}</Text>
                {route.params.troubleImage.length === 0 && <Text style={{ ...style.paragraph, marginTop }}>{"なし"}</Text>}
                {route.params.troubleImage.length > 0 &&
                    (<View style={{ flexDirection: 'row', marginTop }}>
                        {route.params.troubleImage.map((i, ind) => (
                            <View key={ind} style={{ position: 'relative', width: width / 6, height: width / 6, marginLeft: ind > 0 ? 5 : 0 }}>
                                <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                            </View>
                        ))}
                    </View>)
                }
                {/* 設備のメーカー名・型式品番 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"設備のメーカー名・型式品番"}</Text>
                <Text style={{ ...style.paragraph, marginTop }}>{route.params.maker}</Text>
                {/* 設備の写真 */}
                <Text style={{ ...style.header, marginTop: marginTop2 }}>{"設備の写真"}</Text>
                {route.params.equipImage.length === 0 && <Text style={{ ...style.paragraph, marginTop }}>{"なし"}</Text>}
                {route.params.equipImage.length > 0 &&
                    (<View style={{ flexDirection: 'row', marginTop }}>
                        {route.params.equipImage.map((i, ind) => (
                            <View key={ind} style={{ position: 'relative', width: width / 6, height: width / 6, marginLeft: ind > 0 ? 5 : 0 }}>
                                <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                            </View>
                        ))}
                    </View>)
                }
                <Button
                    titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                    buttonStyle={{ backgroundColor: Colors.primary, borderRadius: 8, height: 50 }}
                    containerStyle={{ marginTop: 30 }}
                    title="送信する"
                    onPress={showAlert}
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
        alignSelf: 'flex-end',
        paddingBottom: 2,
        color: Colors.red,
        fontWeight: 'bold'
    }
})