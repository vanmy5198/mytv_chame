import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'
import {getRoom} from 'root/services/request'

export default function LifeLine({navigation}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        // get user info & get current selected room
        getRoom().then(room => {
            setUser(() => ({articleName: room['article_name'], roomNumber: room['room_number']}))
        }).catch(({ data }) => {
            Alert.alert('エラー', data.error[0], [
                { text: 'OK' }
            ])
        })
    }, [])
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{backgroundColor: Colors.white,paddingHorizontal: 20, paddingVertical: 20, flexGrow: 1}}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"ライフライン手続き"}</Text>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center', color: Colors.blueLight, marginTop: 5}}>{user.articleName + " " + user.roomNumber}</Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 20}}>{"電気・水道・ガスの使用開始・中止のお手続きは、事前に対象の連絡先に連絡のうえ、お手続きください。"}</Text>
                {/* table */}
                <View style={{marginTop: 5}}>
                    <View style={style.row}>
                        <View style={style.borderHorizontal}><Text style={{...style.cellText, color: Colors.blue, fontWeight: 'bold'}}>{"電気を使用する"}</Text></View>
                        <View style={style.cellRight}><Text style={[style.cellText, style.contentCell]}>{"電気を使用される際には、ご入居者様にて対象の電力会社へ使用開始の手続きをして下さい。"}</Text></View>
                    </View>
                    <View style={style.row}>
                        <View style={style.borderHorizontal}><Text style={{...style.cellText, color: Colors.blue, fontWeight: 'bold'}}>{"ガスを使用する"}</Text></View>
                        <View style={style.cellRight}><Text style={[style.cellText, style.contentCell]}>{"ガスを使用される際には、ご入居者様にて対象のガス供給会社へガス開栓の手続きをして下さい。"}</Text></View>
                    </View>
                    <View style={style.row}>
                        <View style={style.borderHorizontal}><Text style={{...style.cellText, color: Colors.blue, fontWeight: 'bold'}}>{"水道を使用する"}</Text></View>
                        <View style={style.cellRight}><Text style={[style.cellText, style.contentCell]}>{"水道を使用される際には、ご入居者様にて対象の水道局へ水道開栓の手続きをして下さい。\n尚、弊社管理の定額使用料にてお支払いただく物件や共用部管理会社による検針・請求がある一部の物件では入居者様による開栓手続きは不要です。"}</Text></View>
                    </View>
                    <View style={{...style.row, borderBottomWidth: 1, borderBottomColor: Colors.grayLight}}>
                        <View style={style.borderHorizontal}><Text style={{...style.cellText, color: Colors.blue, fontWeight: 'bold'}}>{"インターネットに ついて"}</Text></View>
                        <View style={style.cellRight}><Text style={[style.cellText, style.contentCell]}>{"お住まいの物件により手続き方法が異なります。\nレオン都市開発 管理部までご連絡ください。"}</Text>
                            <View style={{paddingHorizontal: 20, marginTop: 10, marginBottom: 20}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Contact') } style={{backgroundColor: Colors.blue, borderRadius: 8, paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'center'}}>
                                    <Text style={{...GlobalStyles.fontSubHeader, color: "white", fontWeight: "bold", textAlign: 'center'}}>{"24時間WEB受付"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {/* table end */}
                <View style={{backgroundColor: Colors.yellow, padding: 10, marginTop: 20}}>
                    <Text style={{...GlobalStyles.fontNote, color: Colors.blueLight}}>{"※上記の電気・都市ガスの連絡先は、受給可能な代表的な供給会社をご案内しています。 自由化の折、別途 電気・都市ガスの供給会社を希望される場合は、ご自身でまず受給の可否について当該供給会社にご確認願います。"}</Text>
                </View>
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
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopColor: Colors.grayLight,
        borderLeftColor: Colors.grayLight,
        borderRightColor: Colors.grayLight
    },
    cellText: {
        ...GlobalStyles.fontNormal
    },
    contentCell: {
        paddingVertical: 10,
        paddingHorizontal: 3
    }, 
    borderHorizontal: {
        borderRightWidth: 1,
        borderRightColor: Colors.grayLight,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    cellRight: {
        width: '60%', justifyContent: 'center'
    }
})