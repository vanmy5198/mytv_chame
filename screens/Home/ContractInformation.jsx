import React, { useState, useEffect } from 'react'
import {
    Text, View, ScrollView, StyleSheet,
    StatusBar,
    Dimensions,
    Image,
    Alert,
} from 'react-native'
import Colors from "../../constants/Colors";
import { getRoom, USER_ID } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../../services/http-client";
import { formatNumber } from 'root/services/utils'
import GlobalStyles from '../../styles/index'
import { FontAwesome } from '@expo/vector-icons'

const { width, height } = Dimensions.get("window");
export default function ContractInformation() {
    const [contractData, setContract] = useState({ article_name: '', room_number: '', zip1: '', zip2: '', perfecture: '', city: '', address1: '', address2: '', contract_term_s: '', contract_term_e: '', resident: '', image: '', rent_price: '', common_price: '', deposit_money: '', key_money: '', receipt_type_rent: '', insurance_corp: '', corp_resident: '',contacts: [] })
    const [article, setArticle] = useState({ articleName: '' })

    useEffect(() => {
        getContract()
        getRoom()
            .then(room => setArticle(() => ({ articleName: room.article_name })))
    }, [])

    function getContract() {
        AsyncStorage.getItem(USER_ID).then(userID => {
            getRoom(userID).then(room => {
                httpClient.get(`get_contract?resident_id=${userID}&room_id=${room.id}`).then(({ data }) => {
                    const contract = data.data.contract
                    const contacts = []
                    if (contract['article']['mng_corp_name']) contacts.push({ name: contract['article']['mng_corp_name'], phone: contract['article']['mng_corp_tel'] })
                    if (contract['article']['mng_corp_name2']) contacts.push({ name: contract['article']['mng_corp_name2'], phone: contract['article']['mng_corp_tel2'] })
                    if (contract['article']['mng_corp_name3']) contacts.push({ name: contract['article']['mng_corp_name3'], phone: contract['article']['mng_corp_tel3'] })
                    if (contract['article']['mng_corp_name4']) contacts.push({ name: contract['article']['mng_corp_name4'], phone: contract['article']['mng_corp_tel4'] })
                    setContract(() => ({
                        article_name: contract['article']['name'],
                        room_number: contract['room']['room_number'],
                        zip1: contract['article']['zip1'],
                        zip2: contract['article']['zip2'],
                        perfecture: contract['article']['perfecture']['name'],
                        city: contract['article']['city'],
                        address1: contract['article']['address1'],
                        address2: contract['article']['address2'],
                        contract_term_s: contract['contract_term_s'],
                        contract_term_e: contract['contract_term_e'],
                        resident: contract['resident']['name'],
                        image: contract['resident']['owner_files']['link_resize_image'],
                        rent_price: contract['rent_price'],
                        common_price: contract['common_price'],
                        deposit_money: contract['deposit_money'],
                        key_money: contract['key_money'],
                        receipt_type_rent: contract['receipt_type_rent'],
                        insurance_corp: contract['article']['insurance_corp'],
                        corp_resident: contract['resident']['corp_resident'],
                        contacts
                    }))
                }).catch(() => console.log('er'))
            }).catch(({ data }) => {
                return false
                Alert.alert('エラー', data.error[0], [
                    { text: 'OK' }
                ])
            })
        })
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
                    契約情報のご確認
        </Text>
                <Text style={{ fontSize: 18, color: "#50BEFF", marginTop: 6, alignSelf: 'center' }}>
                    {article.articleName}
                </Text>
                <Text style={contractStyle.text_description_small}>
                    現在のご契約情報です。
        </Text>
                <View style={contractStyle.section}>
                    <Text style={contractStyle.text_setion_title}>専有部管理会社</Text>
                </View>

                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10, lineHeight: 25 }}>
                    株式会社レオン都市開発 管理部
        </Text>

                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>
                    06-6356-2512
        </Text>

                <View style={[contractStyle.row, { marginTop: 50 }]}>
                    <Text style={contractStyle.text_content}>物件名</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* レオン・コンフォート○○ */}
                        {contractData?.article_name}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>号室</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 0000 */}
                        {contractData?.room_number}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>所在地</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* {'〒000-0000\n大阪府大阪市○○町0丁目00番000'} */}
                        {'〒' + contractData?.zip1 + '-' + contractData?.zip2 + '\n'
                            + contractData?.perfecture + contractData?.city + contractData?.address1 + contractData?.address2
                        }
                    </Text>
                </View>

                <View style={[contractStyle.section, { marginTop: 50 }]}>
                    <Text style={contractStyle.text_setion_title}>共用部分管理会社</Text>
                </View>
                {contractData.contacts.map((contact, index) => (
                    <View key={index}>
                        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 10, lineHeight: 25 }}>
                            {`${contact.name}`}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <FontAwesome name="phone" size={16} color="black" />
                            <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{contact.phone}</Text>
                        </View>
                    </View>
                ))}

                <View style={[contractStyle.section, { marginTop: 50 }]}>
                    <Text style={contractStyle.text_setion_title}>契約者</Text>
                </View>
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>契約期間</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* ○○年契約　更新 */}
                        {contractData?.contract_term_s + '〜' + contractData?.contract_term_e}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>賃借人名</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 礼御 太郎 */}
                        {contractData?.resident}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>入居者</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 礼御 太郎 */}
                        {contractData?.corp_resident != '' ? contractData?.corp_resident : contractData?.resident}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', marginTop: 20 }}>
                    {!!contractData?.image && <Image style={{ width: width * 0.4, height: width * 0.6 }} source={{
                        // uri: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Roronoa_Zoro.jpg',
                        uri: `${contractData?.image}`
                    }}
                        resizeMode="contain" />}
                </View>
                <View style={[contractStyle.contract_divider, { marginTop: 20 }]} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>家賃</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 00,000円 */}
                        {formatNumber(contractData?.rent_price)}
                    </Text>

                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>共益費</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 0,000円 */}
                        {formatNumber(contractData?.common_price)}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                {/* haven't yet */}
                {/* <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>水道代</Text>
                    <Text style={contractStyle.text_content_data}>0,000円</Text>
                </View> 
                <View style={contractStyle.contract_divider} />*/}
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>敷金</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 000,000円 */}
                        {formatNumber(contractData?.deposit_money)}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} />
                <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>礼金</Text>
                    <Text style={contractStyle.text_content_data}>
                        {/* 000,000円 */}
                        {formatNumber(contractData?.key_money)}
                    </Text>
                </View>
                {/* <View style={contractStyle.contract_divider} /> 
                 <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>家賃支払方法</Text>
                    <Text style={contractStyle.text_content_data}>
                        {contractData?.receipt_type_rent}
                    </Text>
                </View>
                <View style={contractStyle.contract_divider} /> */}
                {/* haven't yet */}
                {/* <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>保証会社名</Text>
                    <Text style={contractStyle.text_content_data}>日本プレミアム保証株式会社</Text>
                </View> 
                <View style={contractStyle.contract_divider} />*/}
                {/* <View style={contractStyle.row}>
                    <Text style={contractStyle.text_content}>火災保険会社</Text>
                    <Text style={contractStyle.text_content_data}>
                        {contractData?.insurance_corp}
                    </Text> 
                </View> */}
                {/* <Text style={{ fontSize: 14, marginTop: 10 }}>※お客様が任意で加入されている保険に関しましては 表示されません。</Text> */}
                <View style={[contractStyle.contract_divider, { marginBottom: 100 }]} />

            </View>
        </ScrollView >

    )

}


const contractStyle = StyleSheet.create({
    section: {
        marginTop: 10, paddingHorizontal: 12, height: 30, backgroundColor: '#00AAB7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    text_description_small: {
        fontSize: 11,
        marginTop: 40,
        fontWeight: "bold",
    },
    text_setion_title: { fontSize: 15, color: 'white', fontWeight: 'bold' },
    row: {
        marginTop: 10, flexDirection: 'row', alignItems: 'center'
    },
    column: {
        marginTop: 10, flexDirection: 'column', alignItems: 'center'
    },
    text_content: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10,
        flexBasis: '20%'
    },
    text_content_data: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10,
        marginStart: 60,
        marginEnd: 60
    },
    contract_divider: {
        backgroundColor: "#AAAAAA",
        height: 1,
        marginTop: 10,
    },
});