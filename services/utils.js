import {Platform} from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/ja';

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const convertImg = (arr) => {
    if (Platform.OS === 'ios') {
        const newArr = arr.map((i, ind) => {
            let uriParts = i.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            let nameArr = uriParts[0].split('/')
            let name = nameArr[nameArr.length - 1]
            return { uri: i.uri, name: `${name}.${fileType}`, type: `image/${fileType}`, error: 0 }
        })
        return newArr
    }
    if (Platform.OS === 'android') {
        const newArr = arr.map((i, ind) => {
            let uriParts = i.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            let nameArr = uriParts[uriParts.length - 2].split('/')
            let name = nameArr[nameArr.length - 1]
            return { uri: i.uri, name: `${name}.${fileType}`, type: `image/${fileType}`, error: 0 }
        })
        return newArr
    }
}

export const formatNumber = (amount) => {
    var nf = new Intl.NumberFormat();
    return nf.format(amount) + '円'
};