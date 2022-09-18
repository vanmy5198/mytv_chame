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

export default function Toilet({navigation}) {
    const list = [
        {
            header: 'トイレのつまり',
            text: 'ラバーカップによるつまり解消が効果的です。ただし、携帯電話などの異物を落とした場合などは、絶対に使用せず、レオン都市開発 管理部まで、電話又はWEB受付によりご連絡下さい。',
            about: {
                label: 'ラバーカップの使用方法',
                text: ['①排水口にラバーカップを密着させる。\n\n②ゆっくり押し込んだ後、カップ内の水を排水口へ押し出し、便槽内に水を溜めた状態で素早く引いてください。\n\n②を何度か繰り返し行うことで詰まりが除去されます。 ポイントはカップ内に空気を入れずに、カップ内の水の水圧で詰まりを押し流すことです。\nその際、便槽内部の汚水が跳ね上がる可能性がございます。\n中央に穴をあけた透明のビニールシートなどを便器にかぶせ、周りに新聞紙などを敷いてから作業を行うと、汚水が跳ねるのを防げます。\n\n※つまりの原因となりますので、タンクの手洗い付近には物を置かないようにお願いいたします。\n\n※使用方法により発生したつまり・水漏れ等の修理費用につきましては、お客様のご負担になります。\n\n※上記でも症状が改善しない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等がございます。予めお控えの上、お問い合わせください。']
            },
            footer: 1
        },
        {
            header: 'ウォシュレットが作動しない',
            text: 'コンセントの抜き差しを一度お試しください。\n復旧しない場合は基盤の故障が考えられます。\n弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等がございます。予めお控えの上、お問い合わせください。',
            footer: 2
        },
        {
            header: '水漏れ',
            text: '給水管や便器からの水漏れの場合は、濡れている部分をしっかりお拭き取りいただきまして、水漏れ箇所を特定して下さい。結露により濡れる場合がありますので、換気をしっかり行って下さい。水漏れが酷い場合は止水栓を閉めて応急処置をして下さい。\n\n※結露が原因でない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。 入力内容にはメーカー・型番・故障箇所の写真添付等がございます。予めお控えの上、お問い合わせください。',
            footer: 2
        },
        {
            header: 'トイレの水が流れない',
            text: '以下の点をご確認のうえ、レオン都市開発 管理部まで、電話又はWEB受付によりご連絡下さい。\n①止水栓は全開ですか？\n②タンク内に水は溜まっていますか？\n③タンクのレバーが空回りするような違和感はありませんか？\n④タンク内に節水のためのペットボトルなどを入れていませんか？',
            footer: 1
        },
        {
            header: 'トイレの水が止まらない',
            text: 'トイレタンク内を確認してください。\nゴム弁を持ち上げるアームチェーン、浮玉等が引っかかったり、からまったりしていないか、浮玉の止まる位置がオーバーフロー管より高い位置にないか確認してください。\n水の流れが激しい場合は止水栓をマイナスドライバーなどで右に回して応急処置をお願いします。\n\n※ペットボトルや固形の洗浄剤等、タンク内に物を入れるとゴム栓やチェーン等の支障になりますので、物を入れないでください。\n\n※上記を確認しても問題がない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等がございます。予めお控えの上、お問い合わせください。',
            footer: 2
        },
        {
            header: 'アース線が外れている場合',
            text: 'アース線は万が一故障や漏電した場合に感電の恐れがあるのを防ぐ為にあります。\n',
            section: [
                {
                    label: '【接続方法】',
                    text: '①ネジ式　アース端子のカバーを開けると金属のアースネジがあります。そのネジをプラスドライバーで緩め、アース線先端の皮をむき、芯線部をアース端子につなげます。その状態のままネジを締めきります。最後にアース線を下に引っ張り、外れない事が確認出来ればカバーを閉めて完了です。作業の際は必ず電源プラグをコンセントから抜いて行ってください。\n\n②ワンタッチ式　アース端子のカバーを開け、接続部分に差し込みます。軽く引き抜けなければカバーを閉じて下さい。'
                },
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
            <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"トイレのトラブル"}</Text>
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
