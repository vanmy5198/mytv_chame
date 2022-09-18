import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigations';
import { View, StyleSheet } from 'react-native';
import Colors from './constants/Colors';
import Constants from 'expo-constants';
import { requestTrackingPermission, getTrackingStatus } from 'react-native-tracking-transparency';
import AppLoading from 'expo-app-loading';
import { Provider as CountProvider } from './screens/Context/CountContext';


export default function App() {

  const [isReady, setReady] = useState(false);

  async function _cacheResourcesAsync() {
    const images = [require('./assets/chameleon_splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  getTrackingStatus().then(tracking1 => {
    if (tracking1 === 'authorized' || tracking1 === 'unavailable') {
      // enable tracking features
    } else {
      requestTrackingPermission().then(trackingStatus => {
        if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
          // We don't track anything from users
        }
      }, somethingWrong => { })
    }
  }, somethingWrong => { })


  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {

    if (!isReady) {
      return (
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      );
    }
    return (
      <SafeAreaProvider>
        <MyStatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <CountProvider>
          <Navigation />
        </CountProvider>
      </SafeAreaProvider>
    );
  }
}

const STATUSBAR_HEIGHT = Constants.statusBarHeight

const MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});