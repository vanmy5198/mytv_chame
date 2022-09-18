import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'
import Accordion from 'react-native-collapsible/Accordion'
import QAAccordionHeader from '../../components/QAAccordionHeader'
import QAAccordionContent from '../../components/QAAccordionContent'

export default function Q_AScreen({ navigation }) {
    const list = [
        {
            header: '鍵を追加したい',
            text: '弊社よりメーカーに発注いたします。鍵のコピーはエントランスを含むシリンダーが故障する恐れがありますのでご遠慮下さい。\n\n〈鍵追加の手順〉\n①アプリ内の鍵の追加申請またはお電話（06-6356-2512）にて弊社までご連絡下さい。\n\n②弊社より鍵の追加料金のご請求書をお送りします。\n\n③お振込みにてお支払いいただきまして入金確認後、鍵を発注いたします。\n\n④メーカーから鍵の納品がございましたら入居者様へ宅急便にてお送りいたします。納期につきましては在庫がない場合、2週間から1ヶ月前後となりますのでご了承下さい。\n\n※鍵をお届けの際、不在時は宅配BOXに投函となります。',
            textSpan: '鍵の追加申請',
            color: "#2199E0",
            link: '鍵の追加申請はこちら→',
            navigate: 'KeyForm',
            type: 1
        },
        {
            header: 'ペットを飼育したい',
            text: '※管理規約にてペットの飼育が許可されている物件のみペット飼育可能です。飼育不可物件での無断飼育は契約違反となり即解約となります。また、ペット飼育可能物件での無断飼育が発覚した場合、違約金が発生いたしますので必ず申請をお願いいたします。ペット飼育にあたりましては、申請書、誓約書のご提出、礼金及び敷金のお支払いが必要となります。\n\n〈ペット飼育の手順〉\n①アプリ内のペット飼育仮申請またはお電話（06-6356-2512）にてご連絡下さい。\n\n②お電話の場合、弊社よりペット飼育申請書、誓約書、ご請求書をお送りいたします。\n\n③ペット飼育申請書類の提出\n\n④礼金及び敷金のお振込み',
            textSpan: 'ペット飼育仮申請',
            color: "#2199E0",
            link: 'ペット飼育仮申請はこちら→',
            navigate: 'PetForm',
            type: 1
        },
        {
            header: '近隣の騒音について',
            text: '共同住宅では個人のサイクルにより様々な生活スタイルの入居者様がおられます。足音やドアの開閉音等の日常的な音は「生活音」としてご理解をお願い致します。\nまた人により感じ方も異なる為、ご自身では普通のことでも他では大きく音が響き影響する場合があります。夜間及び早朝は多くの方が寝静まっている時間のため特にご注意下さい。\n深夜に運動・入浴・洗濯・掃除等で大きな音を立てたり、来客の上で大きな声で騒ぐことや大音量によるテレビ視聴・音楽鑑賞等も他の入居者様に迷惑となります。入居者の皆様が快適な生活を送れるよう、皆様のご協力をお願いいたします。\n尚、明らかな騒音にお困りの場合はお問い合わせフォームまたはお電話（06-6356-2512）にてご相談下さい。共用部管理会社と協力のうえご対応いたします。',
            textSpan: '',
            color: "#2199E0",
            link: 'お問い合わせはこちら→',
            navigate: 'Contact',
            type: 1
        },
        {
            header: '入居者の追加',
            text: '入居者を追加される場合は事前にお問い合わせフォームおよびお電話（06-6356-2512）にて弊社までご連絡下さい。申請書類をご提出いただきます。',
            textSpan: '',
            color: "#2199E0",
            link: 'お問い合わせはこちら→',
            navigate: 'Contact',
            type: 1
        },
        {
            header: '契約者登録内容の変更',
            text: '契約者様、保証人様、入居者様に連絡先、勤務先等ご登録内容に変更があった場合はお問い合わせフォームおよびお電話（06-6356-2512）にて弊社までご連絡下さい。',
            textSpan: '',
            color: "#2199E0",
            link: 'お問い合わせはこちら→',
            navigate: 'Contact',
            type: 1
        },
        {
            header: '設備に不具合が生じたら',
            text: '設備に不具合が生じた場合は、トラブル箇所カテゴリーをご確認いただきまして、改善されない場合は、お問い合わせフォームまたはお電話にて弊社までご連絡下さい。ご連絡いただく際は以下の情報をご用意ください。\n\n①どの設備\n\n②いつから\n\n③どのような不具合が有るか\n\n④メーカー名\n\n⑤型番・品番・年式　等\n\n⑥状況の写真',
            textSpan: 'トラブル箇所カテゴリー',
            color: "#2199E0",
            link: 'トラブル箇所カテゴリーはこちら→',
            navigate: 'Trouble',
            type: 1
        },
        {
            header: '前入居者の郵便物について',
            text: '前入居者様が転居届を出されていない等、ご入居中に前入居者様宛の郵送物が届く場合がございます。ご入居時に前入居者宛の郵便物が届いた場合は、お手数ではございますが郵送物に直接【宛先人転居】と書いて郵便ポストへ直接投函していただきます様お願いいたします。（多数ございます場合はひとまとめにし別紙に【宛先人転居】と記載いただいたものを張り付けた上でポスト投函が可能です。）尚、宅急便は受け取らず、宅配業者に前入居宛である事をお伝えください。またダイレクトメールは破棄していただくか、弊社までご連絡いただけましたら返信用封筒をお送りさせていただきますので弊社までご返送くださいませ。',
            textSpan: '【宛先人転居】',
            color: "#E50012",
            link: 'お問い合わせはこちら→',
            navigate: 'Contact',
            type: 1
        },
        {
            header: '入居時の室内チェックリストについて',
            text: 'ご契約が開始となりましたら、アプリの室内チェックリストかチェックシートにて室内の現状をチェックしていただき、契約開始日から2週間以内に室内チェックリストを送信いただくかシートをご提出下さい。室内チェックリストをご提出いただけていない場合で、退去時に壁などに傷が見つかった場合や、設備に不具合が発生していた場合等、もともとあった傷や不具合なのか、入居後に発生したものなのかが客観的に見て判断ができないため、修繕費をご負担いただく可能性があります。ご入居者様から入居時の現状をご報告いただく事で、退去時の現状回復におけるトラブルを未然に防止することができますので、必ず現状をご確認いただきましてご提出いただきますようお願いいたします。また、ご報告いただきました不具合箇所につきましては、状況を確認させていただきまして、生活に支障があると判断した場合、修理対応を行わせていただきます。',
            textSpan: '室内チェックリスト',
            color: "#2199E0",
            link: '室内チェックリストはこちら→',
            navigate: 'RoomCheckScreen',
            type: 1
        },
        {
            header: '駐車場、駐輪場について',
            text: 'マンションの駐車場・駐輪場については、共用部管理会社にて管理をしておりますので直接お問い合わせ下さい。',
            textSpan: '',
            color: "#2199E0",
            link: '共用部管理会社の連絡先はこちら→',
            navigate: 'Bookmarks',
            type: 1
        },
        {
            header: 'ゴミの搬出方法について',
            text: 'ゴミの搬出方法については、共用部管理会社にて管理をしておりますので直接お問い合わせ下さい。',
            textSpan: '',
            color: "#2199E0",
            link: '共用部管理会社連絡先はこちら→',
            navigate: 'Bookmarks',
            type: 1
        },
        {
            header: '解約について',
            text: 'レオン都市開発 管理部まで、早急に電話によりご連絡下さい。',
            textSpan: '',
            color: "#2199E0",
            link: '',
            navigate: '',
            type: 2
        }
    ]
    const [activeSections, setActiveSections] = useState([])
    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: Colors.white, paddingVertical: 20, flexGrow: 1, paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"よくある質問"}</Text>
                </View>
                <Accordion
                    touchableComponent={TouchableOpacity}
                    activeSections={activeSections}
                    onChange={setSections}
                    sections={list}
                    renderHeader={QAAccordionHeader}
                    renderContent={(content, sections) => QAAccordionContent(content, navigation)}
                    duration={400} />
            </View>
        </ScrollView>
    )
}
