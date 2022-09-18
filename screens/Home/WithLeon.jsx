import React from 'react'
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
} from 'react-native'
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'

const { width } = Dimensions.get("window");

export default function WithLeon({ navigation }) {

    const isRedirectWithLeon = 'bd7ddb97be1ce39463208c7155961f22';
    const image = { uri: "https://reactjs.org/logo-og.png" };


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, height: '115%' }}>
            <View style={style.container}>
                <ImageBackground source={require("../../assets/moving_background.jpg")} resizeMode="cover" style={style.image_background}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexGrow: 1 }}>
                        <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                            <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', padding: 5, color: Colors.white }}>{"お引越しのご検討"}</Text>
                        </View>
                    </View>
                    <Image
                        source={require("../../assets/moving_01.png")}
                        style={{
                            position: 'absolute', right: 0, top: 60,
                            width: width * 0.88,
                            height: width * 0.72
                        }}
                    />
                    <Image
                        source={require("../../assets/moving_02.png")}
                        style={{
                            position: 'absolute', left: 20, top: 280,
                            width: width * 0.64,
                            height: width * 0.2
                        }}
                    />
                    <Image
                        source={require("../../assets/moving_03.png")}
                        style={{
                            position: 'absolute', left: 20, right: 20, top: 380,
                            width: width * 0.9,
                            height: width * 0.1
                        }}
                    />
                    <Image
                        source={require("../../assets/moving_04.png")}
                        style={{
                            position: 'absolute', left: width * 0.5 - 30, top: 400,
                            width: width * 0.15,
                            height: width * 0.15
                        }}
                    />
                    <Image
                        source={require("../../assets/moving_05.png")}
                        style={{
                            position: 'absolute', left: 85, right: 85, top: 470,
                            width: width * 0.6,
                            height: width * 0.1
                        }}
                    />
                    <Image
                        source={require("../../assets/5manen_cashback.png")}
                        style={{
                            position: 'absolute', left: 25, right: 25, top: 520,
                            width: width * 0.9,
                            height: width * 0.09
                        }}
                    />
                    <View style={{ position: 'absolute', left: 20, right: 20, top: 580 }}>
                        <TouchableOpacity onPress={() => (navigation.navigate('WebView', { url: 'https://withleon.com/chameleon/chameleon-user/', name: 'with LEON', headers: { 'token': isRedirectWithLeon } }))} style={{ backgroundColor: "#00AAB7", borderRadius: 8, paddingVertical: 20, paddingHorizontal: 70, justifyContent: 'center' }}>
                            <Text style={{ ...GlobalStyles.fontSubHeader, color: "white", fontWeight: "bold", textAlign: 'center' }}>{"with LEON に行く"}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image_background: {
        flex: 1,
        position: "relative",
    },

})