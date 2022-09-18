import React, {useState, useCallback} from 'react'
import {
    View,
    Text,
    SectionList
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import YoutubePlayer from "react-native-youtube-iframe";
import {window} from 'root/constants/Layouts'
const {width} = window
export default function OtherFacility() {
    const list = [
        {
            section: '24時間換気の使用と給気口使用方法',
            data: [
                {
                    label: '細かい操作方法などを動画よりご確認いただけます。',
                    src: '-BEwVR0pBiE'
                }
            ]
        },
        {
            section: 'サーモスタット水栓の温度調節方法',
            data: [
                {
                    label: 'サーモスタット水栓の使い方を動画よりご確認いただけます。',
                    src: '1XnRBNBBTYA'
                }
            ]
        },
        {
            section: 'シャワーフックの角度・向き・高さ調節方法',
            data: [
                {
                    label: 'シャワーフックの使い方を動画よりご確認いただけます。',
                    src: 'R1co79tM9i4'
                }
            ]
        },
        {
            section: 'センタードアストッパーの使用方法',
            data: [
                {
                    label: '使用方法を動画よりご確認いただけます。',
                    src: 'q2BRuzmuSRA'
                }
            ]
        },
        {
            section: 'レンジフードの掃除方法',
            data: [
                {
                    label: 'レンジフードの清掃方は動画よりご確認いただけます。',
                    src: '7cNywJ-3bkU'
                }
            ]
        },
        {
            section: '人感センサーライトの取り扱い方法',
            data: [
                {
                    label: '人感センサーライトの取扱方法を動画よりご確認いただけます。',
                    src: 't_kEJt_KaXY'
                }
            ]
        },
        {
            section: '宅配ボックスの操作方法',
            data: [
                {
                    label: '宅配ボックスの操作方法を動画よりご確認いただけます。',
                    src: 'zCv5NosSxCM'
                }
            ]
        },
        {
            section: '非接触キータグの使用方法',
            data: [
                {
                    label: '非接触キータグの使用方法を動画よりご確認いただけます。',
                    src: 'DiyYn8_TFpw'
                }
            ]
        },
        {
            section: '防犯サムターンの取り扱い方法',
            data: [
                {
                    label: '防犯サムターンの取り扱い方法を動画よりご確認いただけます。',
                    src: 'ZhOTlew4apA'
                }
            ]
        },
        {
            section: '浴室換気扇のフィルター取り出し方法',
            data: [
                {
                    label: '浴室換気扇のフィルター取り出し方法をご確認いただけます。',
                    src: '_zDsipFO58M',
                    style: {marginBottom: 80}
                }
            ]
        },
        // {
        //     section: '非接触キーの使い方',
        //     videos: [
        //         {
        //             label: '非接触キーの使い方を下記の動画よりご確認いただけます。',
        //             src: 'YmGBAiHnK0U'
        //         },
        //         {
        //             label: '非接触キーの使い方を下記の動画よりご確認いただけます。',
        //             src: 'QE4PBIOGxi8'
        //         }
        //     ]
        // }
    ]
    const [playing, setPlaying] = useState(false);
    const Header = () => (
        <View style={{backgroundColor: Colors.primary, borderRadius: 2}}>
            <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white}}>{"設備の使い方"}</Text>
        </View>
    )
    const SectionHeader = ({title}) => (
        <View style={{borderBottomColor: Colors.grayBorder, borderBottomWidth: 1, paddingBottom: 5}}>
            <Text style={{...GlobalStyles.fontNormal, fontWeight: 'bold',marginTop: 20}}>{title}</Text>
        </View>
    )

    const Item = ({item}) => (
        <View style={item.style && item.style}>
            <Text style={{...GlobalStyles.fontNote, fontWeight: 'bold', marginVertical: 10}}>{item.label}</Text>
            <YoutubePlayer
                height={(width - 40) * 0.6}
                play={playing}
                videoId={item.src}
                onChangeState={onStateChange}
            />
        </View>
    )
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
    return (
        <View style={{flexGrow: 1}}>
            <SectionList
                contentContainerStyle={{flexGrow: 1}}
                style={{paddingTop: 20, paddingHorizontal: 20}}
                stickySectionHeadersEnabled={false}
                sections={list}
                keyExtractor={(item, index) => item.src + index}
                renderItem={({item}) => <Item item={item} />}
                renderSectionHeader={({section: {section}}) => <SectionHeader title={section} />}
                ListHeaderComponent={Header}
            />
        </View>
    )
}
