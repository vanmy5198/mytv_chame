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

export default function AirCondition({navigation}) {
    const list = [
        {
            header: 'エアコンが作動しない。リモコンが効かない',
            text: 'コンセントの差込が甘かったり、お部屋のブレーカーが落ちている可能性が考えられます。電気が供給されていることをご確認ください。\n上記を確認後、問題なく電気が供給されている場合はエアコン本体の主電源で運転出来るかご確認ください。\n',
            paragraph:
                [
                    {
                        label: '主電源で運転が可能な場合：',
                        text: 'リモコンの電池切れの可能性がございます。リモコンの電池交換をお試しください。\n'
                    },
                    {
                        label: '主電源で運転が不可な場合：',
                        text: '一度取扱説明書を参照の上、本体のリセットをお試しください。\n'
                    },
                    {
                        label: '',
                        text: '※上記でも症状が改善しない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等（リモコンのエラー表示がある場合はそちらも）がございます。予めお控えの上、お問い合わせください。'
                    }
                ],
            footer: 2
        },
        {
            header: 'エアコンから異音がする',
            text: 'マンションは気密性が高いため、窓や給気口を閉めきった密封の状態で24時間換気や台所換気扇などを使用した場合に、エアコンのドレンホースなどから外気を取り入れようとします。\nその際に「ポコポコ」音が発生する可能性がありますので、音が発生した場合は、小窓や給気口を開けて下さい。 どうしても音が気になる場合は、ホームセンターなどで外気の逆流を防止するエアーカットバルブ（逆止弁）を購入いただきドレンホースに取り付けると解消できます。\n\n※また、エアコン作動時に給気口を空けたほうがスムーズにエアコンが動くため、電気代も抑えることができます。',
            footer: 2
        },
        {
            header: 'エアコンから水漏れする',
            text: 'エアコンから水漏れする原因の多くはドレンホース（※）、フィルターの清掃不足による目詰まりに関係します。フィルター清掃を怠った場合や喫煙により、エアコン内部のゴミやたばこのヤニがドレンホース内部で詰ると、エアコン内部で発生した結露水が排出できず、水漏れの原因になります。\n\n※ドレンホース・・・エアコン室内機で発生した水分を室外に排出させるためのホース\n\nエアコン本体のフィルターは2週間に1回程度の清掃をしていますか？\n\n※定期的にフィルター及びドレンホースのお掃除をお願いします。（目安として2週間に1回程度）清掃不足が原因による修理及び対応の費用は入居者様負担となります。清掃作業をして頂いた後、外のドレンホースから水が出ているかをご確認下さい。汚れている場合はフィルターの清掃をしてください。外のドレンホースから水が出ているかをご確認ください。\n',
            section: [
                {
                    label: '＜水が出ていない場合＞',
                    text: '（１）ドレンホースが植木鉢等でつぶれていませんか？\n（２）ドレンホースにホコリや虫の死骸が詰っていませんか？\n（３）ドレンホースの先端が水溜りの中に浸かっていませんか？\nドレンホースが障害物で潰れていたり、先端がふさがっている可能性がありますので取り除いてください。\n'
                },
                {
                    label: '＜それでも水が出ていない場合＞',
                    text: 'ドレンホースが詰まっている可能性がありますので市販のポンプ等を使用し、ゴミを取り除いてドレンホースの詰まりが解消されるか確認して下さい。\nまた、室内の湿度が高すぎる時や、設定温度が低くエアコン室内機内が冷えすぎた場合に本体内に結露が発生し、水が出てくることがございます。\nその場合は除湿運転にしていただくか、設定温度を上げて使用していただくと改善することがございます。\n\n※上記でも症状が改善しない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等（リモコンのエラー表示がある場合はそちらも）がございます。予めお控えの上、お問い合わせください。'
                }
            ],
            footer: 2
        },
        {
            header: 'エアコンの効きが悪い',
            text: '夏季・冬季など外気との温度差によって設定どおりの温度の風が出るようになるまでに時間を要する場合がございます。1時間程度運転し、設定温度の風が出るかご確認下さい。また、清掃不足によりエアコンが効きにくくなる場合もございます。定期的にフィルター及びドレンホースのお掃除をお願いします。（目安として2週間に1回程度）清掃不足が原因よる修理及び対応の費用は入居者様負担となります。\n\n※上記でも症状が改善しない場合は、弊社お問い合わせフォームより必要事項をご入力の上、お問い合わせください。入力内容を確認後、弊社担当よりご連絡致します。\n入力内容にはメーカー・型番・故障箇所の写真添付等（リモコンのエラー表示がある場合はそちらも）がございます。予めお控えの上、お問い合わせください。',
            footer: 2
        },
    ]
    const [activeSections, setActiveSections] = useState([])
    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"エアコンのトラブル"}</Text>
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
