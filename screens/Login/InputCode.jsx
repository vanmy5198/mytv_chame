import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import Colors from "../../constants/Colors"
import GlobalStyles from "../../styles/index"
import LoginFooter from "../../components/LoginFooter"
import httpClient from 'root/services/http-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleLogin, handleLogout, CONTRACT_STATUS } from 'root/services/request'

export default function Login({ navigation, route }) {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const {contract_status, resident_id, resident_api_key, resident_api_secret, resident_sms_code } = route.params

  const checkCode = () => {
    if (!inputCode || inputCode.length < 6) {
      setError('6字までご入力ください。')
      return false
    }
    return true;
  }

  const updateCode = (val) => {
    setInputCode(() => val)
  }

  const submit = async () => {
    const check = checkCode();
    if (!check) return
    const formData = new FormData()
    await AsyncStorage.setItem(CONTRACT_STATUS, contract_status)
    formData.append('resident_id', resident_id)
    formData.append('resident_api_key', resident_api_key)
    formData.append('resident_api_secret', resident_api_secret)
    formData.append('resident_sms_code', inputCode)
    httpClient.post('login', formData)
      .then(async ({ data }) => {
        await handleLogin(data)
        Alert.alert("", "本人確認が完了しました。", [
          { text: "OK", onPress: () => {
              navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }]
            }
          )} }
        ])
      })
      .catch(({ data }) => {
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
  };

  const logout = async () => {
    httpClient.post('logout').then(async () => {
      setLoggedIn(previousValue => !previousValue)
    }).catch(({ data }) => {
     
    })
    await handleLogout()
    // reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'InputPhone' }]
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text
            style={[
              GlobalStyles.fontSubHeader,
              { fontWeight: "bold", textAlign: "center" },
            ]}
          >
            { route.params.phone + "（SMS）に\n認証コードを送信しました"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Resend')} style={{ marginTop: 20, marginLeft: "auto", backgroundColor: "transparent" }}>
            <Text style={[GlobalStyles.fontNormal, { color: Colors.text }]}>コードが送信されませんでしたか？▶︎</Text>
          </TouchableOpacity>
          <Text style={[GlobalStyles.fontNormal, { fontWeight: "bold", marginTop: 20 }]}>
            {"SMSに送信された認証コードを入力"}
          </Text>
          {!!error && (
            <Text
              style={([GlobalStyles.fontNote], { color: "red" })}
            >{` *${error}`}</Text>
          )}

          <TextInput
            style={[GlobalStyles.input, { marginTop: 5 }]}
            placeholder="0123"
            keyboardType="numeric"
            onChangeText={(val) => updateCode(val)}
            value={inputCode}
            autoFocus
            maxLength={6}
          />
          <TouchableOpacity onPress={submit} style={{ justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: 8, marginTop: 15, height: 50, borderRadius: 8, marginTop: 15 }}>
            <Text style={{ textAlign: 'center', color: "white", fontWeight: "bold", fontSize: 16 }}>認証コードを入力してアプリを開始する</Text>
          </TouchableOpacity>
        </View>
        {/* footer */}
        <LoginFooter navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  main: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
});