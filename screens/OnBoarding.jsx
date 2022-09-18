import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'
import GlobalStyles from '../styles'
import Colors from 'root/constants/Colors'
import {window} from 'root/constants/Layouts'
const {width} = window
const data = [
  {id: "1", textHeader: "chameLEONで\n暮らしをもっと快適に", textContent: "お住まいの地域の生活情報やお得情報、防災情報などの暮らしに必要な情報の発信から、設備の故障などのトラブル時んの連絡、お住まいに関する情報など、様々なサービスをご提供します。\n楽しく快適な生活のお供に、CHAMELEON（カメレオン）をご活用ください。", image: require("../assets/walk-through_1.png")},
  {id: "2", textHeader: "chameLEONでできること", textSubHeader: "くらしの情報（予定）", textNote: "※ ご利用いただけるサービスはお住まいのエリアによって異なります", textContent: "・公共機関、施設などのスポット情報\n・避難所マップ\n・イベント情報\n・お住まいのエリアのオトクなチラシ など、生活を便利にする情報が満載です。", image: require("../assets/walk-through_2.png")},
  {id: "3", textHeader: "chameLEONでできること", textSubHeader: "入居のしおり&ライフライン手続き", textNote: "※ ご利用いただけるサービスはお住まいのエリアによって異なります", textContent: "お住まいの設備情報や、ガス、電気、水道などのライフラインの手続き情報をひとまとめにしてお届け。 生活に必要な情報をアプリで簡単に見ることができます。", image: require("../assets/walk-through_3.png")},
  {id: "4", textHeader: "chameLEONでできること", textSubHeader: "お住まいに関するお知らせ", textNote: "※ ご利用いただけるサービスはお住まいのエリアによって異なります", textContent: "お住まいに関する連絡をアプリでお知らせ。 重要なお知らせを逃しません。", image: require("../assets/walk-through_4.png")},
  {id: "5", textHeader: "chameLEONでできること", textSubHeader: "契約内容のご確認", textNote: "※ ご利用いただけるサービスはお住まいのエリアによって異なります", textContent: "お住まいの契約情報もアプリからいつでも確認いただけます", image: require("../assets/walk-through_5.png")},
]


const _keyExtractor = item => item.id
export default function OnBoarding ({navigation}) {
  const [btnRef, setBtnRef] = useState(null)
  const [offsetBtnTop, setOffsetBtnTop] = useState(0)

  const measureBtn = ({nativeEvent}) => {
    if (btnRef) {
      btnRef.measure((x, y, width, height, pageX, pageY) => {
        setOffsetBtnTop(pageY)
      })
    }
  }

  const _renderButton = () => (
    <View ref={v => setBtnRef(() => v)} onLayout={measureBtn} style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: Colors.primary, borderRadius: 8, marginBottom: 20, height: 50 }}>
      <Text style={{ ...GlobalStyles.fontNormal, color: "white", fontWeight: "bold" }}>{"入居者アプリの利用を開始する"}</Text>
    </View>
  )

  const _renderItem = ({item}) => {
    if (item.id === '1') {
      return (
          <View style={styles.slide}>
              <ImageBackground source={item.image} imageStyle={{width, height: offsetBtnTop - 16 - 10 - 50, resizeMode: 'contain'}} style={{width, height: offsetBtnTop - 16 - 10 - 50, backgroundColor: 'white'}}></ImageBackground>
          </View>
      )
    } else {
      return (
        <View
          style={[
            styles.slide, { backgroundColor: Colors.secondary }
          ]}>
            <ImageBackground source={item.image} imageStyle={{width, height: offsetBtnTop - 16 - 10 - 50, resizeMode: 'contain'}} style={{width, height: offsetBtnTop - 16 - 10 - 50}} ></ImageBackground>
        </View>
      );
    };
  }
  
  return (
  <View style={{flex: 1}}>
        <StatusBar translucent={true} /> 
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          bottomButton
          showNextButton={false}
          showDoneButton={true}
          showSkipButton={true}
          renderSkipButton={_renderButton}
          renderDoneButton={_renderButton}
          data={data}
          activeDotStyle={{backgroundColor: '#00aab7'}}
          onDone={() => navigation.navigate('InputPhone')}
          onSkip={() => navigation.navigate('InputPhone')}
        />
      </View> 
  );
}

const styles = StyleSheet.create({
  slide: {
      paddingHorizontal: 20,
      paddingTop: 40,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center'
  },
  textHeader: {
      color: Colors.primary,
      textAlign: 'center'
  }
})