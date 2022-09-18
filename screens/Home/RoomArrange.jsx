import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    ScrollView,
    Alert
} from 'react-native'
import GlobalStyles from 'root/styles'
import Colors from 'root/constants/Colors'
import httpClient from 'root/services/http-client'
import { getRoom, USER_ID } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesome } from '@expo/vector-icons'; 
export default function RoomArrange() {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        AsyncStorage.getItem(USER_ID).then(userId => {
            getRoom().then(room => {
                httpClient.get(`get_empty_room?article_id=${room.article_id}`)
                    .then(({ data }) => {
                        const rooms = data.data.rooms
                        const listState = rooms.map(roomItem => {
                            return {
                                id: roomItem.id,
                                articleName: room['article_name'],
                                roomNumber: roomItem['room_number'],
                                rentPrice: roomItem['rent_price'],
                                manageFee: roomItem['admin_expense'],
                                arrange: roomItem.layout.name,
                                area: roomItem['view_area'],
                                depositFee: roomItem['deposit_money'],
                                tip: roomItem['key_money'],
                                buildDate: roomItem.article['build_date'],
                                structure: roomItem.article['structure'],
                                roomCount: roomItem.article['room_count'],
                                roomType: roomItem['room_type'],
                                viewDirection: roomItem['view_direction'].name
                             }
                        })
                        setRooms(listState)
                    })
                    .catch(({data}) => {
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
    const formatDate = (val) => {
        if (!val) return ''
        const arr = val.split('-')
        return `${arr[0]}年${arr[1]}月${arr[2]}日`
    }
    const formatMoney = (val) => {
        if (val === '') {
            return '賃料はご相談ください。'
        } else {
            return "  " + Number(val).toLocaleString() + "円"
        }
    }
    const marginTop = 20
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{backgroundColor: Colors.white,paddingHorizontal: 20, paddingVertical: 20, flexGrow: 1}}>
                <View style={{backgroundColor: Colors.primary, borderRadius: 2}}>
                    <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', padding: 5, color: Colors.white}}>{"空き部屋・間取り"}</Text>
                </View>
                {rooms.length === 0 && <Text style={{...GlobalStyles.fontNormal, marginTop: 5}}>現在、空いているお部屋はございません。</Text>}
                {
                    rooms.length > 0 && rooms.map((room, index) => (
                        <View key={room.id}>
                            {index === 0 && <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center', color: Colors.blueLight, marginTop: 20}}>{room.articleName}</Text>}
                            {/* Room number */}
                            <View style={{marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: Colors.grayBorder, padding: 10}}>
                            <Text>{room.roomNumber + "号室"}</Text>
                            <View style={{backgroundColor: Colors.blueLight, paddingHorizontal: 5, borderRadius: 5}}>
                                <Text style={{...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold'}}>{"空き"}</Text>
                            </View>
                            </View>
                            {/* Details */}
                            <View style={{paddingHorizontal: 10, paddingBottom: 10, borderWidth: 1, borderTopWidth: 0, borderColor: Colors.grayBorder}}>
                                <View style={{flexDirection: 'row', alignItems: 'stretch', marginTop}}>
                                    <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'normal'}}>DETAILS</Text>
                                    <Text style={GlobalStyles.fontNormal}>{"タイプの詳細情報"}</Text>
                                </View>
                                <View style={{borderTopWidth: 1, borderColor: Colors.grayBorder}}></View>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop}}>
                                    <Text style={{color: Colors.white, backgroundColor: Colors.text, paddingHorizontal: 5, paddingVertical: 1}}>賃料</Text>
                                    <Text style={{color: Colors.red, marginLeft: 10}}>{formatMoney(room.rentPrice)}</Text>
                                    <Text style={{...GlobalStyles.fontNote}}>{`（管理費：${Number(room.manageFee).toLocaleString()}円）`}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop}}>
                                    <Text style={{color: Colors.white, backgroundColor: Colors.text, paddingHorizontal: 5, paddingVertical: 1}}>間取り</Text>
                                    <Text style={{color: Colors.red}}>{"  " + room.arrange}</Text>
                                    <Text style={{...GlobalStyles.fontNote}}>{`（専有面積：${room.area}m²）`}</Text>
                                </View>
                                <Text style={{...GlobalStyles.fontNormal, marginTop: 10}}>{`敷金/礼金　${room.depositFee === '' ? '-' : Number(room.depositFee).toLocaleString() + '円'}/${room.tip === '' ? '-' : Number(room.tip).toLocaleString() + '円'}/1ヶ月`}</Text>
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"保証金　　- (なし)"}</Text> */}
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"償却/敷引　-/-(なし)"}</Text> */}
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"建物タイプ　賃貸マンション(なし)"}</Text> */}
                                <Text style={{...GlobalStyles.fontNormal}}>{`築年月　${!!room.buildDate ? formatDate(room.buildDate) : '-'}`}</Text>
                                <Text style={{...GlobalStyles.fontNormal}}>{`構造　${room.structure}`}</Text>
                                <Text style={{...GlobalStyles.fontNormal}}>{`総戸数　${room.roomCount}戸`}</Text>
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"取引形態　仲介(なし)"}</Text> */}
                                <Text style={{...GlobalStyles.fontNormal}}>{`部屋コード　${room.roomType}タイプ`}</Text>
                                <Text style={{...GlobalStyles.fontNormal}}>{`向き　${room.viewDirection}`}</Text>
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"備考/特記事項(なし)"}</Text> */}
                                {/* <Text style={{...GlobalStyles.fontNormal}}>{"アーカイブ情報のため最新の募集情報はスタッフまで(なし)"}</Text> */}
                            </View>
                        </View>
                    ))
                }
                <View style={{marginTop: 40, marginBottom: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name="phone" size={20} color="black" />
                        <Text style={{...GlobalStyles.fontSubHeader}}>{" 物件に関するお問い合わせ"}</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: Colors.grayBorder, width: '100%'}}></View>
                    <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10}}>{"営業時間：１０：００～１９：００\n定休日：年末年始・GW・夏季休暇除く"}</Text>
                    <Text style={{...GlobalStyles.fontHeader, color: Colors.primary, fontWeight: "bold", marginTop: 10}}>{"06-6356-2512"}</Text>
                    {/* 営業時間：0：00～00：00 定休日：年末年始のみ */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'stretch', alignContent: 'stretch'}}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('TroubleContact') } style={{backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'center'}}>
                            <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"24時間WEB受付"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:0663562512')} style={{backgroundColor: Colors.primary, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20}}>
                            <Text style={{...GlobalStyles.fontNormal, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"電話をかける\n06-6356-2512"}</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}