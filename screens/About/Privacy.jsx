import React from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'
import { Button } from 'react-native-elements'

export default function Policy({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 20 }}>
                <StatusBar backgroundColor={Colors.primary} />
                <Text style={style.paragraph}>{"株式会社レオン都市開発（以下「弊社」といいます。）は、弊社が運営する「chameLEON」（以下「弊社サービス」といいます。）において、ユーザーに関する情報を以下のとおり取り扱います。\n"}</Text>
                <Text style={style.header}>{"第１条（総則）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１ 弊社は、ユーザーに関する情報の保護実現のため、個人情報保護法及びその他関連する法令等を遵守し、個人情報を含むユーザーに関する情報の適切な取扱い及び保護に努めます。\n\n" +
                    "２ 「chameLEON」プライバシーポリシー（以下「本ポリシー」といいます。）は、弊社サービスの利用に関し適用されます。また、弊社が、弊社の運営するウェブサイト上に掲載するプライバシーポリシーその他の個人情報保護方針又は弊社サービスに関する利用規約等においてユーザーに関する情報の取扱いについて規定する場合、当該規定も適用されるものとし、当該規定が本ポリシーと抵触する場合には、本ポリシーが優先されるものとします。\n\n" +
                    "３　弊社サービスと提携するサービス（以下「提携サービス」といいます。）を提供する事業者（以下「提携事業者」といいます。）により提供される提携サービスその他弊社以外の者が提供するサービス（以下「外部サービス」といいます。）については、本ポリシーの規定は適用されません。提携サービスにおけるユーザーに関する情報の取扱いについては、当該提携サービスを提供する事業者が別途定めるプライバシーポリシー等をご参照ください。\n"
                }</Text>
                <Text style={style.header}>{"第２条（弊社が取得する情報及びその取得方法）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１ 弊社は、弊社サービスにおいて、以下に定めるとおり、個人情報（個人情報保護法第２条第１項により定義された「個人情報」をいい、以下同様とします。）を含むユーザーの情報を取得します。\n\n" +
                    "(1)ユーザーにご提供いただく情報\n\n" +
                    "弊社は、ユーザーの氏名、ニックネーム、住所、国籍、性別、家族構成、ソーシャルアカウント\n\n" +
                    "(2)弊社サービスのご利用時に弊社が収集する情報\n\n" +
                    "ア 端末情報\n\n" +
                    "弊社は、ユーザーが端末又は携帯端末上で弊社サービスを利用する場合、弊社サービスの維持及び改善、又は不正行為防止のため、ユーザーが使用する端末情報（端末を識別可能なID情報等）を収集することがあります。\n\n" +
                    "イ ログ情報、行動履歴及びサービス利用状況に関する情報\n\n" +
                    "弊社は、弊社サービスの維持及び改善、又は不正行為防止のため、弊社サービスの利用時に自動で生成、保存されるIPアドレス、ユーザーからのリクエスト日時、弊社サービス内での操作履歴の情報や、ユーザーのサービス利用状況に関する情報を収集することがあります。\n\n" +
                    "ウ Cookie及び匿名ID\n\n" +
                    "弊社サービスにおいて、「Cookie（クッキー）」と呼ばれる技術及びこれに類する技術を使用する場合があります。Cookieとは、ウェブサーバがユーザーのコンピュータを識別する業界標準の技術です。Cookieは、ユーザーのコンピュータを識別することはできますが、ユーザー個人を識別することはできません。なお、電子端末上の設定の変更によりCookieの機能を無効にすることはできますが、弊社サービスの全部又は一部が利用できなくなる場合があります。\n\n" +
                    "２ 弊社は、ユーザー情報の取得にあたっては、偽りその他不正の手段によらず、適正に取得します。また、弊社は、ユーザーが弊社サービスを利用することによる取得以外の方法でユーザー情報を取得する場合には、事前にその利用目的を通知又は公表します。\n"
                }</Text>
                <Text style={style.header}>{"第３条（利用目的）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１ 弊社は、弊社サービスの利用を通じて取得したユーザー情報を下記の目的の範囲内で適正に取り扱います。ユーザーご本人の同意なく利用目的の範囲を超えて利用することはありません。\n\n" +
                    "＜利用目的＞\n" +
                    "・弊社サービスの提供・維持・改善\n" +
                    "・ユーザーへの通知・対応等\n" +
                    "・第三者提供\n"
                }</Text>
                <View>
                    <View style={style.row}>
                        <View style={{ justifyContent: 'center', width: '12%' }}><Text style={{ ...style.cellText, textAlign: 'center' }}>{"利用 目的"}</Text></View>
                        <View style={{ ...style.borderHorizontal, justifyContent: 'center' }}><Text style={{ ...style.cellText, textAlign: 'center' }}>{"利用目的詳細"}</Text></View>
                        <View style={{ width: '43%', justifyContent: 'center' }}><Text style={{ ...style.cellText, textAlign: 'center' }}>{"利用する情報"}</Text></View>
                    </View>
                    <View style={style.row}>
                        <View style={{ justifyContent: 'center', width: '12%' }}><Text style={[style.cellText, style.contentCell]}>{"弊社サービスの提供・維持・改善"}</Text></View>
                        <View style={{ ...style.borderHorizontal, justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"・弊社サービスにおけるご本人確認及び不正利用の防止のため\n・弊社サービスのユーザー登録のため \n\n・弊社サービスの円滑な提供、維持及び改善のため"}</Text></View>
                        <View style={{ width: '43%', justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"・ユーザー情報\n・端末情報\n\n・ログ情報、行動履歴及びサービス利用状況に関する情報\n\n・Cookie及び匿名ID"}</Text></View>
                    </View>
                    <View style={style.row}>
                        <View style={{ justifyContent: 'center', width: '12%' }}><Text style={[style.cellText, style.contentCell]}>{"ユーザーへの通知・対応等"}</Text></View>
                        <View style={{ ...style.borderHorizontal, justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"・弊社サービスに関するご案内、お問い合わせ等への対応のため\n・弊社サービスに関する利用規約、本ポリシーの変更、弊社サービスの停止・中止・契約解除その他弊社サービスに関する重要なお知らせ等の通知のため"}</Text></View>
                        <View style={{ width: '43%', justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"・氏名、ニックネーム、ソーシャルアカウント\nFacebook、Twitter、Yahoo!等）情報、パスワード、メールアドレス、電話番号"}</Text></View>
                    </View>
                    <View style={{ ...style.row, borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
                        <View style={{ justifyContent: 'center', width: '12%' }}><Text style={[style.cellText, style.contentCell]}>{"第三者提供"}</Text></View>
                        <View style={{ ...style.borderHorizontal, justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"弊社から右記載の情報の提供を受けた第三者は、当該情報を以下の目的のために利用します。\n\n・賃貸借契約締結仲介サービス提供のため\n\n・提携サービスの提供のため"}</Text></View>
                        <View style={{ width: '43%', justifyContent: 'center' }}><Text style={[style.cellText, style.contentCell]}>{"・ユーザー情報\n・端末情報\n\n・Cookie及び匿名ID\n\n・ログ情報、行動履歴及びサービス利用状況に関する情報"}</Text></View>
                    </View>
                </View>
                <Text style={style.paragraph}>{"\n２ 弊社は、前項の利用目的を、変更前の利用目的と関連性を有すると合理的に認められる範囲内において変更することがあり、変更した場合には、ユーザーに対し、通知又は弊社サービス上若しくは弊社の運営するウェブサイトでの掲示その他分かりやすい方法により公表します。\n"}</Text>
                <Text style={style.header}>{"第４条（第三者提供）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１　弊社は、原則として、ユーザー本人の同意を得ずに個人情報を第三者に提供しません。ただし、以下の場合は、関係法令に反しない範囲で、ユーザーの同意なく個人情報を提供することがあります。\n\n" +
                    "(1)法令に基づく場合\n\n" +
                    "(2)人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき\n\n" +
                    "(3)公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき\n\n" +
                    "(4)国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき\n\n" +
                    "(5)合併、会社分割、事業譲渡その他の事由によりユーザーの個人情報を含む事業の承継がなされる場合\n\n" +
                    "２　弊社は、ユーザーの同意に基づき個人データ（個人情報保護法第２条第６項により定義された「個人データ」をいい、以下同様とします。）を第三者に提供した場合、以下の事項に関する記録を作成し、保管します。\n\n" +
                    "(1)ユーザーから事前の同意を得ていること\n\n" +
                    "(2)当該第三者の氏名又は名称その他の当該第三者を特定するに足りる事項\n\n" +
                    "(3)当該個人データによって識別される者の氏名その他のその者を特定するに足りる情報\n\n" +
                    "(4)当該個人データの項目\n\n" +
                    "３　第１項の規定にかかわらず、弊社は、個人情報保護委員会に届け出た場合には、第三者に対し、第３条第１項表中の第三者提供にかかるユーザー情報の項目に含まれる個人データを、電子メールで送付する等の方法により、提供することができます。ただし、ユーザーが自身の個人データについて第三者に提供することを希望しないときは、第１０条に基づき弊社にお申し付けいただければ、第三者への提供を停止いたします。\n\n" +
                    "４　前項の規定に基づき、弊社が、個人データを第三者に提供した場合には、以下の事項に関する記録を作成し、保管します。\n\n" +
                    "(1)当該個人データを提供した年月日\n\n" +
                    "(2)当該第三者の氏名又は名称その他の当該第三者を特定するに足りる事項\n\n" +
                    "(3)当該個人データによって識別される者の氏名その他のその者を特定するに足りる情報\n\n" +
                    "(4)当該個人データの項目\n"
                }</Text>
                <Text style={style.header}>{"第５条（個人情報の取扱いの委託）\n"}</Text>
                <Text style={style.paragraph}>{"弊社は、利用目的の達成に必要な範囲内において、ユーザーから取得した個人情報の全部又は一部の取扱いを第三者に委託することがあります。この場合、弊社は、当該委託先との間で本ポリシーに準じる内容の秘密保持契約等をあらかじめ締結するとともに、当該委託先において情報の適切な安全管理が図られるよう、必要かつ適切な監督を行います。\n"}</Text>
                <Text style={style.header}>{"第６条（共同利用）\n"}</Text>
                <Text style={style.paragraph}>{
                    "弊社は、外部サービスの運営者その他の第三者との間で、外部サービスの提供に必要な範囲において、ユーザーの個人情報を共同利用することがあります。この場合、弊社は、予め当該第三者の名称、共同利用目的、共同利用する情報の種類を公表するものとします。\n"
                }</Text>
                <Text style={style.header}>{"第７条\n"}</Text>
                <Text style={style.paragraph}>{
                    "弊社サービスには、弊社サービスの利用状況及び弊社の提供するサービスに関する広告効果等の情報を解析するため、弊社が選定する以下の情報収集モジュールを組み込む場合があります。これに伴い、弊社は、以下の情報収集モジュールの提供者に対しユーザー情報の提供を行う場合があります。これらの情報収集モジュールは、個人を特定する情報を含むことなくユーザー情報を収集し、収集された情報は、各情報収集モジュール提供者の定めるプライバシーポリシその他の規定に基づき管理されます。\n\n" +
                    "１ 弊社は、弊社又は広告配信事業者等の第三者によるターゲティング広告（ユーザーのニーズないし興味、関心に合わせて広告を配信する広告手法をいいます。）の実施のため、弊社サービス又は提携サービスの提供に際し、前条に定める情報収集モジュールを利用して、以下の情報を収集し、これを蓄積又は利用することがあります。\n\n" +
                    "(1) 行動履歴及びサービス利用状況に関する情報（弊社サービスの利用履歴等、それを蓄積することによりユーザーのニーズや興味、関心の分析に供することができる情報で、特定の個人を識別するに至らないものをいいます。）\n\n" +
                    "(2) 端末情報\n\n" +
                    "２ 弊社は、前項に基づき収集した情報を、ユーザーのニーズないし興味、関心に合わせてカスタマイズした最適な広告を配信することにより、ユーザーに有益な情報を届けることを目的として、行動ターゲティング広告を配信する事業者（以下「広告配信事業者」といいます。）に提供します。\n\n" +
                    "３ 広告配信事業者による各情報の取扱いについては、広告配信事業者の定めるプライバシーポリシーその他の条件に従うものとします。\n"
                }</Text>
                <Text style={style.header}>{"第８条 （安全管理体制）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１ 弊社は、ユーザー情報の漏洩、滅失又は毀損の防止その他のユーザー情報の保護のため、個人情報ファイルへのアクセス制限の実施、アクセス権限保有者の必要最小限度の限定、また外部からの不正アクセス防止のためのセキュリティソフトの導入等、ユーザー情報の安全管理のために必要かつ適切な措置を講じています。\n\n" +
                    "２ 弊社は、代表取締役をユーザー情報管理責任者とし、ユーザー情報の適正な管理及び継続的な改善を実施します。\n"
                }</Text>
                <Text style={style.header}>{"第９条 （個人情報に関するユーザーの開示・訂正等の権利）\n"}</Text>
                <Text style={style.paragraph}>{
                    "弊社サービス上における個人情報の開示・訂正・削除又は利用停止（以下「開示等」といいます。）等の措置については、「個人情報に関する開示等申請についてのご案内」（をご参照ください。ただし、個人情報保護法その他の法令により弊社がこれらの義務を負わない場合、正当な理由なく同内容の請求が何度も繰り返される場合、又は過度な技術的作業を要する場合は、これらの手続を行うことができない場合があります。\n"
                }</Text>
                <Text style={style.header}>{"第１０条 （本ポリシーの変更）\n"}</Text>
                <Text style={style.paragraph}>{
                    "１ 弊社は、ユーザー情報の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、随時本ポリシーを変更することがあります。\n\n" +
                    "２ 変更後の本ポリシーについては、弊社サービス上又は弊社の運営するウェブサイトでの掲示その他分かりやすい方法により告知します。ただし、法令上ユーザーの同意が必要となるような内容の変更を行うときは、別途弊社が定める方法により、ユーザーの同意を取得します。\n"
                }</Text>
                <Text style={style.header}>{"第１１条 （お問い合わせ）\n"}</Text>
                <Text style={style.paragraph}>{
                    "弊社のユーザー情報の取扱いに関するご意見、ご質問、苦情のお申出その他ユーザー情報の取扱いに関するお問い合わせは、下記お問い合わせフォームからご連絡ください。"
                }</Text>
                <Button
                    buttonStyle={{ marginLeft: 'auto', backgroundColor: 'transparent' }}
                    title="問い合わせフォーム→"
                    titleStyle={{ ...style.paragraph, color: Colors.blue }}
                    onPress={() => navigation.navigate('Contact')}
                />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    header: {
        ...GlobalStyles.fontNormal,
        lineHeight: 20,
        fontWeight: 'bold'
    },
    paragraph: {
        ...GlobalStyles.fontNormal,
        lineHeight: 24
    },
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopColor: Colors.grayLight,
        borderLeftColor: Colors.grayLight,
        borderRightColor: Colors.grayLight
    },
    cellText: {
        ...GlobalStyles.fontNormal
    },
    contentCell: {
        paddingVertical: 10,
        paddingHorizontal: 3
    },
    borderHorizontal: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: Colors.grayLight,
        borderRightColor: Colors.grayLight,
        width: '45%'
    }
})