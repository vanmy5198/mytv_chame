import React from 'react'
import { View, Text, Image } from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { window } from '../constants/Layouts'

export default function AccordionHeader(section, _, isActive) {
    return (
        <View style={{ backgroundColor: Colors.secondary, marginTop: 2, borderRadius: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
            <Image style={{ width: 28, height: 26, marginRight: 10 }} source={require('../assets/q_icon.png')} />
            <Text style={{ ...GlobalStyles.fontSmall, lineHeight: 20, flexGrow: 1, flexBasis: window.width - 40 - 30 - 44 - 5, fontWeight: 'bold' }} numberOfLines={3}>{section.header}</Text>
            <Entypo style={{ flexShrink: 0, transform: isActive ? [{ rotateX: '180deg' }] : [] }} name="chevron-small-down" size={24} color={Colors.primary} />
        </View>
    )
} 