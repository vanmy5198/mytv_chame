import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from '@react-navigation/native'
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Colors from '../../constants/Colors'
import { ImageLoader } from "../../components/ImageLoader";
import GlobalStyles from '../../styles/index'
import { Feather } from '@expo/vector-icons'
import { handleLogout } from 'root/services/request'
import { AntDesign } from '@expo/vector-icons';
import httpClient from "../../services/http-client";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { USER_ID, DEVICE_TOKEN, NOTIFICATION_STATUS, CHECKED_IN, getRoom, CONTRACT_STATUS, TOKEN_KEY } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ROOM_ID } from "../../services/request";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const { width } = Dimensions.get("window");
const picsumImages = [
  {
    name: "ライフライン手続き",
    src: require("../../assets/top_icon_lifeline.png"),
    page: 'LifeLine'
  },
  {
    name: "トラブル・お問い合わせ",
    src: require("../../assets/contact.png"),
    page: 'Trouble',
  },
  {
    name: "設備の使い方",
    src: require("../../assets/home_guide.png"),
    page: 'FacilityGuide'
  },
  {
    name: "契約情報のご確認",
    src: require("../../assets/contract_information.png"),
    page: 'ContractInformation'
  },
  {
    name: "よくある質問",
    src: require("../../assets/q_a.png"),
    page: 'Q_AScreen'
  },
  {
    name: "お引越しのご検討",
    src: require("../../assets/leon_ud_rogo3x.png"),
    page: 'WithLeon'
  },
];

const initialRegion = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(initialRegion)
  const [lastestNews, setLatestNews] = useState('');
  const [lastestNewsGuest, setLatestNewsGuest] = useState('');
  const [checkinStatus, setCheckinStatus] = useState(false)
  // Push Notification
  // const [statusNotification, setStatusNotification] = useState(false)
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isFocused = useIsFocused();
  const [address, setAddress] = useState('')
  const [ward, setWard] = useState('')
  const _map = useRef(null);
  // const [startDate, setStartDate] = useState('')
  var statusNotification = false

  const [contract_status, setContractStatus] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
  }, []);

  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((val) => setToken(val));
  }, []);


  useEffect(() => {
    if (isFocused) {
      getLastestNews()
      getLastestNewsGuest()
      getAPIData()
      if (!getLastestNews() && !getAPIData()) {
        return
      }
      // console.log('contract_status', contract_status)
      // getLocationByAddress()
      // check check-in status
      AsyncStorage.getItem(USER_ID).then(userID => {
        getRoom(userID).then(room => {
          if (!room.id) {
            return;
          }
          else {
            httpClient.get(`get_contract?resident_id=${userID}&room_id=${room.id}`).then(({ data }) => {
              const date = data.data.contract['contract_term_s'] ? new Date(data.data.contract['contract_term_s']) : new Date()
              date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
              const current = new Date()
              if (current.getTime() > date.getTime()) {
                // exceed 30 days from contract start date. disable form check-in
                setCheckinStatus(true)
                AsyncStorage.setItem(CHECKED_IN, '1')
              } else {
                AsyncStorage.setItem(CHECKED_IN, '0')
                httpClient.get(`status_check_in?resident_id=${userID}&room_id=${room.id}`).then(({ data }) => {
                  if (data.status === '200')
                    setCheckinStatus(true)
                }).catch(({ data }) => {
                  // not yet check in
                  setCheckinStatus(false)
                })
              }
            }).catch((data) => {
              // console.log('er', data)
              Alert.alert('エラー',
                data.error[0],
                [
                  { text: 'OK' }
                ])
            })
          }

        })
      })
    }

  }, [isFocused])

  useEffect(() => {
    const formData = new FormData()
    registerForPushNotificationsAsync().then((token) => {
      (
        // setExpoPushToken(token),
        // console.log('TEST Token in useEffect: ', token),
        AsyncStorage.getItem(USER_ID).then((userId) => {
          AsyncStorage.getItem(DEVICE_TOKEN).then((token) => {
            (formData.append('resident_id', userId),
              formData.append('device_token', token)),
              formData.append('enable', 1)
            // console.log('TEST: ', statusNotification)
            if (statusNotification) {
              AsyncStorage.setItem(NOTIFICATION_STATUS, "ON")
              httpClient.post('register_device_token', formData)
                .then(({ data }) => {
                  // console.log(data)
                })
                .catch(({ data }) => {
                  return false
                  Alert.alert('エラー',
                    data.error[0],
                    [
                      { text: 'OK' }
                    ])
                })
            }
            else {
              AsyncStorage.setItem(NOTIFICATION_STATUS, "OFF")
            }
          })
        }).catch(({ data }) => {
          Alert.alert('エラー',
            data.error[0],
            [
              { text: 'OK' }
            ])
        })
      )
    }
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    })
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };

  }, [])

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
        alert('プッシュ通知を受け取るには、通知設定を変更してください');
        // setStatusNotification(false)
        statusNotification = false
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem(DEVICE_TOKEN, token)
      // console.log(token);
      // setStatusNotification((previousState) => !previousState)
      statusNotification = true
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

    return token;
  }

  function setRead() {
    const formData = new FormData()
    AsyncStorage.getItem(USER_ID).then(userID => {
      (formData.append('resident_id', userID),
        httpClient.post('update_status_read_news', formData)
          .then(({ data }) => {
            // console.log(data)
          })
          .catch(({ data }) => {
            return false
            Alert.alert('エラー',
              data.error[0],
              [
                { text: 'OK' }
              ])
          })
      )
    })
  }

  async function getLastestNews() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_notification?resident_id=${userID}`).then(({ data }) => {
        setLatestNews(data.data.resident)
      })
    }).catch(() => {
      return false
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
    })
  }

  async function getLastestNewsGuest() {
    httpClient.get(`get_news_guest`).then(({ data }) => {
      setLatestNewsGuest(data.data.resident)
    })
      .catch(() => {
        return false
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
  }

  async function getAPIData() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      getRoom(userID).then(room => {
        // console.log(room.id + '-----' + userID)
        if (!room.id) {
          // console.log('Have Error with get user Information API')
          setLoading(false);
          setError(true)
          return;
        }
        else {
          httpClient.get(`get_address_article?resident_id=${userID}&room_id=${room.id}`).then(({ data }) => {
            const address = data.data.article.zip1 + '-' + data.data.article.zip2 + data.data.article.city + data.data.article.address1
            // console.log('ID: ', room.id)
            // console.log('Address from API: ', address)
            setWard(data.data.article)
            setAddress(address)
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
              .then(res => res.json())
              .then(data => {
                // console.log('TEST: ', data.results[0].geometry.location)
                const location = data.results[0].geometry.location
                setLoading(false);
                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lng}&appid=7eb2d343497c8275394fd359b63c5794&lang=ja`).then(res => res.json()).then(weatherData => {
                  setData(weatherData);
                  // console.log('WEATHER TEST: ', weatherData)
                })

                setCurrentPosition({
                  latitude: location?.lat,
                  longitude: location?.lng,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0021,
                })
                _map.current.animateCamera(
                  {
                    center: {
                      latitude: location?.lat,
                      longitude: location?.lng
                    },
                    zoom: 15
                  },
                  10000
                )

              })
              .catch(() => {
                return false
              })
          }).catch(() => {
            return false
            // console.log('er')
          })
        }

      }).catch(({ data }) => {
        return false
        Alert.alert('エラー',
          data.error[0],
          [
            { text: 'OK' }
          ])
      })
    })
  }

  async function getCountNews() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_count_news?resident_id=${userID}`).then(({ data }) => {
        setCountNew(count => ({
          ...count, ...data.data
        }))
      }).catch(({ data }) => {
        return false
        Alert.alert('エラー',
          data.error[0],
          [
            { text: 'OK', onPress: () => logout() }
          ])
      })
    })
    const isExpired = await roomExpired()
    if (!isExpired) {
      return false
    }
  }

  async function roomExpired() {
    const room = await AsyncStorage.getItem(ROOM_ID)
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`switch_room_selected?resident_id=${userID}&room_id=${room}`).then(({ data }) => {

      }).catch(({ data }) => {
        Alert.alert('エラー',
          data.error[0],
          [
            { text: 'OK', onPress: () => logout() }
          ])
      })
    })
  }

  const getImage = (dataImage) => {
    if (dataImage === '01d' || dataImage === '01n') {
      return require('../../assets/01d.png')
    }
    else if (dataImage === '02d' || dataImage === '02n') {
      return require('../../assets/02d.png')
    }
    else if (dataImage === '03d' || dataImage === '03n') {
      return require('../../assets/03d.png')
    }
    else if (dataImage === '04d' || dataImage === '04n') {
      return require('../../assets/04d.png')
    }
    else if (dataImage === '09d' || dataImage === '09n') {
      return require('../../assets/09d.png')
    }
    else if (dataImage === '10d' || dataImage === '10n') {
      return require('../../assets/10d.png')
    }
    else if (dataImage === '11d' || dataImage === '11n') {
      return require('../../assets/11d.png')
    }
    else if (dataImage === '13d' || dataImage === '13n') {
      return require('../../assets/13d.png')
    }
    else if (dataImage === '50d' || dataImage === '50n') {
      return require('../../assets/50d.png')
    }
  }

  const getBackground = (dataImage) => {
    if (dataImage === 'Clouds') {
      return require('../../assets/clouds.jpg')
    }
    else if (dataImage === 'Clear') {
      return require('../../assets/clear_sky.jpg')
    }
    else if (dataImage === 'Rain' || dataImage === 'Drizzle') {
      return require('../../assets/rain.jpg')
    }
    else if (dataImage === 'Snow') {
      return require('../../assets/snow.jpg')
    }
    else if (dataImage === 'Thunderstorm') {
      return require('../../assets/thunderstorm.jpg')
    }
    else if (dataImage === 'Mist' || dataImage === 'Smoke' || dataImage === 'Haze' || dataImage === 'Dust' || dataImage === 'Fog' || dataImage === 'Sand' || dataImage === 'Dust' || dataImage === 'Ash' || dataImage === 'Squall' || dataImage === 'Tornado') {
      return require('../../assets/mist.jpg')
    }
  }

  const menu = [
    { text: '入居時状況確認チェックシート', link: 'RoomCheckScreen' },
    { text: '入居のしおり', link: 'Bookmarks' },
    { text: '解約申請', link: 'CancelContract' },
    { text: 'ペット飼育の申請', link: 'PetForm' },
    { text: '鍵の追加申請', link: 'KeyForm' },
    { text: '家族招待', link: 'Invite' },
    { text: 'お問い合わせ', link: 'Contact' },
    { text: 'このアプリについて', link: 'About' },
  ]
  const [modalVisible, setModalVisible] = useState(false)
  const toNews = () => { console.log('tonews') }
  const logout = async () => {
    setModalVisible(false)
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

    <ScrollView key={lastestNews} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* menu modal */}
        <Modal
          animationType="fade"
          visible={modalVisible}
          presentationStyle="fullScreen"
          statusBarTranslucent={true}
        >
          <View style={{ backgroundColor: Colors.white, padding: 20, paddingTop: 40, flexGrow: 1 }}>
            <AntDesign onPress={() => setModalVisible(false)} style={{ zIndex: 1, alignSelf: 'flex-end', marginBottom: 20, padding: 10 }} name="close" size={30} color="black" />
            {token == null || contract_status === "0" ?
              (<View>
              </View>) :
              (<View>{contract_status === "1" && (
                <View>
                  {menu.map((item, index) => (
                    <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate(item.link) }} key={item.text} style={{ borderTopColor: Colors.grayBorder, borderTopWidth: 1, paddingVertical: 10, alignItems: 'center', borderBottomColor: Colors.grayBorder, borderBottomWidth: menu.length - 1 === index ? 1 : 0 }}>
                      <Text style={{ ...GlobalStyles.fontNormal }}>{item.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              </View>)}
            <TouchableOpacity onPress={() => { logout() }} style={{ borderTopColor: Colors.grayBorder, borderTopWidth: 1, paddingVertical: 10, alignItems: 'center', borderBottomColor: Colors.grayBorder, borderBottomWidth: 1 }}>
              <Text style={{ ...GlobalStyles.fontNormal }}>ログアウト</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ImageBackground source={require("../../assets/top_background_01.jpg")} style={{ position: 'relative', width, height: width / 2, zIndex: 2 }}>
          {token == null || contract_status === "0" ?
            (<View>
              <Feather
                style={{ zIndex: 1, position: 'absolute', top: 20, right: 20 }} onPress={() => { setModalVisible(true) }}
                name="menu" size={35} color="white"
              />
            </View>) :
            (<View>{contract_status === "1" && (
              <View>
                <Feather
                  style={{ zIndex: 1, position: 'absolute', top: 20, right: 20 }} onPress={() => { setModalVisible(true), getCountNews() }}
                  name="menu" size={35} color="white"
                />
              </View>
            )}
            </View>)}

          <Text style={{ ...GlobalStyles.fontSubHeader, color: Colors.white, paddingLeft: 10, top: 40 }}>{"chameLEONで\n快適な生活を!"}</Text>
          {(token == null || contract_status === "0") ? (<ImageLoader
            source={require("../../assets/speech_balloon_2.png")}
            style={{ width: width * 0.4, height: width * 0.4 * 0.65, marginLeft: '2%', bottom: -width * 0.4 * 0.65 * 0.45 }}
            resizeMode="contain"
          />) :
            (<View>
              {!checkinStatus &&
                <TouchableOpacity onPress={() => { navigation.navigate("RoomCheckScreen"), getCountNews() }} style={{ width: width * 0.4, height: width * 0.4 * 0.65, marginLeft: '2%', bottom: -width * 0.4 * 0.65 * 0.45 }}  >
                  <ImageLoader
                    source={require("../../assets/speech_balloon_1.png")}
                    style={{ width: width * 0.4, height: width * 0.4 * 0.65 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              }
              {checkinStatus &&
                <ImageLoader
                  source={require("../../assets/speech_balloon_2.png")}
                  style={{ width: width * 0.4, height: width * 0.4 * 0.65, marginLeft: '2%', bottom: -width * 0.4 * 0.65 * 0.45 }}
                  resizeMode="contain"
                />
              }</View>
            )
          }
          <ImageLoader
            source={require("../../assets/chameleon_rogo_img.png")}
            style={{
              position: 'absolute', right: 0, bottom: -((width * 0.65 / 1.52) * 0.35), width: width * 0.65,
              height: width * 0.65 / 1.52
            }}
          />
        </ImageBackground>
        <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', color: Colors.white, backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 3 }}>メニュー</Text>
        <ImageBackground source={require("../../assets/top_background_02.jpg")} style={{ flexGrow: 1 }}>
          {/* news */}
          <TouchableOpacity onPress={() => { navigation.navigate("お知らせ"), setRead(), getCountNews() }} key={"お知らせ"} style={{}}>
            <View onPress={toNews} style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginTop: 40 }}>
              <Text style={{ ...GlobalStyles.fontSmall, padding: 2, color: '#fff', backgroundColor: Colors.primary, borderRadius: 3 }}>{"NEW"}</Text>
              {token == null || contract_status === "0" ?
                (lastestNewsGuest.length == 0 ?
                  (<Text ellipsizeMode='tail' numberOfLines={1} style={{ ...GlobalStyles.fontSmall, marginLeft: 5, flexGrow: 1, width: '70%' }} >ただいま新しいお知らせ・トピックス情報はございません。</Text>) :
                  (<Text ellipsizeMode='tail' numberOfLines={1} style={{ ...GlobalStyles.fontSmall, marginLeft: 5, flexGrow: 1, width: '70%' }}>
                    {lastestNewsGuest[0]?.description}
                  </Text>)) :
                (lastestNews.length == 0 ? (<Text ellipsizeMode='tail' numberOfLines={1} style={{ ...GlobalStyles.fontSmall, marginLeft: 5, flexGrow: 1, width: '70%' }} >ただいま新しいお知らせ・トピックス情報はございません。</Text>) :
                  (<Text ellipsizeMode='tail' numberOfLines={1} style={{ ...GlobalStyles.fontSmall, marginLeft: 5, flexGrow: 1, width: '70%' }}>
                    {lastestNews[0]?.description}
                  </Text>))
              }

              <Image
                source={require("../../assets/top_arrow.png")}
                style={{ width: 18, height: 18, marginStart: 4, flexShrink: 0 }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ width: width - 40, marginTop: 10, marginLeft: 'auto', marginRight: 'auto', height: 2, backgroundColor: Colors.primary }}></View>
          {/* list menu */}

          {token == null || contract_status === "0" ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {picsumImages.map(item => (
                <TouchableOpacity onPress={() => { item.name === "設備の使い方" || item.name === "お引越しのご検討" ? navigation.navigate(item.page) : Alert.alert('エラー', 'お客様の入居情報はありません', [{ text: 'OK' }]) }} key={item.name} style={{ flexBasis: '33%', alignItems: 'center', marginVertical: 10 }}>
                  <View style={{ height: 90 }}>
                    <Image resizeMode="contain" style={{ maxWidth: 90, height: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? 70 : 90, marginTop: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? 10 : 0, tintColor: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? Colors.mossgreen : '#00AAB7' }} key={item.name} source={item.src} />
                  </View>
                  <Text numberOfLines={2} style={{ ...GlobalStyles.fontNote, textAlign: 'center', color: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? Colors.mossgreen : '#00AAB7', fontWeight: 'bold' }}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>) :
            (<View>
              <View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                  {picsumImages.map(item => (
                    <TouchableOpacity onPress={() => { navigation.navigate(item.page), getCountNews() }} key={item.name} style={{ flexBasis: '33%', alignItems: 'center', marginVertical: 10 }}>
                      <View style={{ height: 90 }}>
                        <Image resizeMode="contain" style={{ maxWidth: 90, height: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? 70 : 90, marginTop: item.name === "設備の使い方" || item.name === "お引越しのご検討" ? 10 : 0 }} key={item.name} source={item.src} />
                      </View>
                      <Text numberOfLines={2} style={{ ...GlobalStyles.fontNote, textAlign: 'center', color: Colors.mossgreen, fontWeight: 'bold' }}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ width: width - 40, marginTop: 10, marginLeft: 'auto', marginRight: 'auto', height: 2, backgroundColor: Colors.primary }}></View>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, fontWeight: 'bold', paddingHorizontal: 20, marginTop: 2 }}>{"周辺の情報"}</Text>
                {isError ? null : isLoading ? <ActivityIndicator /> : (
                  <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 2 }}>

                    <TouchableOpacity onPress={() => navigation.navigate('WebView', { url: 'https://weather.yahoo.co.jp/weather/', name: '天気情報' })}>
                      <View>
                        <Image
                          source={getBackground(data?.weather[0].main)}
                          style={{ width: width * 0.45, height: width * 0.3 }}
                        />
                        <Image source={getImage(data?.weather[0].icon)} style={{ width: 45, height: 45, top: 60, start: 10, position: 'absolute' }} />
                        <Text style={[GlobalStyles.fontNormal, { bottom: 100, start: 10 }]}>{ward?.city}</Text>
                        <Text style={[GlobalStyles.fontSmallest, { bottom: 70, start: 70 }]}>{(data?.main.temp - 273.15).toFixed(1)}°C/<Text style={GlobalStyles.fontSmallest}>{(data?.main.temp_min - 273.15).toFixed(1)}°C</Text></Text>
                      </View>
                    </TouchableOpacity>
                    {currentPosition?.latitude ? (
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ width: width * 0.45, height: width * 0.3 }}
                        initialRegion={currentPosition}
                        onPress={() => navigation.navigate("Maps", { address: address })}
                        zoomTapEnabled={false}
                        ref={_map}
                      >
                        <Marker
                          icon={require("../../assets/map_home.png")}
                          coordinate={currentPosition}>
                        </Marker>
                      </MapView>

                    ) : <ActivityIndicator style={{ flex: 1 }} animating size='large' />}

                  </View>

                )}
              </View>
            </View>
            )}

        </ImageBackground>
      </View>
    </ScrollView>
  );
}


