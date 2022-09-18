import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import Footer2 from '../../../components/Footer2'

export default function TV({navigation}) {
    const t1 = '配線・設定・電源などの基本的なことを確認してください。電源の接続や周辺機器を確認し、一度テレビのコンセントを抜き、5秒以上たってから差して電源を点けて確かめて下さい。\nテレビは映らないけど番組表は映る、映る場合はチャンネルが未設定のおそれがありますので、チャンネル取得をすることで改善される場合がございます。その他、引越しや意図せぬ行為によって配線ミスが起きてしまい、テレビが映らなくなることもございます。\nまた、以下の部分に問題が起きてないかをご確認ください。配線は「アンテナ」から「壁の端子」へ、壁の端子から「室内の配線」へという流れがあります。アンテナケーブルはこの流れの中の「壁の端子から室内の配線」を担当しており、ケーブルの先端の金属部分が針のようになっているタイプ（中軸があるタイプ）が一般的です。このアンテナケーブルや電源コードが抜けていないか、あるいは断線していないかをご確認ください。アンテナケーブルの中軸が曲がってしまっていることもあるので、一度抜いてみて曲がってないかもお確かめください。\nまた、テレビとレコーダーの両方を使用している場合は、アンテナケーブルがレコーダーを一度経由しているパターンがほとんどです。そのため、レコーダー側についても同じように配線もご確認ください。\nテレビは映らないけどBS／CSの無料チャンネルは映る、映る場合はテレビ側の接続する端子が間違っている恐れがあります。通常、地上デジタルとBS／CSは混合されて伝送されています。テレビ側に地上デジタル・BS／CSそれぞれの受信端子がある場合、ケーブルでつないでいる方しか閲覧できません。都度差し替えて閲覧するか、家電量販店などで分波器を購入しそれぞれの端子に接続することで両方を閲覧することができます。\n'
    const t2 = 'B-CASカード（必要な場合）'
    const t3 = 'B-CASカードというICカードをテレビの背面に挿入しなければ、基本的にテレビを見ることはできません。カードが抜けている場合だけでなく、まれに水や汚れによって接続が悪くなることがあります。\nB-CASカードをさし直しても改善されない場合は、再発行の必要があるかもしれません。公式HPの「B-CAS（ビーキャス）」にて再発行することができます。\n電源は入るが画面が映らないという場合があります。その際には、「エラーコード」が画面に表示されていないかを見てください。テレビモニターにエラーコードが表示される場合は、その数字が示している原因を確認することでテレビが映ることが多いです。エラーコードの中でも、E202・E203が表示されている場合はアンテナが原因となっているおそれがあります。配線・設定・電源に問題が無い場合は建物やアンテナに不具合が起きている可能性がありますので共用部管理会社へご連絡いただくか弊社までご連絡下さい。また個別にケーブルテレビをご契約されている場合は、ご契約されているケーブルテレビ会社へご連絡して下さい。'
    //    
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"テレビのトラブル"}</Text>
                </View>
                <View style={{ borderBottomColor: Colors.grayBorder, borderBottomWidth: 1, marginTop: 2, borderRadius: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                    <View style={{ backgroundColor: Colors.primary, width: 22, height: 22, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 22, height: 22 }} source={require('../../../assets/icon_i.png')} />
                    </View>
                    <Text style={{ ...GlobalStyles.fontNormal, flexBasis: '90%', fontWeight: 'bold', marginLeft: 5 }}>{"テレビが映らない"}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={style.text}>{t1}</Text>
                    <Text style={{ ...style.text, color: Colors.primary, fontWeight: 'bold' }}>{t2}</Text>
                    <Text style={style.text}>{t3}</Text>
                </View>
                <Footer2 localStyle={{ marginTop: 20 }} />
                <Text style={{ ...GlobalStyles.fontNormal, marginTop: 40 }}>
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

const style = StyleSheet.create({
    text: {
        ...GlobalStyles.fontSmall, lineHeight: 20
    }
})
