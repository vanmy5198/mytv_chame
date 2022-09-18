import React from 'react'
import WebView from 'react-native-webview'
import {ActivityIndicator, View} from 'react-native'
export default function MyWebView({route}) {
    return (
        <View style={{flex: 1}}>
            <WebView
            renderLoading={() => (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )} 
            startInLoadingState
            source={{uri: route.params.url, headers : route.params.headers}}
             />
        </View>
    )
}