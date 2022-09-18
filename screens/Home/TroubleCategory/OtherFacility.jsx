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

export default function OtherFacility({ navigation }) {
    const list = [
        {
            header: 'アース線の接続方法',
            text: 'アース線とは…万が一故障や漏電した場合に感電の恐れがあるため、それを防止する為にあります。',
            paragraph: [
                {
                    label: '【接続方法】',
                    text: '\n①ネジ式　アース端子のカバーを開けると金属のアースネジがあります。そのネジをプラスドライバーで緩め、アース線先端の皮をむき、芯線部をアース端子につなげます。その状態のままネジを締めきります。最後にアース線を下に引っ張り、外れない事が確認出来ればカバーを閉めて完了です。作業の際は必ず電源プラグをコンセントから抜いて行ってください。\n\n②ワンタッチ式　アース端子のカバーを開け、接続部分に差し込みます。軽く引き抜けなけれはカバーを閉じて下さい。'
                },
            ],
            footer: 0
        },
        {
            header: 'キッチン換気扇',
            text: '換気扇は油汚れで動かなくなることがあります。また空気だけではなく、埃等も吸い込みます。埃が溜ると吸い込む力が弱くなるだけでなく、故障の原因に繋がりますので、定期的な掃除をしてください。 掃除をしても改善されなかったり、作動しない場合は故障が考えられます。その際は弊社お問い合わせフォームより連絡ください。',
            footer: 2
        },
        {
            header: '浴室換気乾燥機',
            text: '浴室乾燥機が作動しなくなった場合や機能しなくなった場合は、リセット作業をお試しいただくことで改善する場合がございます。\nリセット手順はメーカー毎に異なりますので室内備え付けの取扱説明書を参考にお試しください。\n上記を試しても改善が見られない場合は、浴室換気乾燥機メーカーと型番、リモコンの型番をお控えの上、弊社までご連絡ください。尚、機種によっては給湯機と連動している場合がありますので、給湯器の型番、給湯器リモコンの型番も必要になります。\n\n ※定期的なフィルターのお掃除をお願いします。掃除不足による故障の場合、修理費用は入居者様負担となります。',
            footer: 2
        },
        {
            header: '電気がつかない',
            text: '',
            paragraph: [
                {
                    label: '【入居時】',
                    text: '電気の開通の連絡を入居者様にて電力供給会社へ行って下さい。\n'
                },
                {
                    label: '【入居中】',
                    text: 'ブレーカーが上がっているかをご確認下さい。上がっていてもつかない場合、正常な電化製品を各箇所のコンセントにつないてお試しいただき、電気が通電していない場合は電気料金の未払いが無いかをご確認後当社までご連絡下さい。'
                }
            ],
            footer: 2
        },
        {
            header: '照明について',
            text: '廊下、玄関、トイレ、脱衣室、キッチン等の電気がつかない場合、電球切れの可能性が高いので入居者様にて電球の交換を行って下さい。電球を交換しても電気がつかない場合、照明器具及び電気の配線の不具合が考えられますので弊社までご連絡下さい。居室の照明はほとんどの場合設備ではありませんので、入居者様にて照明器具を交換して下さい。照明器具に異常がない場合は弊社までご連絡下さい。',
            footer: 2
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
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"その他の設備のトラブル"}</Text>
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
