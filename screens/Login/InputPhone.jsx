import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native'
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import LoginFooter from '../../components/LoginFooter'
import httpClient from 'root/services/http-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PHONE_NUMBER } from 'root/services/request'

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const updatePhone = (val) => {
    if (val.length > 13) return
    setPhoneNumber(() => val)
  }

  useEffect(() => {
    let val = phoneNumber
    let isDirty = false
    if (val.length >= 4 && val[3] !== '-') {
      val = val.substring(0, 3) + '-' + val.substring(3)
      isDirty = true
    }
    if (val.length >= 9 && val[8] !== '-') {
      val = val.substring(0, 8) + '-' + val.substring(8)
      isDirty = true
    }
    if (isDirty) {
      val = val.substring(0, 13)
      setPhoneNumber(val)
    }
  }, [phoneNumber])

  const submit = () => {
    if (phoneNumber.length < 13) {
      setError(() => '電話番号は090-1234-5678の形式で入力してください。')
      return
    }
    const formData = new FormData()
    formData.append('resident_tel', phoneNumber)
    httpClient.post('login_request', formData)
      .then(({ data }) => {
        AsyncStorage.setItem(PHONE_NUMBER, phoneNumber)
        navigation.navigate('InputCode', { ...data.data.resident, phone: phoneNumber })
      })
      .catch(({ data }) => {
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={[GlobalStyles.fontSubHeader, { fontWeight: 'bold', textAlign: 'center' }]}>{"入居時に登録した携帯電話番号を入力"}</Text>
          <Text style={[GlobalStyles.fontNormal, { color: Colors.text, marginTop: 20 }]}>{"本人確認のため、携帯電話のSMS（ショートメッセージサービス）を利用して認証を行います。"}</Text>
          <Text style={[GlobalStyles.fontNormal, { fontWeight: 'bold', marginTop: 20 }]}>{"携帯電話番号"}</Text>
          {!!error && <Text style={[GlobalStyles.fontNote], { color: 'red' }}>{` *${error}`}</Text>}
          <TextInput style={[GlobalStyles.input, { marginTop: 5 }]}
            placeholder="01234567890"
            keyboardType="numeric"
            onChangeText={(val) => { updatePhone(val) }}
            value={phoneNumber}
            maxLength={13}
          />
          <TouchableOpacity onPress={submit} style={{ justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: 8, marginTop: 15, height: 50 }}>
            <Text style={{ textAlign: 'center', color: "white", fontWeight: "bold", fontSize: 16 }}>認証コードを送信（SMS）</Text>
          </TouchableOpacity>
          <Text style={[GlobalStyles.fontNormal, { marginTop: 20 }]}>{"※電話番号は本人確認や不正利用防止のために使用します。"}</Text>
          {/* <TouchableOpacity onPress={() => { navigation.reset({index: 0, routes: [{ name: 'Main' }]})}} style={{ justifyContent: 'center', backgroundColor: Colors.grayBorderDark, borderRadius: 20, marginTop: 15, height: 35 }}>
            <Text style={{ textAlign: 'center', color: 'black', fontWeight: "bold", fontSize: 18 }}>入居希望のお客様はこちら</Text>
          </TouchableOpacity> */}
        </View>
        {/* footer */}
        <LoginFooter style={{ flex: 1, marginTop: 20 }} navigation={navigation} />

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  main: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20
  }
})