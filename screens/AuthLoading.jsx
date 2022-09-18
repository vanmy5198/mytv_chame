import React, { useEffect } from 'react'
import { ActivityIndicator, Text, ImageBackground } from 'react-native'
import { TOKEN_KEY, USER_ID } from "root/services/request"
import AsyncStorage from '@react-native-async-storage/async-storage'
import httpClient from 'root/services/http-client'

export default function AuthLoading({ navigation }) {
    useEffect(() => {
        initialize()
    }, []);

    async function initialize() {
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY)
            // has token
            if (token) {
                // console.log('has token', token, await AsyncStorage.getItem(USER_ID))
                httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            } else {
                // console.log('no token')
                navigation.navigate('OnBoarding')
            }
        } catch (e) {
            // console.log('error auth', e)
            navigation.navigate('OnBoarding');
        }
    }

    return (
        // <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} source={require('root/assets/chameleon_splash.png')}>
            <ActivityIndicator color="#fff" style={{ marginTop: 50 }} size="large" />
            <Text style={{ marginTop: 10, color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{"読み込み中"}</Text>
        </ImageBackground>
        // </View>
    )
}
