import React, { useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    Image, Alert
} from 'react-native'
import { Button } from 'react-native-elements'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import Row from './Row'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { window } from 'root/constants/Layouts'
const { width } = window
export default function TableSheet({ list, imgBtnEnable }) {
    //const limit = 240 * 180 * 4 // ~ 0.29mb / max 47 images
    const limit = 480 * 320 * 4 // ~ 0.6mb //  max 13 images
    // const limit = 640 * 360  // 16:9
    // 1mb = 1048576b
    const pickImage = async () => {
        // gallery permission
        if (!imgBtnEnable) {
            Alert.alert('エラー', 'chameLEONで画像を選択するにはギャラリーへのアクセス権が必要です。', [
                { text: 'OK' }
            ])
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            if (result.width * result.height * 4 > limit) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{ resize: { width: 480, height: 320 } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                )
                list.setImages(prev => ([...prev, manipResult]))
            } else list.setImages(prev => ([...prev, result]))
        }
    }

    const removeImage = (index) => {
        list.setImages(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]))
    }

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ marginTop: 10, ...GlobalStyles.fontNormal, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.primary, color: Colors.white }}>{list.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingStart: 10, marginTop: 8, marginBottom: 8 }}>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, lineHeight: 20, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>場所</Text>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, lineHeight: 20, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>損耗無し</Text>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, lineHeight: 20, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>損耗有り</Text>
                <Text style={{ ...GlobalStyles.fontNormal, color: Colors.primary, lineHeight: 20, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>設備無し</Text>
            </View>
            {list.item.map((name, index) => (
                <Row key={index} name={name} list={list} index={index} />
            ))}
            {/* other */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>その他</Text>
                <TextInput value={list.other} onChangeText={(val) => list.setOther(val)} style={{ ...GlobalStyles.inputSmall, marginLeft: 10, flex: 1, textAlignVertical: 'center' }} placeholder="※気になる箇所があればご記載下さい" />
            </View>
            {/* image */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold' }}>{"設備の写真"}</Text>
                <Button onPress={pickImage} title="ファイルを選択" disabled={list.images.length >= 2} titleStyle={GlobalStyles.fontNote} buttonStyle={{ backgroundColor: Colors.white, paddingVertical: 0 }} containerStyle={{ marginLeft: 10, borderWidth: 1, borderColor: Colors.grayBorder, paddingHorizontal: 5 }} />
            </View>
            {list.images.length === 0 && <Text style={{ ...GlobalStyles.fontNote, marginLeft: 5, marginTop: 5 }}>{"ファイルが選択されていません"}</Text>}
            {list.images.length > 0 &&
                (<View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 30 }}>
                    {list.images.map((i, ind) => (
                        <View key={ind} style={{ position: 'relative', width: width / 6, height: width / 6, marginLeft: ind > 0 ? 5 : 0 }}>
                            <Image source={{ uri: i.uri }} style={{ width: width / 6, height: width / 6 }} />
                            <Button title="削除" onPress={() => removeImage(ind)} containerStyle={{ borderColor: Colors.grayBorder, borderWidth: 1, marginTop: 3 }} buttonStyle={{ backgroundColor: Colors.white }} titleStyle={{ ...GlobalStyles.fontNote }} />
                        </View>
                    ))}
                </View>)
            }
            {/* content */}
            <Text style={{ ...GlobalStyles.fontNormal, fontWeight: 'bold', marginTop: 20 }}>{"具体的な状況"}</Text>
            <TextInput style={[GlobalStyles.input, { marginTop: 5, height: 100 }]}
                multiline
                value={list.content}
                onChangeText={(val) => { list.setContent(val) }}
            />
        </View>
    )
}