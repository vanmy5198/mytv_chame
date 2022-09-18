import React, {useState} from "react";
import {
    Text,
    View,
    ScrollView
  } from "react-native";
  import Colors from '../../constants/Colors'
  import GlobalStyles from '../../styles/index'
  import {CheckBox, Button} from 'react-native-elements'

  export default function CancelContract({navigation}) {
      const [checked, setChecked] = useState(false)

      return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
                <Text style={{...GlobalStyles.fontSubHeader, textAlign: 'center'}}>{"解約申請ページ"}</Text>
                <Text style={{...GlobalStyles.fontNormal, color: Colors.blueDark, marginTop: 40,}}>{"賃貸借契約書の条文ならびに特約条項をよくお読みいただき、必ず契約者ご本人様がお手続きください。契約者様以外の第三者による解約申請手続きにより、当社並びに関係者への損害が生じた場合は、損害賠償請求をさせていただきますのでご注意ください。"}</Text>
                <Text style={{...GlobalStyles.fontNormal, color: Colors.red, marginTop: 20}}>
                    {"〈注意〉\n賃貸借契約の賃借人が法人の場合、"}
                    <Text style={{fontWeight: 'bold'}}>{"アプリでの解約申請はできません。"}</Text>
                    {"よくある質問の法人のお客様の場合をご確認下さい。\n※賃貸借契約の賃借人が法人の場合、アプリでの解約申請は無効となりますのでご注意ください。"}
                </Text>
                <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginTop: 40}}>{"■上記の内容に同意する"}</Text>
                <CheckBox
                    center
                    title='同意する'
                    checked={checked}
                    onPress={() => setChecked(prev => !prev)}
                    textStyle={{...GlobalStyles.fontNormal, fontWeight: 'normal'}}
                    containerStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                    checkedColor={Colors.primary}
                />
                <Button title="解約申請フォームへ"
                    onPress={() => navigation.navigate('CancelContractForm')}
                    disabled={!checked}
                    titleStyle={{...GlobalStyles.fontNormal, color: Colors.white, fontWeight: 'bold'}}
                    buttonStyle={{marginTop: 20, backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 15}}    
                />
            </View>
        </ScrollView> 
      )
  }