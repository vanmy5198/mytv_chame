import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Alert,
  Platform, SafeAreaView
} from "react-native";
import { Badge } from 'react-native-elements'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./TabNavigationScreen/HomeScreen";
import NotiScreen from "./TabNavigationScreen/NotificationScreen";
import ProfileScreen from "./TabNavigationScreen/ProfileScreen";
import SettingsScreen from "./TabNavigationScreen/SettingScreen";
import { USER_ID } from 'root/services/request'
import { ROOM_ID } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogout, TOKEN_KEY } from '../services/request'
import httpClient from "../services/http-client";
import { Context } from './Context/CountContext';

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }) {
  const home = require(`../assets/tab_home.png`)
  const home2 = require(`../assets/tab_home_2.png`)
  const noti = require(`../assets/tab_news.png`)
  const noti2 = require(`../assets/tab_news_2.png`)
  const profile = require(`../assets/tab_profile.png`)
  const profile2 = require(`../assets/tab_profile_2.png`)
  const setting = require(`../assets/tab_setting.png`)
  const setting2 = require(`../assets/tab_setting_2.png`)
  const tabs = [home, home2, noti, noti2, profile, profile2, setting, setting2]
  const initialData = []
  const [countNews, setCountNew] = useState(0)
  const [notificationArticle, setNotificationArticle] = useState(initialData)
  const [countNotiArti, setCountNotiArticle] = useState(0)
  const [countTotalNews, setCountTotalNews] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  // let countNotiArticle = 0
  const logout = async () => {
    setModalVisible(false)
    httpClient.post('logout').then(async () => {
      setLoggedIn(previousValue => !previousValue)
    }).catch(({ data }) => {
    })
    await handleLogout()
    navigation.reset({
      index: 0,
      routes: [{ name: 'InputPhone' }]
    })
  }
  useEffect(() => {
    getCountNews();
    getNotificationArticle();
    setCountTotalNews(countNotiArti + countNews);
  }, [countNews, countNotiArti])

  async function getNotificationArticle() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      var countNotiArticle = 0;
      httpClient.get(`get_notification_article?resident_id=${userID}`).then(({ data }) => {
        for (const notiArticle of data.data.resident) {
          if (notiArticle.status == null) {
            countNotiArticle++;
          }
        }
        setCountNotiArticle(countNotiArticle)
      })
    })
    .catch(() => {
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
    })

  }

  async function getCountNews() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      var countNoti = 0;
      httpClient.get(`get_notification_common?resident_id=${userID}`).then(({ data }) => {
        for (const noti of data.data.resident) {
          if (noti.status == null) {
            countNoti++;
          }
        }
        setCountNew(countNoti)
      })
    })
      .catch(({ data }) => {
        return false
        Alert.alert('エラー',
          data.error[0],
          [
            { text: 'OK', onPress: () => logout() }
          ])
      })
    const isExpired = await roomExpired()
    if (!isExpired) {
      return false
    }
  }

  async function roomExpired() {
    const room = await AsyncStorage.getItem(ROOM_ID)
    AsyncStorage.getItem(USER_ID).then(userID => {
      let url = `switch_room_selected?resident_id=${userID}`;
      if (room) {
        url = `switch_room_selected?resident_id=${userID}&room_id=${room}`
      }
      httpClient.get(url).then(({ data }) => {

      }).catch(({ data }) => {
        Alert.alert('エラー',
          data.error[0],
          [
            { text: 'OK', onPress: () => logout() }
          ])
      })
    })
  }

  function updateStatusNotifications(type) {
    httpClient.get(`update_status_notification?type=${type}`).then(({ data }) => {
    }).catch(() => {
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
    })
  }

  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((val) => setToken(val));
  }, []);
  const s = Platform.OS === 'android' && { height: 55, paddingBottom: 5 }
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let index
          if (route.name === "ホーム") {
            index = focused ? 0 : 1;
            return (
              <View onTouchEnd={() => { getCountNews(), getNotificationArticle() }}>
                <Image
                  source={tabs[index]}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }}
                />
              </View>)

          } else if (route.name === "お知らせ") {
            index = focused ? 2 : 3;
            return (
              // Feture: invisible when count = 0 
              <View onTouchEnd={() => { getCountNews(), getNotificationArticle(), updateStatusNotifications(1), updateStatusNotifications(2) }}>
                {countTotalNews != 0 && <Badge
                  value={countTotalNews}
                  status="error"
                  containerStyle={{ position: 'absolute', top: 0, right: -8, zIndex: 3 }}
                />}
                <Image
                  resizeMode="contain"
                  source={tabs[index]}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }} />
              </View>
            )
          } else if (route.name === "マイページ") {
            index = focused ? 4 : 5
            return (
              <View onTouchEnd={() => { getCountNews(), getNotificationArticle() }}>
                <Image
                  resizeMode="contain"
                  source={tabs[index]}
                  fadeDuration={0}
                  style={{ width: 30, height: 30 }}
                />
              </View>)
          } else if (route.name === "アプリ設定") {
            index = focused ? 6 : 7
            // if (focused) return <Ionicons name="ios-settings" size={24} color="red" />
            // else return <Ionicons name="ios-settings" size={24} color="black" />
            return (
              <View onTouchEnd={() => { getCountNews(), getNotificationArticle() }}>
                <Image
                  resizeMode="contain"
                  resizeMethod="scale"
                  source={tabs[index]}
                  fadeDuration={1}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            )
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#055456",
        style: {
          backgroundColor: "#00AAB7",
          paddingHorizontal: 25,
          ...s
        }
      }}
    >
      <Tab.Screen style={{ marginLeft: 30 }} name="ホーム" component={HomeScreen} />
      <Tab.Screen name="お知らせ" component={NotiScreen} />
      <Tab.Screen name="マイページ" component={ProfileScreen} listeners={token == null ? { tabPress: e => { e.preventDefault(); } } : true} />
      <Tab.Screen name="アプリ設定" component={SettingsScreen} />
    </Tab.Navigator>

  );
}
