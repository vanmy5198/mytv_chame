import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'

export default function Row({ list, name, index }) {
    return (
        <View key={list.title + "-" + index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: index % 2 === 0 ? Colors.secondary : Colors.white, paddingStart: 10 }}>
            <Text style={{ ...GlobalStyles.fontSmallest, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>{name}</Text>
            <CheckBox
                title=''
                checked={list.state[index] === 1}
                onPress={() => list.setState(prev => ([...prev.slice(0, index), 1, ...prev.slice(index + 1)]))}
                style={{ flexBasis: '25%' }}
                checkedColor={Colors.primary}
            />
            <CheckBox
                title=''
                checked={list.state[index] === 2}
                onPress={() => list.setState(prev => ([...prev.slice(0, index), 2, ...prev.slice(index + 1)]))}
                style={{ flexBasis: '25%' }}
                checkedColor={Colors.primary}
            />
            <CheckBox
                title=''
                checked={list.state[index] === 3}
                onPress={() => list.setState(prev => ([...prev.slice(0, index), 3, ...prev.slice(index + 1)]))}
                style={{ flexBasis: '25%' }}
                checkedColor={Colors.primary}
            />
        </View>
    )
}