import React, {useState} from 'react'
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
import {window} from 'root/constants/Layouts'
const {width} = window
export default function Gas({navigation}) {
    const list = [
        {
            header: 'ガス臭い',
            text: 'ガス漏れの可能性があり大変危険です。\n至急換気を行い、ご契約されているガス会社へ連絡してください。',
            footer: 3
        },
        {
            header: '全てのガス器具が使用できない',
            text: '以下の点をご確認のうえ、レオン都市開発 管理部まで、電話又はWEB受付によりご連絡下さい。\n',
            section: [
                {
                    label: '＜入居時＞',
                    text: '他のガス器具は使えますか？（使用手続きはお済みですか？該当設備のガス栓は全開ですか？）\n'
                },
                {
                    label: '＜入居後＞',
                    text: '全てのガス器具が使えなくなる原因として、契約開始時にガスの開栓作業はしましたか？また、ある日突然使用できなくなった場合は、ガス料金が支払われているかご確認下さい。それら以外でガスメーター（マイコンメーター）安全機能が働き、ガスを遮断することがあります。\n以下の理由などで遮断した場合、マイコンメーターの赤ランプが点滅しています。\n①ガスの圧力低下（ガス漏れ）\n②地震感知（震度5相当以上）\n③ガスが異常流出（ゴム管のはずれなど）\n④過度の長時間使用（消し忘れ）'
                },
            ],
            about: {
                label: 'マイコンメーターの遮断復帰について',
                text: ['遮断の解除方法は、ガス供給会社などのホームページでマイコンメーターの復帰手順を参照して下さい。',
                    {style: {marginTop: 25, alignSelf: 'center',width: width * 0.8, height: width * 0.8 * 0.9}, src: require('../../../assets/gas_1.png')},
                    {style: {marginTop: 50},text: '① すべてのガス元栓を閉めます。'},
                    {style: {marginTop: 25, alignSelf: 'center',width: width * 0.8, height: width * 0.8 * 0.5}, src: require('../../../assets/gas_2.png')},
                    {style: {marginTop: 50},text: '② マイコンメーターの復帰ボタンのキャップをはずします。'},
                    {style: {marginTop: 25, alignSelf: 'center', marginLeft: -(width*0.5*0.2),width: width * 0.5, height: width * 0.5 * 1.1}, src: require('../../../assets/gas_3.png')},
                    {style: {marginTop: 50},text: '③ 復帰ボタンを強く押しこみ、ゆっくり手を離してください。'},
                    {style: {marginTop: 10, alignSelf: 'center', marginLeft: -(width*0.5*0.3),width: width * 0.5, height: width * 0.5}, src: require('../../../assets/gas_4.png')},
                    {style: {marginTop: 50},text: '④ 手を離して3分間待ちます。\nランプの点滅が消えるとガスが使えます。'},
                    {style: {marginTop: 25, marginBottom: 20, alignSelf: 'center', width: width * 0.3, height: width * 0.3 *1.5}, src: require('../../../assets/gas_5.png')},
                ]
            },
            footer: 1
        },
        {
            header: 'ガスコンロが点火しない',
            text: '電池切れ・清掃不足・故障の可能性があります。\n',
            paragraph: [
                {
                    label: '電池切れ：',
                    text: '2口以上のガスコンロで1つだけ使えない場合でも電池切れの可能性があります。新しいアルカリ電池に交換をしてください。\n'
                },
                {
                    label: '清掃方法：',
                    text: '取扱説明書をご参照頂き清掃してください。清掃後、部品がしっかりはまっているかご確認下さい。\n'
                },
                {
                    label: '部品の装着：',
                    text: 'バーナーキャップや五徳などの部品が正常に装着されていない可能性があります。正常に部品が装着されているか確認をお願いします。\n'
                },
                {
                    label: '',
                    text: '※上記でも症状が改善しない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等がございます。予めお控えの上、お問い合わせください。\n※電池切れ・吹きこぼれ・使用方法などが原因の場合、出張費・修理費用はご入居者様負担となります。'
                }
            ],
            footer: 2
        }
    ]
    const [activeSections, setActiveSections] = useState([])
    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{backgroundColor: Colors.white,paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1}}>
                <View style={{backgroundColor: Colors.primary, borderRadius: 2}}>
                    <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white}}>{"ガスのトラブル"}</Text>
                </View>
                <Accordion 
                    touchableComponent={TouchableOpacity}
                    activeSections={activeSections}
                    onChange={setSections}
                    sections={list}
                    renderHeader={AccordionHeader}
                    renderContent={AccordionContent}
                    duration={400} />
                <Text style={{ ...GlobalStyles.fontNormal, marginTop: 10 }}>
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
