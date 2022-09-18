import React from 'react'
import {View, Text, Image} from 'react-native'
import GlobalStyles from '../styles'
import Colors from '../constants/Colors'
import Footer1 from './Footer1'
import Footer2 from './Footer2'
import Footer3 from './Footer3'

export default function AccordionContent(item, index, isActive, sections, navigation) {
    return (
        <View style={{paddingBottom: 20}}>
            <Text style={{...GlobalStyles.fontSmall, marginTop: 10, lineHeight: 20}}>{item.text}</Text>
            {/* section */}
            {!!item.section && item.section.map((sec, ind) => 
                <View key={`section-${ind}`}>
                    <Text style={{...GlobalStyles.fontSmall, color: sec.color || Colors.primary, fontWeight: 'bold'}}>{sec.label}</Text>
                    <Text style={{...GlobalStyles.fontSmall, lineHeight: 20}}>{sec.text}</Text>
                </View>
            )}
            {/* about */}
            {!!item.about && <View style={{marginTop: 20}}>
                                <Text style={{...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, backgroundColor: Colors.orange, color: Colors.white}}>{item.about.label}</Text>
                                {item.about.text.map((i, aIndex) => 
                                    {
                                        if(typeof i === 'string') return <Text key={aIndex} style={{...GlobalStyles.fontSmall, marginTop: 10}}>{i}</Text>
                                        else if (i.text) return <Text key={aIndex} style={{...GlobalStyles.fontSmall, ...i.style, color: i.color || Colors.primary, fontWeight: 'bold'}}>{i.text}</Text>
                                        else return <Image resizeMode="contain" style={i.style} key={aIndex} source={i.src} />
                                    }
                                )}
                            </View>
            }
            {/* paragraph */}
            {!!item.paragraph && item.paragraph.map((para, ind) => 
                <View key={`para-${ind}`}>
                    <Text style={{...GlobalStyles.fontSmall, lineHeight: 20}}>
                        <Text style={{color: Colors.primary, fontWeight: 'bold'}}>{para.label}</Text>
                        {para.text}
                    </Text>
                </View>
            )}
            {/* footer link */}
            {!!item.footerLink &&  <Text style={{...GlobalStyles.fontNormal, textDecorationLine: 'underline', textAlign: 'right', color: Colors.blue, fontWeight: 'bold'}} onPress={() => navigation.navigate(item.footerLink.src)}>{item.footerLink.text}</Text>

            }
            { item.footer === 0 && <View style={{marginTop: 20}} /> }
            { item.footer === 1 && <Footer1 localStyle={{marginTop: 20}} route={'TroubleContact'} /> }
            { item.footer === 2 && <Footer2 localStyle={{marginTop: 20}} /> }
            { item.footer === 3 && <Footer3 localStyle={{marginTop: 20}} /> }
        </View>
    )
}