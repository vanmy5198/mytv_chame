import React from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Colors from '../../constants/Colors'
import GlobalStyles from '../../styles/index'
import { Button } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';

export default function About({ navigation }) {
    const list = [
        { label: '運営会社', link: 'Company' },
        { label: '利用規約', link: 'Policy' },
        { label: 'プライバシーポリシー', link: 'Privacy' }
    ]
    return (
        <View style={{ flexGrow: 1, backgroundColor: Colors.white, paddingVertical: '10%', paddingHorizontal: 20 }}>
            <Text style={{ ...GlobalStyles.fontSubHeader, textAlign: 'center', marginBottom: 40 }}>{"このアプリについて"}</Text>

            {list.map((item, index) => (
                <Button
                    onPress={() => navigation.navigate(item.link)}
                    key={item.label}
                    title={item.label}
                    titleStyle={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}
                    icon={
                        <Entypo name="chevron-right" size={24} color="#333" />
                    }
                    iconRight
                    buttonStyle={{ backgroundColor: Colors.white, justifyContent: 'space-between', borderTopColor: Colors.grayBorder, borderTopWidth: 1, paddingVertical: 15, borderBottomColor: Colors.grayBorder, borderBottomWidth: index === 2 ? 1 : 0 }}
                />
            ))}
        </View>
    )
}
