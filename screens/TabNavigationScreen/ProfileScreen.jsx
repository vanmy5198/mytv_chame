import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import { USER_ID, CONTRACT_STATUS } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../../services/http-client";
import ProfileContext from "../Context/ProfileContext";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const submit = () => {
    return navigation.navigate("EditProfileScreen");
  };
  const isFocused = useIsFocused();

  const [profile, setProfile] = useState({
    name: '', kana: '', category: '', zip1: '', zip2: '', prefecture_name: '', city: '', corp_address: '', corp_resident: '', address1: '', address2: '', tel1: '', tel2: '', fax: '', mail: '', sex: '', birthday: '',
    office_name: '', office_kana: '', office_zip1: '', office_zip2: '', office_prefecture_name: '', office_city: '', office_address1: '', office_address2: '', office_tel1: '', office_tel2: '', office_fax: '', industry: '', office_post: '', enter_company: ''
  })

  const [_, setTypeContract] = useContext(ProfileContext);
  useEffect(() => {
    getProfile()
  }, [isFocused])

  function getProfile() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_resident?resident_id=${userID}`).then(({ data }) => {
        const profileData = data.data.resident
        setProfile(() => ({
          name: profileData['name'],
          kana: profileData['kana'],
          // category: '法人',
          category: profileData['category'],
          zip1: profileData['zip1'],
          zip2: profileData['zip2'],
          prefecture_name: profileData['prefecture_name'],
          city: profileData['city'],
          corp_address: profileData['corp_address'],
          corp_resident: profileData['corp_resident'],
          address1: profileData['address1'],
          address2: profileData['address2'],
          tel1: profileData['tel1'],
          tel2: profileData['tel2'],
          fax: profileData['fax'],
          mail: profileData['mail'],
          sex: profileData['sex'],
          birthday: profileData['birthday'],

          office_name: profileData['office_name'],
          office_kana: profileData['office_kana'],
          office_zip1: profileData['office_zip1'],
          office_zip2: profileData['office_zip2'],
          office_prefecture_name: profileData['office_prefecture_name'],
          office_city: profileData['office_city'],
          office_address1: profileData['office_address1'],
          office_address2: profileData['office_address2'],
          office_tel1: profileData['office_tel1'],
          office_tel2: profileData['office_tel2'],
          office_fax: profileData['office_fax'],
          industry: profileData['industry'],
          office_post: profileData['office_post'],
          enter_company: profileData['enter_company']
        }))
        // console.log(data.data.resident)
        setTypeContract(profileData.category);
      }).catch(({ data }) => {
        return false
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
    })
  }

  const [contract_status, setContractStatus] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      {/* {profile.category === '個人' && ( */}
      <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
          マイページ
    </Text>
        <Text style={profileStyle.text_section_title}>
          契約者情報
    </Text>
        <View style={profileStyle.profile_divider} />
        <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>
          名前
    </Text>
        <Text style={profileStyle.text_content}>{profile?.name}</Text>
        <Text style={profileStyle.text_title}>名前（カナ）</Text>
        <Text style={profileStyle.text_content}>{profile?.kana}</Text>

        {contract_status === "1" && (
          <View>
            <Text style={profileStyle.text_title}>契約分類</Text>
            <Text style={profileStyle.text_content}>{profile?.category}</Text>
          </View>
        )}


        <Text style={profileStyle.text_title}>電話番号（携帯電話番号）</Text>
        <Text style={profileStyle.text_content}>{profile?.tel1}</Text>
        {profile?.tel2 != "" && <Text style={profileStyle.text_content}>{profile?.tel2}</Text>}

        <Button
          titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: Colors.primary,
            borderRadius: 8,
            marginTop: 40,
            marginBottom: 20,
            height: 50,
          }}
          title="内容を変更する"
          onPress={submit}
        />
      </View>
      {/* )} */}
      {/* {profile.category === '法人' && (
      <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
        マイページ
    </Text>
      <Text style={profileStyle.text_section_title}>
        契約者情報
    </Text>
      <View style={profileStyle.profile_divider} />
      <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>
        名前
    </Text>
      <Text style={profileStyle.text_content}>{profile?.name}</Text>
      <Text style={profileStyle.text_title}>名前（カナ）</Text>
      <Text style={profileStyle.text_content}>{profile?.kana}</Text>
      
      <Text style={profileStyle.text_title}>電話番号</Text>
      <Text style={profileStyle.text_content}>{profile?.tel1}</Text>
      {profile?.tel2 != "" && <Text style={profileStyle.text_content}>{profile?.tel2}</Text>}

      <Text style={profileStyle.text_title}>居住者</Text>
      <Text style={profileStyle.text_content}>{profile?.corp_resident}</Text>
      
      <Text style={profileStyle.text_title}>居住者連絡先 (携帯電話番号)</Text>
      <Text style={profileStyle.text_content}>{profile?.corp_address}</Text>
      
      <Button
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
        buttonStyle={{
          backgroundColor: Colors.primary,
          borderRadius: 8,
          marginTop: 40,
          marginBottom: 20,
          height: 50,
        }}
        title="内容を変更する"
        onPress={submit}
      />
    </View>
     )} */}
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
