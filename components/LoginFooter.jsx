import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import Colors from '../constants/Colors'
import GlobalStyles from '../styles'

const links = [
    { text: '運営会社', to: 'Company' },
    { text: '利用規約', to: 'Policy' },
    { text: 'プライバシーポリシー', to: 'Privacy' },
    // { text: '個人情報の取扱い', to: 'UserInfo' },
    { text: 'お問い合わせ', to: 'Contact' },
  ]

export default function LoginFooter({navigation}) {
    return (
        <View style={styles.footer}>
        {links.map(link => (
          <Button
            key={link.text}
            onPress={() => navigation.navigate(link.to)}
            buttonStyle={styles.row}
            title={link.text}
            titleStyle={[GlobalStyles.fontSmall, { color: Colors.primary }]}
            icon={<Icon name="chevron-right" color={Colors.primary} />}
            iconRight />
        ))}
        <View style={styles.footerMain}>
            <Image source={require('root/assets/leonud.png')} style={{width: 50, height: 50, marginRight: 5}} />
            <View style={{marginLeft: 5}}>
              <Text style={[GlobalStyles.fontNormal]}>{"株式会社レオン都市開発"}</Text>
              <Text style={[GlobalStyles.fontNote]}>{"免許登録\n 宅地建物取引業免許　国土交通大臣（３）第7609号"}</Text>
            </View>
        </View>
        <Text style={[GlobalStyles.fontNote, styles.copyright]}>{"Copyright © 2021 LEON URBAN DEVELOPMENT Co.,Ltd.\nAll Right Reserved."}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    row: {
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomColor: Colors.primary,
      borderBottomWidth: 0.5
    },
    footer: {
      backgroundColor: Colors.secondary
    },
    footerMain: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
    },
    copyright: { textAlign: 'center', marginTop: 5, marginBottom: 20 }
  })