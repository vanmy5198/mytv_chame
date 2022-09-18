import React from "react";
import {
    Text,
    View,
    ScrollView
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { Button } from 'react-native-elements'
import { window } from "../../constants/Layouts";

export default function CancenContractPrecautions({ navigation }) {
    return (
        <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
            <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center' }}>{"注意事項の確認"}</Text>
            <View style={{ height: window.height * 0.6, marginTop: 40, borderColor: Colors.grayLight, borderWidth: 0.5, borderRadius: 5, padding: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text style={{ color: Colors.blueDark }}>{
                        "・解約申請フォーム送信後の解約キャンセル及び 解約日の変更等は一切受付できません。\n\n" +
                        "・貸出中の鍵・宅配ボックスカードおよび住居内設備に付随する備品（リモコン・洗濯パンエルボ・歯ブラシスタンド等）やその他（取扱説明書等）は全て退去立会時に返却が必要です。退去立会時に返却できない場合は別途違約金・再発行費用が発生いたします。\n\n" +
                        "・退去立会までに電気・ガス・水道およびインターネット契約の解約手続きを実施してください。\n" +
                        "※以下の場合は解約手続き不要です。\n" +
                        "水道代・・・毎月の水道代が定額の場合\n" +
                        "インターネット・・・無料のインターネットを利用している場合\n\n" +
                        "・ガスの解約はガス会社のガス閉栓立会が必要です。退去立会時にガス閉栓立会が出来ていない場合、ガス閉栓の代行立会料5,000円（別途税）が発生いたします。\n\n" +
                        "・退去立会までに郵便局へ転居届手続きをお願いいたします。\n\n" +
                        "・退去後の郵送物・宅配物について当社での預りや転居先への転送はできません。\n\n" +
                        "・粗大ゴミの処分は、自治体によって方法が異なります。粗大ごみの処分はご自身で手配をお願いいたします。\n"
                    }</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"大阪市　粗大ごみ収集受付センター"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal }}>{"固定電話から（通話料無料）0120-79-0053\n携帯電話から（通話料無料）0570-07-0053\n"}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"神戸市　大型ごみ受付センター"}</Text>
                        <Text style={{ ...GlobalStyles.fontNormal }}>{"078-392-7953\n"}</Text>
                    </View>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"京都市　大型ごみ受付センター"}</Text>
                    <Text style={GlobalStyles.fontNormal}>{"固定電話から（通話料無料）\n0120-100-530\n携帯電話から（通話料無料）\n075-330-6100\n上記不通の場合（通話料無料）\n0570-000-247\n"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"関東圏の物件にお住まいの方"}</Text>
                    <Text style={GlobalStyles.fontNormal}>{"お手数ですがお住まいの市区町村にご確認下さい。"}</Text>
                    <Text style={{ ...GlobalStyles.fontNormal, color: Colors.blueDark }}>{
                        "・居室内およびマンション敷地内に残置物・放置物等がある場合、処分に係る一切の費用をご請求させていただきます。\n\n" +
                        "・火災保険の解約は別途手続きが必要です。ご加入中の火災保険会社へ直接ご連絡いただき解約手続きをお願いいたします。\n\n" +
                        "・解約申請受付後、弊社からのご連絡に応答頂けない場合や、退去立会予定日時にお越し頂けない事が原因で、当社並びに関係者への損害が生じた場合は、損害賠償請求が発生する場合がございます。"
                    }</Text>
                </ScrollView>
            </View>
            <Button title="解約申請内容の確認に戻る"
                onPress={() => navigation.goBack()}
                titleStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}
                buttonStyle={{ marginTop: 20, borderRadius: 10, paddingVertical: 15, backgroundColor: Colors.white, borderWidth: 0.5, borderColor: Colors.grayLight }}
            />
        </View>
    )
}