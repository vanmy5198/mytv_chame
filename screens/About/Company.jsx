import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Button } from 'react-native-elements'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'

export default function Company({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexGrow: 1 }}>
                <StatusBar backgroundColor={Colors.primary} />
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold' }]}>{"会社名"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"株式会社レオン都市開発"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"所在地"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"・大阪本社\n〒530-0042\n大阪府大阪市北区天満橋1丁目6番18号\nLEON BLDG7F\n\n・東京支社\n〒100-0006\n東京都千代田区有楽町2-7-1\n有楽町イトシアオフィスタワー14階"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"代表取締役"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"北尾　龍典"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"設立"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"平成16年2月25日"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"資本金"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"100,000,000円"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"宅地建物取引業免許"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"国土交通大臣（3）第7609号"}</Text>
                </View>
                <View>
                    <Text style={[GlobalStyles.fontNomal, { fontWeight: 'bold', marginTop: 10 }]}>{"事業内容"}</Text>
                    <Text style={[GlobalStyles.fontNomal, styles.content]}>{"マンションの分譲販売事業\n不動産の売買\n不動産の仲介\n不動産コンサルティング\n不動産の販売代理事業\n不動産賃貸・管理\nリフォーム事業"}</Text>
                </View>
                <Button
                    titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                    buttonStyle={{ backgroundColor: Colors.primary, borderRadius: 8, marginTop: 15, height: 50 }}
                    title="株式会社レオン都市開発のHPを見る"
                    onPress={() => navigation.navigate('WebView', { url: 'https://www.leon-urban.com/', name: 'leon-urban.com' })}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 5,
        marginLeft: 10,
        lineHeight: 16
    }
})