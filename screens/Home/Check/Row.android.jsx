import React from 'react'
import {
    View,
    Text
} from 'react-native'
import GlobalStyles from '../../../styles'
import Colors from '../../../constants/Colors'
import CheckBox from '@react-native-community/checkbox'
import { window } from 'root/constants/Layouts'
const { width } = window
export default function Row({ list, name, index }) {
    return (
        <View key={list.title + "-" + index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: index % 2 === 0 ? Colors.secondary : Colors.white, paddingStart: 10 }}>
            <Text style={{ ...GlobalStyles.fontSmallest, flexBasis: '25%', textAlign: 'center', fontWeight: 'bold' }}>{name}</Text>
            <View style={{ flexBasis: (width - 40) / 4, alignItems: 'center' }}>
                <CheckBox
                    disabled={list.state[index] === 1}
                    value={list.state[index] === 1}
                    onValueChange={() => list.setState(prev => ([...prev.slice(0, index), 1, ...prev.slice(index + 1)]))}
                    tintColors={{ true: Colors.primary }}
                />
            </View>
            <View style={{ flexBasis: (width - 40) / 4, alignItems: 'center' }}>
                <CheckBox
                    disabled={list.state[index] === 2}
                    value={list.state[index] === 2}
                    onValueChange={() => list.setState(prev => ([...prev.slice(0, index), 2, ...prev.slice(index + 1)]))}
                    tintColors={{ true: Colors.primary }}
                />
            </View>
            <View style={{ flexBasis: (width - 40) / 4, alignItems: 'center' }}>
                <CheckBox
                    disabled={list.state[index] === 3}
                    value={list.state[index] === 3}
                    onValueChange={() => list.setState(prev => ([...prev.slice(0, index), 3, ...prev.slice(index + 1)]))}
                    tintColors={{ true: Colors.primary }}
                />
            </View>
        </View>
    )
}