import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Linking,
  AppState,
  Platform
} from "react-native"
import GlobalStyles from 'root/styles/index.js'
import { window } from 'root/constants/Layouts'
import httpClient from 'root/services/http-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_ID, ARTICLE_ID, ROOM_ID, ARTICLE_NAME, ROOM_NUMBER, DEVICE_TOKEN, NOTIFICATION_STATUS, CONTRACT_STATUS, TOKEN_KEY } from 'root/services/request'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


const { height } = window

export default function SettingsScreen() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [selectedRoom, setSelectedRoom] = useState({ articleId: '-1', id: '-1', articleName: '', number: '' })
  const isFocused = useIsFocused();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [notification, setNotification] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const updateSelectedRoom = (room) => {
    // save to 
    Promise.all([AsyncStorage.setItem(ARTICLE_ID, room.articleId), AsyncStorage.setItem(ROOM_ID, room.id), AsyncStorage.setItem(ARTICLE_NAME, room.articleName), AsyncStorage.setItem(ROOM_NUMBER, room.number)])
      .then(() => setSelectedRoom(room))
  }

  // Handle app whenever change state between background and foreground
  async function handleAppStateChange(state) {
    setAppState(state);
    // console.log('AppState: ', state)

    // checkPermissionOutApp()
  }

  // get list room and refresh when screen is focused
  useEffect(() => {
    if (isFocused) {
      // registerForPushNotificationsAsync()
      AsyncStorage.getItem(USER_ID)
        .then((userId) => {
          httpClient.get(`get_room?resident_id=${userId}`)
            .then(async ({ data }) => {
              const arr = data.data.rooms.map(i => ({ articleName: i.article.name, articleId: i.article.id, id: i.id, number: i['room_number'] }))
              setListRoom(arr)
              const roomId = await AsyncStorage.getItem(ROOM_ID)
              // check if there is a selected room saved
              if (!roomId) updateSelectedRoom(arr[0])
              else {
                // there is a saved room
                const articleName = await AsyncStorage.getItem(ARTICLE_NAME)
                const articleId = await AsyncStorage.getItem(ARTICLE_ID)
                const roomNumber = await AsyncStorage.getItem(ROOM_NUMBER)
                updateSelectedRoom({ articleId, articleName, id: roomId, number: roomNumber })
              }
            })
            .catch(({ data }) => {
              return false
              Alert.alert('エラー', data.error[0], [
                { text: 'OK' }
              ])
            })
        })
    }
  }, [isFocused])

  // get state Notification's permission at first time 
  useEffect(() => {
    AsyncStorage.getItem(NOTIFICATION_STATUS).then((data) => {
      // console.log('NOTIFICATION_STATUS: ', data)
      if (data === 'ON') {
        setIsNotificationEnabled(true)
        setIsFirst(false)
      }
      else {
        setIsNotificationEnabled(false)
        setIsFirst(true)
      }
    })


    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    })

    // This listener is handle state app whenever user change Notification's permission or another in system's setting screen 
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };

  }, [])

  // update state of switch button whenever change state permission 
  useEffect(() => {
    if (isFirst) {
      checkPermissionOutApp()
    }
    else {
      checkPermissionAsync()
    }

  }, [appState])

  const toggleSwitchNotification = () => {
    if (Constants.isDevice) {
      setIsNotificationEnabled((previousState) => !previousState);
      // console.log('toggle: ', isNotificationEnabled)

      if (!isNotificationEnabled) {
        registerForPushNotificationsAsync()
      }
      else {
        if (Platform.OS === 'android') {
          Linking.openSettings();
        }
        else {
          Linking.openURL("app-settings:")
        }
      }

    }
    else {
      Alert.alert('エラー', 'プッシュ通知には物理デバイスを使用する必要があります', [
        { text: 'OK' }
      ])
    }
  }

  // check Notification's permission and send deviceToken at first time. After that, just switch state of swtich button 
  async function checkPermissionOutApp() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') {
      const formData = new FormData()
      setIsNotificationEnabled(true)

      // console.log('1: ', isNotificationEnabled)
      AsyncStorage.getItem(USER_ID).then((userId) => {
        AsyncStorage.getItem(DEVICE_TOKEN).then((token) => {
          (
            // console.log('Test Token: ', token),
            formData.append('resident_id', userId),
            formData.append('device_token', token)),
            formData.append('enable', 1)
          httpClient.post('register_device_token', formData)
            .then(({ data }) => {
              // console.log('POST data: ', data)
              setIsFirst(false)
            })
            .catch(({ data }) => {
              Alert.alert('エラー', data.error[0], [
                { text: 'OK' }
              ])
            })
        })
      }).catch(({ data }) => {
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
    }
    else {
      setIsNotificationEnabled(false)
      setIsFirst(true)
      // console.log('2: ', isNotificationEnabled)
    }
  }

  // function just change state of button without send deviceToken (fix Network error)
  async function checkPermissionAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') {
      if (!isNotificationEnabled) {
        setIsNotificationEnabled(true)
      }
      else {
        setIsNotificationEnabled(false)
      }

    }
    else {
      if (isNotificationEnabled) {
        setIsNotificationEnabled((previousState) => !previousState);
      }
      else {
        setIsNotificationEnabled((previousState) => previousState);
      }

    }
  }

  // this function ask user to navigate to system's setting 
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        if (Platform.OS === 'android') {
          Alert.alert(
            "通知許可なし",
            "プッシュ通知を受け取るには、通知設定を変更してください",
            [
              { text: "キャンセル", onPress: () => (setIsNotificationEnabled(false)) },
              { text: "許可する", onPress: () => (Linking.openSettings()) },
            ],
            { cancelable: false }
          );
        }
        else {
          Alert.alert(
            "通知許可なし",
            "プッシュ通知を受け取るには、通知設定を変更してください",
            [
              { text: "キャンセル", onPress: () => (setIsNotificationEnabled(false)) },
              { text: "許可する", onPress: () => (Linking.openURL("app-settings:")) },
            ],
            { cancelable: false }
          );
        }
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem(DEVICE_TOKEN, token)
      // console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');b  
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }


  const [isContactEnabled, setIsEnabled] = useState(false);
  const toggleSwitchContact = () =>
    setIsEnabled((previousState) => !previousState);

  const [listRoom, setListRoom] = useState([]);

  const setSwitchValue = (val, ind) => {
    setListRoom((rooms) => [
      ...rooms.slice(0, ind),
      { ...rooms[ind], switch: val },
      ...rooms.slice(ind + 1),
    ]);

  };

  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((val) => setToken(val));
  }, []);

  const [contract_status, setContractStatus] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}
    >
      <View style={{ flex: 1, marginTop: height * 0.1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
          通知設定
        </Text>
        <Text style={settingStyle.setting_section_subtitle}>
          管理会社からお知らせ及びお客様のお問い合わせ内容を受け取りたい通知にチェックを入れてください。
        </Text>
        <View style={settingStyle.setting_divider} />
        <View style={settingStyle.setting_item_layout}>
          <Text style={GlobalStyles.fontNormal}>管理会社からお知らせ</Text>
          <Switch
            trackColor={{ false: "#AAAAAA", true: "#34C759" }}
            // thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNotification}
            value={isNotificationEnabled}
          />
        </View>
        {/* <View style={settingStyle.setting_item_divider} />
        <View style={settingStyle.setting_item_layout}>
          <Text style={{ fontSize: 16 }}>お問い合わせ内容</Text>
          <Switch
            trackColor={{ false: "#AAAAAA", true: "#34C759" }}
            // thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchContact}
            value={isContactEnabled}
          />
        </View> */}
        <View style={settingStyle.setting_item_divider} />
        {token == null ? (<View></View>) : (<View>{contract_status === '1' && (
          <View>
            <Text style={settingStyle.setting_section_title}>お部屋情報選択</Text>
            <Text style={settingStyle.setting_section_subtitle}>
              {"契約しているお部屋が複数あり、表示される場合に選択"}
            </Text>
            <View style={settingStyle.setting_divider} />

            {listRoom.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 14,
                    alignItems: "center",
                  }}
                >
                  <Text style={GlobalStyles.fontNormal}>{item.articleName + " " + item.number}</Text>
                  <Switch
                    trackColor={{ false: "#AAAAAA", true: "#34C759" }}
                    // thumbColor={switchValue ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => updateSelectedRoom(item)}
                    value={item.id === selectedRoom.id && item.articleId === selectedRoom.articleId}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#AAAAAA",
                    height: 1,
                    marginTop: 14,
                    marginStart: 20,
                  }}
                />
              </View>
            ))}
          </View>
        )}</View>)}
        



        {/* <Text
          style={{
            color: "#FF00C4",
            fontSize: 10,
            marginStart: 20,
            marginTop: 8,
          }}
        >
          契約者（入居者）が複数の部屋を借りている場合、表示される。
        </Text> */}
        {/* <Text style={settingStyle.setting_section_title}>色変更</Text>
        <Text style={settingStyle.setting_section_subtitle}>
          アプリ全体をお好みの色に変更できます。
        </Text>
        <View style={settingStyle.setting_divider} />
        <View style={settingStyle.setting_item_layout}>
          <View style={settingStyle.change_color_layout}>
            <View
              style={{
                width: 40,
                height: 24,
                backgroundColor: "#00AAB7",
                borderRadius: 6,
              }}
            />
            <Text style={settingStyle.text_change_color_item}>
              ミントブルー
            </Text>
          </View>

          <Switch
            trackColor={{ false: "#AAAAAA", true: "#34C759" }}
            // thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={switchMintBlue}
            value={activeSwitch === 1}
          />
        </View>
        <View style={settingStyle.setting_item_divider} /> */}
      </View>
    </ScrollView>
  );
}

const settingStyle = StyleSheet.create({
  setting_section_title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 40,
  },
  setting_section_subtitle: {
    ...GlobalStyles.fontNote,
    marginTop: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  setting_divider: {
    backgroundColor: "#AAAAAA",
    height: 1,
    marginTop: 8,
  },
  setting_item_layout: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    alignItems: "center",
  },
  setting_item_divider: {
    backgroundColor: "#AAAAAA",
    height: 1,
    marginTop: 14,
    marginStart: 20,
  },
  change_color_layout: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_change_color_item: {
    fontSize: 16,
    marginStart: 8,
  },
});
