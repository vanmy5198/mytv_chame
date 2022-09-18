import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import Accordion from 'react-native-collapsible/Accordion'
import AccordionHeader from '../../../components/AccordionHeader'
import AccordionContent from '../../../components/AccordionContent'

export default function Key({navigation}) {
    const list = [
        {
            header: '鍵の紛失',
            text: '鍵を紛失された場合は最寄りの警察署または交番に遺失物の届出をして下さい。\n',
            section: [
                {
                    label: '＜現在入室できている場合＞',
                    text: '弊社営業時間内に事前連絡のうえご来社いただけますと弊社管理用鍵の一時貸し出しが可能です。（必ず貸し出しができる鍵があるとは限りませんので必ず事前にご連絡下さい。）また追加鍵を有料にて発注しご使用いただけます。そのままお住まいいただく事も可能ですが、契約期間中にお渡しした鍵を全て退去時にご返却いただけない場合、鍵紛失損害金20,000円（税別）をお支払いいただきますので、鍵交換費用20,000円（税別）をお支払いいただき、鍵交換する事をお勧めいたします。\n'
                },
                {
                    label: '＜現在入室できていない場合＞',
                    text: '弊社営業時間内に事前連絡のうえご来社いただけますと弊社管理用鍵の一時貸し出しが可能です。（必ず貸し出しができる鍵があるとは限りませんので必ず事前にご連絡下さい。）貸出が不可能な場合は、鍵の破錠または開錠を手配する必要がございます。入室できる状態にて鍵交換が実施できますので弊社にて鍵交換をさせていただきます。費用は鍵の破錠代、交換代等全て入居者様のご負担となりますのでご了承下さい。※鍵の破錠・開錠はご加入中の火災保険で対応できる可能性がございます。ご加入中の火災保険の補償内容をご確認下さい。\n'
                },
                {
                    label: '※ご来社いただき鍵をお渡しする際の注意事項',
                    text: '契約者様ご本人及びご登録いただいております入居者様に限ります。法人契約の場合はご登録いただいております入居者様または法人担当者様に限ります。また、お越しいただく際は身分証を必ずお持ち下さい。',
                    color: Colors.red
                },
            ],
            footer: 1
        },
        {
            header: 'オートロックの解除',
            text: 'オートロックの解除方法は防犯上お伝えする事はできませんのでご了承下さい。鍵の一時貸し出しは可能です。',
            footer: 0
        }
    ]
    const [activeSections, setActiveSections] = useState([])
    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"鍵のトラブル"}</Text>
                </View>
                <Accordion
                    touchableComponent={TouchableOpacity}
                    activeSections={activeSections}
                    onChange={setSections}
                    sections={list}
                    renderHeader={AccordionHeader}
                    renderContent={AccordionContent} />
                <Text style={{...GlobalStyles.fontNormal, marginTop: 10 }}>
                    {"適切な事例がない場合は、レオン都市開発 管理部に"}
                    <Text onPress={() => Linking.openURL('tel:0663562512')} style={{ color: Colors.blue, textDecorationLine: 'underline', fontWeight: 'bold' }}>{"お電話"}</Text>
                    {"又は"}
                    <Text onPress={() => navigation.navigate('TroubleContact')} style={{ color: Colors.blue, textDecorationLine: 'underline', fontWeight: 'bold' }}>{"24時間WEB受付"}</Text>
                    {"によりお問い合わせください。"}
                </Text>
            </View>
        </ScrollView>
    )
}
