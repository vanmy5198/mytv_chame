import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import {window} from '../../../constants/Layouts'

export default function Trouble({navigation}) {
    const categories = [
        {name: '水廻り', src: 'Water', color: Colors.secondary, src: 'Water', image: require('../../../assets/trouble_water.png')},
        {name: '鍵', src: 'Key', color: Colors.yellow, src: 'Key', image: require('../../../assets/trouble_key.png')},
        {name: 'ガス', src: 'Gas', color: Colors.secondary, src: 'Gas', image: require('../../../assets/trouble_gas.png')},
        {name: 'トイレ', src: 'Toilet', color: Colors.yellow, src: 'Toilet', image: require('../../../assets/trouble_toilet.png')},
        {name: 'テレビ', src: 'TV', color: Colors.secondary, src: 'TV', image: require('../../../assets/trouble_tv.png')},
        {name: 'エアコン', src: 'AirCondition', color: Colors.yellow, src: 'AirCondition', image: require('../../../assets/trouble_air.png')},
        {name: 'メールボックス', src: 'MailBox', color: Colors.secondary, src: 'MailBox', image: require('../../../assets/trouble_mailbox.png')},
        {name: 'その他の設備', src: 'OtherFacility', color: Colors.yellow, src: 'OtherFacility', image: require('../../../assets/trouble_other.png')},
        {name: '設備の使い方', src: 'FacilityGuide', color: Colors.secondary, src: 'FacilityGuide', image: require('../../../assets/trouble_guide.png')},
    ]
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{backgroundColor: Colors.white,paddingHorizontal: 20, paddingVertical: 20, flexGrow: 1}}>
                <View style={{backgroundColor: Colors.primary, borderRadius: 2}}>
                    <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', padding: 5, color: Colors.white}}>{"トラブル箇所カテゴリー"}</Text>
                </View>
                <Text style={{...GlobalStyles.fontNote, fontWeight: 'bold', marginTop: 20}}>{"お困りのトラブルについて以下より選択下さい。"}</Text>
                {/* category */}
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {categories.map(category => (
                        <TouchableOpacity key={category.name}
                            onPress={() => navigation.navigate(category.src)}
                            style={{width: window.width / 4,
                                height: window.width/4,
                                borderRadius: 360,
                                marginTop: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: category.color
                            }}>
                            <Image source={category.image} style={{width: 40, height: 40}} />
                            <Text style={{...GlobalStyles.fontNote, marginTop: 5, fontWeight: 'bold', color: Colors.primary}}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{...GlobalStyles.fontNote, marginTop: 20}}>
                    {"上記カテゴリーにない場合は、"}
                    <Text onPress={() => navigation.navigate('Contact')} style={{color: Colors.blue, fontWeight: 'bold', textDecorationLine: 'underline'}}>{"お問い合わせ"}</Text>
                    {"からご連絡ください。"}
                </Text>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    balloon: {
        
    }
})