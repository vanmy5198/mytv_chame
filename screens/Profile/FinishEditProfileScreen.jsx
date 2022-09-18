import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  Switch,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import httpClient from "../../services/http-client";
import { CONTRACT_STATUS } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function FinishEditProfileScreen({ route, navigation }) {
  const {
    userName,
    nameKana,
    user_contract_type,
    user_article,
    user_roomNumber,
    user_phone,
    corpResident,
    corpResidentKana,
    corpAddress,
    user_fax,
    user_mail,
    user_gender,
    user_year,
    user_month,
    user_day,
  } = route.params;

  const [contract_status, setContractStatus] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
  }, []);


  const submit = () => {
    Alert.alert(
      "",
      "この内容で送信しますか？ 送信した後は取り消しができません。",
      [
        {
          text: "キャンセル", onPress: () =>
            console.log("Cancel")
        },
        {
          text: "OK",
          onPress: (() => {
            const formData = new FormData()
            formData.append('name', userName)
            formData.append('kana', nameKana)
            if (user_contract_type === '個人') {
              formData.append('category', 0)
            }
            else if (user_contract_type === '法人') {
              formData.append('category', 1)
            }
            formData.append('article', user_article)
            formData.append('room_number', user_roomNumber)
            formData.append('phone', user_phone)
            formData.append('corp_resident', corpResident)
            formData.append('corp_resident_kana', corpResidentKana)
            formData.append('corp_address', corpAddress)
            formData.append('mail', user_mail)
            formData.append('fax', user_fax)
            if (user_gender === '男性') { formData.append('sex', 0) }
            else if (user_gender === '女性') {
              formData.append('sex', 1)
            }
            formData.append('year', user_year)
            formData.append('month', user_month)
            formData.append('day', user_day)

            httpClient.post('send_edit_resident', formData).then(({ data }) => {
              // console.log('Result: ', data)
              editSuccess();
            }).catch(({ data }) => {
              Alert.alert('エラー', data.error[0], [
                { text: 'OK' }
              ])
            })
          }),
        },
      ]
    );
  };

  const editSuccess = () => {
    Alert.alert("", "内容の送信が完了しました。", [
      { text: "OK", onPress: () => navigation.navigate("Main") },
    ]);
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
    >
      <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
          マイページ
        </Text>
        <Text style={profileStyle.text_section_title}>
          契約者情報
        </Text>
        <View style={profileStyle.profile_divider} />
        {contract_status === "1" && (
        <View> 
          <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>
          名前
        </Text>
        <Text style={profileStyle.text_content}>{userName}</Text>
        <Text style={profileStyle.text_title}>名前（カナ）</Text>
        <Text style={profileStyle.text_content}>{nameKana}</Text>
        <Text style={profileStyle.text_title}>契約分類</Text>
        <Text style={profileStyle.text_content}>{user_contract_type}</Text>
        <Text style={profileStyle.text_title}>お住まいの物件名</Text>
        <Text style={profileStyle.text_content}>{user_article}</Text>
        <Text style={profileStyle.text_title}>号室</Text>
        <Text style={profileStyle.text_content}>{user_roomNumber}</Text>
        <Text style={profileStyle.text_title}>電話番号（携帯電話番号）</Text>
        <Text style={profileStyle.text_content}>{user_phone}</Text>
        {user_contract_type === '法人' && (
          <View>
            <Text style={profileStyle.text_section_title}>
              居住者情報
            </Text>
            <View style={profileStyle.profile_divider} />
            <Text style={profileStyle.text_title}>居住者名前</Text>
            <Text style={profileStyle.text_content}>{corpResident}</Text>
            <Text style={profileStyle.text_title}>居住者名前（カナ）</Text>
            <Text style={profileStyle.text_content}>{corpResidentKana}</Text>
            <Text style={profileStyle.text_title}>居住者連絡先</Text>
            <Text style={profileStyle.text_content}>{corpAddress}</Text>
          </View>
        )}
        <Text style={profileStyle.text_title}>FAX</Text>
        <Text style={profileStyle.text_content}>{user_fax}</Text>
        <Text style={profileStyle.text_title}>Eメールアドレス</Text>
        <Text style={profileStyle.text_content}>{user_mail}</Text>
        <Text style={profileStyle.text_title}>性別</Text>
        <Text style={profileStyle.text_content}>{user_gender}</Text>
        <Text style={profileStyle.text_title}>生年月日</Text>
        <Text style={profileStyle.text_content}>
          {user_year + "/" + user_month + "/" + user_day}
        </Text>
        </View>)}
        {contract_status === "0" && (
        <View> 
          <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>
          名前
        </Text>
        <Text style={profileStyle.text_content}>{userName}</Text>
        <Text style={profileStyle.text_title}>名前（カナ）</Text>
        <Text style={profileStyle.text_content}>{nameKana}</Text>
        <Text style={profileStyle.text_title}>電話番号（携帯電話番号）</Text>
        <Text style={profileStyle.text_content}>{user_phone}</Text>
        <Text style={profileStyle.text_title}>Eメールアドレス</Text>
        <Text style={profileStyle.text_content}>{user_mail}</Text>
        </View>
        )}
       
        <Button
          titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: Colors.primary,
            borderRadius: 8,
            marginTop: 40,
            marginBottom: 20,
            height: 50,
          }}
          title="内容を送信する"
          onPress={submit}
        />
      </View>
    </ScrollView>
  );
}

const profileStyle = StyleSheet.create({
  text_section_title: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: "bold",
  },
  text_title: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 18,
  },
  text_content: {
    fontSize: 13,
    marginTop: 14,
    marginStart: 12,
  },
  profile_divider: {
    backgroundColor: "#AAAAAA",
    height: 1,
    marginTop: 4,
  },
});
