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

export default function MailBox({navigation}) {
    const list = [
        {
            header: 'メールボックスの暗証番号がわからない',
            text: '暗証番号が不明な場合は当アプリの入居者のしおりをご確認いただいたくか弊社までご連絡下さい。\n',
            footerLink: {
                text: '入居者のしおりページは→',
                src: 'Bookmarks'
            },
            footer: 2
        },
        {
            header: 'メールボックスが開かない',
            text: '暗証番号をセットしても開かない場合、ボックス内にチラシ等が詰まっている可能性がありますので、その際は入れ口より中の物を抜き取っていただき、再度お試し下さい。それでも開かない場合は弊社までご連絡下さい。',
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
                    <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white}}>{"メールボックスのトラブル"}</Text>
                </View>
                <Accordion 
                    touchableComponent={TouchableOpacity}
                    activeSections={activeSections}
                    onChange={setSections}
                    sections={list}
                    renderHeader={AccordionHeader}
                    renderContent={(content, index, isActive, sections) => AccordionContent(content, index, isActive, sections, navigation)}
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
