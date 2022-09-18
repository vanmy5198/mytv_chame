import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'

const { width } = Dimensions.get("window");

export default function QAAccordionContent(item, navigation) {
    const formatLabel = (label, value, color) => {
        if (!value) {
            return label;
        }
        return (
            <Text>
                {label.split(value).reduce((prev, current, i) => {
                    if (!i) {
                        return [current];
                    }
                    return prev.concat(
                        <Text style={{ color: color, fontWeight: 'bold' }} key={value + current}>
                            {value}
                        </Text>,
                        current
                    );
                }, [])}
            </Text>
        );
    };

    return (
        <View>
            {item.type === 1 &&
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 28, height: 26, marginEnd: 12 }} source={require('../assets/a_icon.png')} />
                        <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{formatLabel(item.text, item.textSpan, item.color)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(item.navigate)
                        // console.log('click: ', item.navigate) 
                    }}>
                        <Text style={{ color: Colors.blue, textDecorationLine: 'underline', fontWeight: 'bold', marginTop: 10, alignSelf: 'flex-end' }}>
                            {item.link}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {item.type === 2 &&
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 28, height: 26, marginEnd: 12 }} source={require('../assets/a_icon.png')} />
                        <View>
                            <Text style={QAStyle.section}> 契約について</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, color: Colors.blue, width: width - 30 - 32 - 12 - 20, marginTop: 12, lineHeight: 20 }}>※解約を希望される場合、賃貸借契約の内容によって解約予告期間が異なりますので、まずは事前にご契約内容をご確認の上お早目のお手続きをお勧めいたします。 </Text>
                            <Text style={QAStyle.NoteBold}>〈解約予告期間とは〉</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'賃借人が賃貸人に対し、入居物件の退去日から起算して解約することを通知しなければならない期間。\n解約予告期間は賃貸借契約書の条文ならびに特約条項にてご確認いただけます。\n解約予告期間がご不明な際はお電話かお問い合わせフォームにてお問い合わせ下さいませ。'}</Text>
                            <Text style={QAStyle.iconTile}>■
                                <Text style={QAStyle.titleWithIcon}>個人のお客様（賃貸借契約の賃借人が個人）</Text>
                            </Text>
                            <Text style={QAStyle.subTitle}>【アプリから解約申請をする】</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}><Text onPress={() => navigation.navigate('CancelContract')} style={{ ...GlobalStyles.fontSmall, color: Colors.blue }}>{`コチラのページ`}</Text>{'から解約申請を行う事ができます。申請内容に不備が無ければ即時、解約申請が可能です。\n※注　賃貸借契約の賃借人が法人の場合、アプリでの解約申請は無効となりますのでご注意ください。'}</Text>
                            <Text style={QAStyle.subTitle}>【書面で解約申請をする】</Text>
                            <Text style={QAStyle.subTitle}> ①弊社書式の解約通知書がお手元にある場合</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'ご記入・ご捺印の上下記住所へお送り下さいませ。'} <Text style={{ ...GlobalStyles.fontNormal, lineHeight: 20 }}>{'\n送付先住所：\n〒530-0042 大阪市北区天満橋1-6-18 LEONBLDG 4F 株式会社レオン都市開発 管理部 賃貸課 解約担当 宛\n'}</Text></Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    必ず賃借人ご本人様のご記入・ご捺印が必要です。
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    解約通知書を送る際は必ず、簡易書留・宅配便等の発送・受理を証明できる方法でお送りくださいませ。
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    簡易書留の場合は消印日、宅配便の場合は発送受付日が解約申請受付日になります。
                                </Text>
                            </Text>
                            <Text style={[QAStyle.subTitle, { marginTop: 20 }]}> ②弊社書式の解約通知書がお手元に無い場合</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'お住まいのマンションへ解約通知書をお送りいたしますので、お電話（06-6356-2512）かお問い合わせフォームにてご連絡下さい。'}</Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    お電話口での解約申請はできません。
                                </Text>
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                                <Text style={{ color: Colors.blue, textDecorationLine: 'underline', fontWeight: 'bold', marginTop: 10, alignSelf: 'flex-end', paddingEnd: 22 }}>
                                    お問い合わせはこちら→
                            </Text>
                            </TouchableOpacity>
                            <Text style={[QAStyle.iconTile, { marginTop: 35 }]}>■
                                <Text style={QAStyle.titleWithIcon}>法人のお客様（賃貸借契約の賃借人が法人）</Text>
                            </Text>
                            <Text style={QAStyle.subTitle}>【書面で解約申請をする】</Text>
                            <Text style={QAStyle.subTitle}> ①借主法人指定の解約通知書または、弊社書式の解約通知書がある場合</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'ご記入・ご捺印の上下記住所へお送り下さいませ。'} <Text style={{ ...GlobalStyles.fontNormal, lineHeight: 20 }}>{'\n送付先住所：\n〒530-0042 大阪市北区天満橋1-6-18 LEONBLDG 4F 株式会社レオン都市開発 管理部 賃貸課 解約担当 宛\n'}</Text></Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    入居者様の記入・捺印では受付できません。必ず法人印が必要です。
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    解約通知書を送る際は必ず、簡易書留・宅配便等の発送・受理を証明できる方法でお送りくださいませ。
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    簡易書留の場合は消印日、宅配便の場合は発送受付日が解約申請受付日になります。
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    {'解約通知書をFAXにてお送りいただく場合、下記FAX番号へお願いします。\nFAX：06-6356-2522　FAX送信後、必ず到着確認のご連絡をお願いいたします。\nTEL：06-6356-2512　営業時間：10時～19時（弊社休業期間中を除く）'}
                                </Text>
                            </Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    {'解約通知書をFAXにてお送りいただいた場合も原則、原本の提出は必要です。'}
                                </Text>
                            </Text>
                            <Text style={[QAStyle.subTitle, { marginTop: 20 }]}>②解約通知書がお手元に無い場合</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'ご契約中のマンションまたはご契約法人様のご住所へ解約通知書をお送りいたしますので、お電話（06-6356-2512）かお問い合わせフォームにてご連絡下さい。'}</Text>
                            <Text style={QAStyle.warning}>{'※注    '}
                                <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20 }}>
                                    {'お電話口での解約申請はできません。'}
                                </Text>
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                                <Text style={{ color: Colors.blue, textDecorationLine: 'underline', fontWeight: 'bold', marginTop: 10, alignSelf: 'flex-end', paddingEnd: 22 }}>
                                    お問い合わせはこちら→
                            </Text>
                            </TouchableOpacity>
                            {/* Section 2 */}
                            <Text style={[QAStyle.section, { marginTop: 40 }]}>解約申請後、退去立会日までにすること</Text>
                            <Text style={QAStyle.iconTile}>■
                                <Text style={QAStyle.titleWithIcon}>ライフライン・インターネットの解約手続き</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'電気・ガス・水道・インターネット契約の解約手続きを実施してください。\n※ガスの解約はガス会社によるガス閉栓立会が必要です。余裕をもって事前に手続きを行ってください。\n　退去立会時にガス閉栓立会が出来ていない場合、ガス閉栓の代行立会料5,000円（別途税）が発生いたします。\n'}<Text style={[QAStyle.subTitle, { lineHeight: 20 }]}>{'\n【以下の場合は解約手続き不要です】'}</Text></Text>
                            <Text style={{ ...GlobalStyles.fontSmall, color: Colors.blue }}>・水道の解約に関して</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{`毎月の水道代が定額の場合（管理会社にて水道代を徴収している場合。）`}</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, color: Colors.blue }}>・インターネットの契約に関して</Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{`無料のインターネットを利用している場合`}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20 }]}>■
                                <Text style={QAStyle.titleWithIcon}>郵便局への転居届</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'ご退去後の誤配送によるトラブルが多発しております。必ず事前に郵便局へ転居届を出してください。\n郵便局へ転居届を出した場合でも、郵便物以外（宅配等）は転送されませんのでご注意ください。'}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20 }]}>■
                                <Text style={QAStyle.titleWithIcon}>粗大ごみの回収手配</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'粗大ゴミの処分は、自治体によって方法が異なります。粗大ごみの処分はご自身で手配をお願いいたします。\n粗大ゴミの回収は、申込から回収までに数日かかります。余裕をもって荷物の整理をするよう心がけてください。'}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20, color: 'black' }]}>○
                                <Text style={QAStyle.titleWithIcon}>大阪市　粗大ごみ収集受付センター</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'固定電話から（通話料無料） 0120-79-0053\n携帯電話から（通話料有料） 0570-07-0053 '}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20, color: 'black' }]}>○
                                <Text style={QAStyle.titleWithIcon}>神戸市　大型ごみ受付センター　078-392-7953</Text>
                            </Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20, color: 'black' }]}>○
                                <Text style={QAStyle.titleWithIcon}>京都市　大型ごみ受付センター </Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'固定電話から（通話料無料）\n0120-100-530\n携帯電話から（通話料無料）\n075-330-6100\n上記不通の場合（通話料有料）\n0570-000-247'}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20, color: 'black' }]}>○
                                <Text style={QAStyle.titleWithIcon}>関東圏のマンションにお住まいの方</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'お住いの地区の役所にお問い合わせください。'}</Text>
                            <Text style={[QAStyle.iconTile, { marginTop: 20 }]}>■
                                <Text style={QAStyle.titleWithIcon}>お部屋の備品の確認</Text>
                            </Text>
                            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, width: width - 30 - 32 - 12 - 20 }}>{'下記はお部屋の備品になりますので、退去立会の際にご返却下さい。\n・お部屋の設備に関する取扱説明書\n・エアコンリモコン\n・洗濯パンエルボ（洗濯機の排水ホースと排水口の間についているＬ字のパイプ\n ※備品紛失やお引っ越し時に新居へ持って行ってしまう事が多発しております。事前に確認しておきましょう。（紛失・未返却の場合、別途費用がかかります）'}</Text>
                            <View style={{ flexDirection: "row", marginTop: 12, width: width - 30 - 32 - 12 - 20, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 170, height: 130 }} source={{ uri: 'https://housejoho.com/wp-content/uploads/2016/07/elbow-pan-600x398.jpg' }} resizeMode="contain" />
                                    <Text>洗濯パンエルボ</Text>
                                </View>
                                <Image style={{ width: 100, height: 110 }} source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/61iC7NzkVrL._AC_SX522_.jpg' }} resizeMode="contain" />
                            </View>

                        </View>
                    </View>

                </View>
            }
        </View>



    )
}

const QAStyle = StyleSheet.create({
    section: {
        ...GlobalStyles.fontNormal, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.blue, color: Colors.white, width: width - 30 - 32 - 12 - 20
    },
    NoteBold: {
        ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 20, lineHeight: 20
    },
    iconTile: {
        ...GlobalStyles.fontNormal, color: Colors.blue, marginTop: 12, lineHeight: 20, width: width - 30 - 32 - 12 - 20
    },
    titleWithIcon: {
        ...GlobalStyles.fontNormal, fontWeight: 'bold'
    },
    subTitle: {
        ...GlobalStyles.fontNormal, color: Colors.blue, fontWeight: 'bold', lineHeight: 20, width: width - 30 - 32 - 12 - 20
    },
    warning: {
        ...GlobalStyles.fontNormal, color: '#FF0014', lineHeight: 20, width: width - 30 - 32 - 12 - 20
    }
})