import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../../services/http-client";
import { USER_ID } from '../../services/request';
import { Alert } from "react-native";

const countReducer = (state, action) => {
    switch (action.type) {
        case 'count':
            return { ...state, count: action.payload };
        default:
            return state;
    }

}

const countNews = dispatch => async () => {
    var countNoti = 0;
    var countNotiArticle = 0;
    AsyncStorage.getItem(USER_ID).then(userID => {
        httpClient.get(`get_notification_common?resident_id=${userID}`).then(({ data }) => {
            for (const noti of data.data.resident) {
                if (noti.status == null) {
                    countNoti++;
                }
            }
        })
        httpClient.get(`get_notification_article?resident_id=${userID}`).then(({ data }) => {
            for (const notiArticle of data.data.resident) {
                if (notiArticle.status == null) {
                    countNotiArticle++;
                }
            }
            count = countNotiArticle + countNoti;
            console.log('-------', count)
        })

        dispatch({ type: 'count', payload: count });
    })
        .catch(({ data }) => {
            return false
            Alert.alert('エラー',
                data.error[0],
                [
                    { text: 'OK', onPress: () => logout() }
                ])
        })
}

export const { Context, Provider } = createDataContext(
    countReducer,
    { countNews },
    { count: 0 }
)

