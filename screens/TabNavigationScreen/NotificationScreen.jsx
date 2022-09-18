import { useWindowDimensions, Modal, BackHandler } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import VirtualizedView from '../../components/VirtualizedView'
import httpClient from 'root/services/http-client'
import { getRoom, USER_ID, TOKEN_KEY, CONTRACT_STATUS } from 'root/services/request'
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../../constants/Colors'

const { width, height } = Dimensions.get("window");

const ListFooterComponent = (

  <ActivityIndicator style={{ paddingTop: 20 }} animating size='small' />

)

export default function NotiScreen({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes, setRoute] = React.useState([
    { key: 'first', title: '全て' },
    { key: 'second', title: 'お知らせ' },
    { key: 'third', title: '物件通知' },
  ]);
  const initialData = []
  const [notificationArticle, setNotificationArticle] = useState(initialData)
  const [notificationGuest, setNotificationGuest] = useState(initialData)
  const [notificationCommon, setNotificationCommon] = useState(initialData)
  const [totalNotification, setTotalNotification] = useState(initialData)
  const [user, setUser] = useState({ articleName: '' })
  const isFocused = useIsFocused();
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [isLoadMore, setLoadMore] = useState(true)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
  const [token, setToken] = useState('');
  const [isModalVisible, setModalVisible] = useState(false)
  const [urlImage, seturlImage] = useState('')
  const [contract_status, setContractStatus] = useState('');


  const closeModal = () => {
    if (isModalVisible) {
      setModalVisible(false)
    }
  }

  useEffect(() => {
    // Get Contract_status
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
    // Get Token_key
    AsyncStorage.getItem(TOKEN_KEY).then((val) => setToken(val));
    // Handle hardware backpress's event 
    BackHandler.addEventListener('hardwareBackPress', closeModal)
    return () => BackHandler.removeEventListener('hardwareBackPress', closeModal)
  }, []);

  useEffect(() => {
    getTotalNotification()
    getNotificationArticle()
    getNotificationCommon()
    getNotificationGuest()
    setIndex(0)
    setOnEndReachedCalledDuringMomentum(false)
    getRoom()
      .then(room => setUser(() => ({ articleName: room?.article_name })))

    Notifications.getBadgeCountAsync().then(badgeNumber => {
      if (badgeNumber !== 0) {
        Notifications.setBadgeCountAsync(0);
      }
    })
  }, [isFocused])


  async function getNotificationGuest() {
    httpClient.get(`get_news_guest`).then(({ data }) => {
      setNotificationGuest(data.data.resident)
    })
      .catch(() => {
        Alert.alert('エラー', data.error[0], [
          { text: 'OK' }
        ])
      })
  }

  async function getTotalNotification() {
    setLoading(true)
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_notification?resident_id=${userID}`).then(({ data }) => {
        setTotalNotification(data.data.resident)
        setLoading(false)
      })
    }).catch(() => {
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
    })
  }

  async function getNotificationArticle() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_notification_article?resident_id=${userID}`).then(({ data }) => {
        setNotificationArticle(data.data.resident)
      })
    }).catch(() => {
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
    })
  }

  async function getNotificationCommon() {
    AsyncStorage.getItem(USER_ID).then(userID => {
      httpClient.get(`get_notification_common?resident_id=${userID}`).then(({ data }) => {
        setNotificationCommon(data.data.resident)
      })
    }).catch(() => {
      Alert.alert('エラー', data.error[0], [
        { text: 'OK' }
      ])
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


  function renderNotiArticle({ item }) {
    return (
      <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
            {item.title}
          </Text>
        <View
          style={{
            backgroundColor: "#AAAAAA",
            height: 1,
            marginTop: 6,
          }}
        />
        <Text style={{ fontSize: 10, marginTop: 6 }}>{item.created}</Text>
        <Text style={{ fontSize: 14, marginTop: 6 }}>{item.description}</Text>
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
          <Modal transparent={true} visible={isModalVisible} onRequestClose={closeModal} >
            <SafeAreaView forceInset={{ bottom: 'never', top: 44 }} style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <ImageViewer
                  enableSwipeDown
                  imageUrls={[
                    {
                      url: 'https://leon.c2sg.asia/img/notificationarticles/' + urlImage,
                    },

                  ]}
                  onSwipeDown={closeModal}
                  renderIndicator={() => null}
                  saveToLocalByLongPress={false}
                  renderHeader={
                    () =>
                      <AntDesign onPress={() => setModalVisible(false)} style={{ zIndex: 1, alignSelf: 'flex-end', marginBottom: 20, padding: 10 }} name="close" size={30} color="white" />
                  }
                />
              </View>

            </SafeAreaView>
          </Modal>
          {
            item.images.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => { setModalVisible(true); seturlImage(item); }}>
                <Image key={{ index }}
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: 'https://leon.c2sg.asia/img/notificationarticles/' + item
                  }}
                />
              </TouchableOpacity>

            )
          }

        </View>
      </View>
    );
  }
  function renderTotalNotification({ item }) {
    return (
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
            {item.title}
          </Text>
          <View style={{ padding: 8, backgroundColor: Colors.primary, borderRadius: 15 }}>
            {item.status_public == "1" ?
              <Text style={{ color: '#fff', }}>{"お知らせ"}</Text> :
              <Text style={{ color: '#fff', }}>{"物件通知"}</Text>}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#AAAAAA",
            height: 1,
            marginTop: 6,
          }}
        />
        <Text style={{ fontSize: 10, marginTop: 6 }}>{item.created}</Text>
        <Text style={{ fontSize: 14, marginTop: 6 }}>{item.description}</Text>
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
          <Modal transparent={true} visible={isModalVisible} onRequestClose={closeModal} >
            <SafeAreaView forceInset={{ bottom: 'never', top: 44 }} style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <ImageViewer
                  enableSwipeDown
                  imageUrls={[
                    {
                      url: 'https://leon.c2sg.asia/img/notificationarticles/' + urlImage,
                    },

                  ]}
                  onSwipeDown={closeModal}
                  renderIndicator={() => null}
                  saveToLocalByLongPress={false}
                  renderHeader={
                    () =>
                      <AntDesign onPress={() => setModalVisible(false)} style={{ zIndex: 1, alignSelf: 'flex-end', marginBottom: 20, padding: 10 }} name="close" size={30} color="white" />
                  }
                />
              </View>

            </SafeAreaView>
          </Modal>
          {
            item.images.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => { setModalVisible(true); seturlImage(item); }}>
                <Image key={{ index }}
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: 'https://leon.c2sg.asia/img/notificationarticles/' + item
                  }}
                />
              </TouchableOpacity>

            )
          }

        </View>
      </View>
    );
  }

  const FirstTab = () => {
    return (
      <VirtualizedView>
        {totalNotification.length === 0 && loading == false  ? <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
            新しいお知らせはございません。
          </Text>
          <View
            style={{
              backgroundColor: "#AAAAAA",
              height: 1,
              marginTop: 6,
            }}
          />
          <Text style={{ fontSize: 14, marginTop: 6 }}>ただいま新しいお知らせ・トピックス情報はございません。</Text>
        </View> : 
        loading == true ? <ActivityIndicator style={{ paddingTop: 40 }}/> : 
          <FlatList
            style={{ flex: 1 }}
            onEndReachedThreshold={0.0}
            keyExtractor={(item, index) => (item.news_title + `${index}`)}
            extraData={totalNotification}
            data={totalNotification}
            renderItem={renderTotalNotification}
          />}
      </VirtualizedView>
    );
  }

  const SecondTab = () => {
    return (
      <VirtualizedView>
        {notificationCommon.length === 0 ? <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
            新しいお知らせはございません。
          </Text>
          <View
            style={{
              backgroundColor: "#AAAAAA",
              height: 1,
              marginTop: 6,
            }}
          />
          <Text style={{ fontSize: 14, marginTop: 6 }}>ただいま新しいお知らせ・トピックス情報はございません。</Text>
        </View> :
          <FlatList
            style={{ flex: 1 }}
            onEndReachedThreshold={0.0}
            keyExtractor={(item, index) => (item.news_title + `${index}`)}
            extraData={notificationCommon}
            data={notificationCommon}
            renderItem={renderNotiArticle}
          />}
      </VirtualizedView>
    );
  }

  const ThirdTab = () => {
    return (
      <VirtualizedView>
        {notificationArticle.length === 0 ? <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
            新しいお知らせはございません。
          </Text>
          <View
            style={{
              backgroundColor: "#AAAAAA",
              height: 1,
              marginTop: 6,
            }}
          />
          <Text style={{ fontSize: 14, marginTop: 6 }}>ただいま新しいお知らせ・トピックス情報はございません。</Text>
        </View> :
          <FlatList
            style={{ flex: 1 }}
            onEndReachedThreshold={0.0}
            keyExtractor={(item, index) => (item.news_title + `${index}`)}
            extraData={notificationArticle}
            data={notificationArticle}
            renderItem={renderNotiArticle}
          />}
      </VirtualizedView>
    );
  }


  const renderScene = () => {
    const shouldRenderRouteScreen = index
    if (shouldRenderRouteScreen == 0) {
      return <FirstTab />;
    } else if (shouldRenderRouteScreen == 1) {
      return <SecondTab />;
    } else {
      return <ThirdTab />;
    }
  }


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{

        height: TabBar.height,
        top: 0,
        backgroundColor: Colors.primary
      }}
      style={{ opacity: 0.8, backgroundColor: Colors.grayBorderDark }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ alignItems: "center", marginTop: height * 0.05, marginBottom: height * 0.05 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>お知らせ一覧</Text>
        <Text style={{ fontSize: 18, color: "#50BEFF", marginTop: 6 }}>
          {user.articleName}
        </Text>
      </View>
      {(token == null || contract_status === "0") ?
        (<View>
          <VirtualizedView>
            {notificationGuest.length === 0 ? <View style={{ margin: 20 }}>
              <Text style={{ fontWeight: "bold", color: "#00AAB7", marginTop: 12 }}>
                新しいお知らせはございません。
              </Text>
              <View
                style={{
                  backgroundColor: "#AAAAAA",
                  height: 1,
                  marginTop: 6,
                }}
              />
              <Text style={{ fontSize: 14, marginTop: 6 }}>ただいま新しいお知らせ・トピックス情報はございません。</Text>
            </View> :
              <FlatList
                style={{ flex: 1 }}
                onEndReachedThreshold={0.0}
                keyExtractor={(item, index) => (item.news_title + `${index}`)}
                extraData={notificationGuest}
                data={notificationGuest}
                renderItem={renderNotiArticle}
              />}
          </VirtualizedView>
        </View>) : <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      }
    </SafeAreaView>
  );
}
