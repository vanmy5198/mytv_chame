import httpClient from 'root/services/http-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token'
export const USER_ID = 'user_id'
export const CONTRACT_STATUS = 'contract_status'
export const ARTICLE_ID = 'article_id'
export const ROOM_ID = 'room_id'
export const ARTICLE_NAME = 'room_name'
export const ROOM_NUMBER = 'room_number'
export const NOTIFICATION_STATUS = 'notification_status'
export const DEVICE_TOKEN = 'device_token'
export const PHONE_NUMBER = 'phone_number'
export const CHECKED_IN = 'checked_in'
// keys for saving checkbox state in checkin page
export const ENTRANCE_STATE = 'entranceState'
export const ENTRANCE_OTHER = 'entranceOther'
export const ENTRANCE_CONTENT = 'entranceContent'

export const KITCHEN_STATE = 'kitchenState'
export const KITCHEN_OTHER = 'kitchenOther'
export const KITCHEN_CONTENT = 'kitchenContent'

export const BATH_STATE = 'bathState'
export const BATH_OTHER = 'bathOther'
export const BATH_CONTENT = 'bathContent'

export const CHANGE_STATE = 'changeState'
export const CHANGE_OTHER = 'changeOther'
export const CHANGE_CONTENT = 'changeContent'

export const LAUNDRY_STATE = 'laundryState'
export const LAUNDRY_OTHER = 'laundryOther'
export const LAUNDRY_CONTENT = 'laundryContent'

export const TOILET_STATE = 'toiletState'
export const TOILET_OTHER = 'toiletOther'
export const TOILET_CONTENT = 'toiletContent'

export const LIVING_STATE = 'livingState'
export const LIVING_OTHER = 'livingOther'
export const LIVING_CONTENT = 'livingContent'

export const STYLE_STATE = 'styleState'
export const STYLE_OTHER = 'styleOther'
export const STYLE_CONTENT = 'styleContent'

export const BALCONY_STATE = 'balconyState'
export const BALCONY_OTHER = 'balconyOther'
export const BALCONY_CONTENT = 'balconyContent'

export const OTHER_STATE = 'otherState'
export const OTHER_OTHER = 'otherOther'
export const OTHER_CONTENT = 'otherContent'
// keys for saving other text, content text in checkin page

// Handle Login
export const handleLogin = async (data) => {
    try {
        // new login from api
        const token = data.data.resident.resident_token
        const userId = data.data.resident.resident_id
        await AsyncStorage.setItem(TOKEN_KEY, token)
        await AsyncStorage.setItem(USER_ID, userId)
        //AXIOS AUTHORIZATION HEADER
        httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    } catch (error) {
        throw new Error(error);
    }
};

// Handle Logout
export const handleLogout = async () => {
    try {
        //REMOVE DATA
        await AsyncStorage.removeItem(TOKEN_KEY)
        await AsyncStorage.removeItem(USER_ID)
        await AsyncStorage.removeItem(ARTICLE_ID)
        await AsyncStorage.removeItem(ROOM_ID)
        await AsyncStorage.removeItem(ARTICLE_NAME)
        await AsyncStorage.removeItem(ROOM_NUMBER)
        await AsyncStorage.removeItem(PHONE_NUMBER)
        await AsyncStorage.removeItem(CHECKED_IN)
        // remove CHECK_IN states
        const arr = [ENTRANCE_STATE, ENTRANCE_OTHER, ENTRANCE_CONTENT,
            KITCHEN_STATE, KITCHEN_OTHER, KITCHEN_CONTENT,
            BATH_STATE, BATH_OTHER, BATH_CONTENT,
            CHANGE_STATE, CHANGE_OTHER, CHANGE_CONTENT,
            LAUNDRY_STATE, LAUNDRY_OTHER, LAUNDRY_CONTENT,
            TOILET_STATE, TOILET_OTHER, TOILET_CONTENT,
            LIVING_STATE, LIVING_OTHER, LIVING_CONTENT,
            STYLE_STATE, STYLE_OTHER, STYLE_CONTENT,
            BALCONY_STATE, BALCONY_OTHER, BALCONY_CONTENT,
            OTHER_STATE, OTHER_OTHER, OTHER_CONTENT]
        for (const i of arr) {
            await AsyncStorage.removeItem(i)
        }

        //AXIOS AUTHORIZATION HEADER
        delete httpClient.defaults.headers.common["Authorization"];

    } catch (error) {
        throw new Error(error);
    }
};

export const getRoom = async () => {
    let roomId = await AsyncStorage.getItem(ROOM_ID)
    if (!roomId) {
        const userId = await AsyncStorage.getItem(USER_ID)
        if (!userId) return null // userId = null => not login. return
        const { data } = await httpClient.get(`get_room?resident_id=${userId}`)
        const arr = data.data.rooms.map(i => ({ article_name: i.article.name, room_number: i.room_number, article_id: i.article.id, id: i.id }))
        const room = arr[0]
        roomId = room.id
        await Promise.all([AsyncStorage.setItem(ARTICLE_ID, room.article_id), AsyncStorage.setItem(ROOM_ID, room.id), AsyncStorage.setItem(ARTICLE_NAME, room.article_name), AsyncStorage.setItem(ROOM_NUMBER, room.room_number)])
    }
    const article_id = await AsyncStorage.getItem(ARTICLE_ID)
    const article_name = await AsyncStorage.getItem(ARTICLE_NAME)
    const room_number = await AsyncStorage.getItem(ROOM_NUMBER)
    return { id: roomId, article_id, article_name, room_number }
}