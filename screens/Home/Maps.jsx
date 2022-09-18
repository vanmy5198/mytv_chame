import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    Dimensions,
    Image,
    ScrollView,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    PermissionsAndroid,
    StyleSheet
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, Animated } from "react-native-maps";
import GlobalStyles from '../../styles'
import Colors from '../../constants/Colors'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const { width } = Dimensions.get("window");
// const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=%E9%81%BF%E9%9B%A3%E6%89%80&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`
// const URL_city_hall = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=150&type=city_hall&keyword=%E5%B8%82%E5%BD%B9%E6%89%80&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes&location=34.69,135.5'
// const URL_police = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.69,135.5&radius=150&keyword=交番&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes'
// const URL_hostipal = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.69,135.5&radius=150&keyword=病院&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes'
// const URL_post = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.69,135.5&radius=150&keyword=郵便局&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes'

const PublicRouter = ({ data }) => {

    const [currentPosition, setCurrentPosition] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041
    })
    const [result, setResult] = useState([]);
    const [resultCityHall, setResultCityHall] = useState([]);
    const [resultPolice, setResultPolice] = useState([]);
    const [resultHospital, setResultHospital] = useState([]);
    const [resultPost, setResultPost] = useState([]);

    // useEffect(() => {

    //     getResultCityHall()
    //     getResultPolice()
    //     getResultHospital()
    //     getResultPost()
    // }, [currentPosition])

    useEffect(() => {
        getLocationAsync()
    }, [])

    const _map = useRef(null);

    function getLocationAsync() {
        // console.log('maps: ', data)
        // navigator.geolocation.getCurrentPosition(position => {
        //     const { longitude, latitude } = position.coords
        //     setCurrentPosition({

        //         // latitude: 34.69,
        //         // longitude: 135.5
        //         latitude: latitude,
        //         longitude: longitude,
        //         latitudeDelta: 0.0042,
        //         longitudeDelta: 0.0041
        //     })
        //     getResultCityHall(latitude, longitude),
        //         getResultPolice(latitude, longitude),
        //         getResultHospital(latitude, longitude),
        //         getResultPost(latitude, longitude)
        // })
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log('data: ', data.results[0].geometry.location)
                const location = data.results[0].geometry.location
                setCurrentPosition({
                    // latitude: 34.69,
                    // longitude: 135.5
                    latitude: location?.lat,
                    longitude: location?.lng,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0041
                })
                getResultCityHall(location?.lat, location?.lng),
                    getResultPolice(location?.lat, location?.lng),
                    getResultHospital(location?.lat, location?.lng),
                    getResultPost(location?.lat, location?.lng)
            })
            .catch(console.error)
    };

    function getResultCityHall(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=250&type=city_hall&keyword=%E5%B8%82%E5%BD%B9%E6%89%80&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes&location=${latitude},${longitude}`)
            .then(res => res.json())
            .then(data => {
                // console.log('city_hall: ' + data.results)
                setResultCityHall(data.results)
                const arr = data.results.map(i => ({ name: i.name, location: i.geometry.location }))
                setResult(listData => ([...listData, ...arr]));
            })
            .catch(console.error)
    }


    function getResultPolice(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=250&keyword=交番&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log('police: ' + data.results)
                setResultPolice(data.results)
                const arr = data.results.map(i => ({ name: i.name, location: i.geometry.location }))
                setResult(listData => ([...listData, ...arr]));
            })
            .catch(console.error)
    }

    function getResultHospital(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=250&keyword=病院&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log('hospital: ' + data.results)
                setResultHospital(data.results)
                const arr = data.results.map(i => ({ name: i.name, location: i.geometry.location }))
                setResult(listData => ([...listData, ...arr]));
            })
            .catch(console.error)
    }

    function getResultPost(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=250&keyword=郵便局&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log('post: ' + data.results)
                setResultPost(data.results)
                const arr = data.results.map(i => ({ name: i.name, location: i.geometry.location }))
                setResult(listData => ([...listData, ...arr]));
            })
            .catch(console.error)
    }

    const mapMarkers_cityHall = () => {
        return (resultCityHall.map((data) =>
            (<Marker
                icon={require('../../assets/marker_cityhall.png')}
                key={data.place_id}
                coordinate={{ latitude: data.geometry.location.lat, longitude: data.geometry.location.lng }}
                title={data.name}
                description={data.vicinity}
            >
            </Marker>)
        )
        )
    }

    const mapMarkers_police = () => {
        return (resultPolice.map((data) =>
            (<Marker
                icon={require('../../assets/marker_police.png')}
                key={data.place_id}
                coordinate={{ latitude: data.geometry.location.lat, longitude: data.geometry.location.lng }}
                title={data.name}
                description={data.vicinity}
            >
            </Marker>)
        )
        )
    }

    const mapMarkers_hospital = () => {
        return (resultHospital.map((data) =>
            (<Marker
                icon={require('../../assets/marker_hospital.png')}
                key={data.place_id}
                coordinate={{ latitude: data.geometry.location.lat, longitude: data.geometry.location.lng }}
                title={data.name}
                description={data.vicinity}
            >
            </Marker>)
        )
        )
    }

    const mapMarkers_post = () => {
        return (resultPost.map((data) =>
            (<Marker
                icon={require('../../assets/marker_post_office.png')}
                key={data.place_id}
                coordinate={{ latitude: data.geometry.location.lat, longitude: data.geometry.location.lng }}
                title={data.name}
                description={data.vicinity}
            >
            </Marker>)
        )
        )
    }

    return (
        <View style={{ flex: 1, marginBottom: 30 }}>
            {currentPosition?.latitude ? (
                <MapView
                    ref={_map}
                    provider={PROVIDER_GOOGLE}
                    style={{ height: width / 2 }}
                    initialRegion={currentPosition}
                >
                    {mapMarkers_cityHall()}
                    {mapMarkers_police()}
                    {mapMarkers_hospital()}
                    {mapMarkers_post()}
                    <Marker
                        icon={require("../../assets/map_home.png")}
                        coordinate={currentPosition}>
                    </Marker>
                </MapView>
            ) : <ActivityIndicator style={{ flex: 1 }} animating size='large' />}

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 30 }}
                keyExtractor={(item, index) => (
                    item + `${index}`
                )}
                data={result}
                renderItem={({ item, index }) => (

                    <View style={{ borderWidth: 1, borderColor: 'gray', padding: 12 }}>
                        <TouchableOpacity onPress={() => {
                            (
                                // console.log(item.location),
                                _map.current.animateCamera(
                                    {
                                        center: {
                                            latitude: item.location.lat,
                                            longitude: item.location.lng
                                        },
                                        zoom: 18
                                    },
                                    10000
                                )
                            )
                        }}>
                            <Text>{index + 1} - {item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const ShelterRouter = ({ data }) => {
    // const { index, routes } = route.params
    const [currentPosition, setCurrentPosition] = useState(initialRegion)
    const [result, setResult] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getLocationAsync()
    }, [])

    const _map = useRef(null);

    async function getLocationAsync() {
        // console.log('maps: ', data)
        // navigator.geolocation.getCurrentPosition(position => {
        //     const { longitude, latitude } = position.coords
        //     setCurrentPosition({
        //         ...currentPosition,
        //         // latitude: 34.69,
        //         // longitude: 135.5
        //         latitude: latitude,
        //         longitude: longitude
        //     })
        //     getResult(latitude, longitude)
        // })
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log('data: ', data.results[0].geometry.location)
                const location = data.results[0].geometry.location
                setCurrentPosition({
                    // latitude: 34.69,
                    // longitude: 135.5
                    latitude: location?.lat,
                    longitude: location?.lng,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0021,
                })
                getResult(location?.lat, location?.lng)
            })
            .catch(console.error)
    };

    function getResult(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=%E9%81%BF%E9%9B%A3%E6%89%80&language=ja&key=AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.results)
                setResult(data.results)
                setLoading(false)
            })
            .catch(console.error)
    }

    // result.map((data) => console.log('data: ' + data.name))

    const mapMarkers = () => {
        return (result.map((data) =>
            (<Marker
                key={data.place_id}
                coordinate={{ latitude: data.geometry.location.lat, longitude: data.geometry.location.lng }}
                title={data.name}
                description={data.vicinity}
            >
            </Marker>)
        )
        )
    }

    return (
        <View style={{ flex: 1, marginBottom: 30 }}>

            {currentPosition?.latitude ? (
                <MapView

                    provider={PROVIDER_GOOGLE}
                    style={{ height: width / 2 }}
                    initialRegion={currentPosition}
                    ref={_map}
                >
                    {mapMarkers()}
                    <Marker
                        icon={require("../../assets/map_home.png")}
                        coordinate={currentPosition}>
                    </Marker>
                </MapView>
            ) : <ActivityIndicator style={{ flex: 1 }} animating size='large' />}

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 30 }}
                keyExtractor={(item, index) => (
                    item.place_id + `${index}`
                )}
                data={result}
                renderItem={({ item, index }) => (
                    <View style={{ borderWidth: 1, borderColor: 'gray', padding: 12 }}>
                        <TouchableOpacity onPress={() => {
                            (
                                // console.log(item.location),
                                _map.current.animateCamera(
                                    {
                                        center: {
                                            latitude: item.geometry.location.lat,
                                            longitude: item.geometry.location.lng
                                        },
                                        zoom: 15
                                    },
                                    10000
                                )
                            )
                        }}>
                            <Text>{index + 1} - {item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );

}

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'black' }}
        style={{ backgroundColor: 'transparent'}}
        activeColor={'black'}
        inactiveColor={'grey'}
    />
);

const initialRegion = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.0041,
}

export default function Maps({ route }) {
    const { address } = route.params
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: '公共施設' },
        { key: 'second', title: '避難所' },
    ]);

    // console.log('asdsasadsa', address)

    // const renderScene = SceneMap({
    //     first: PublicRouter,
    //     second: ShelterRouter,
    // });

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 30, marginBottom: 10, marginHorizontal: 20 }}>
                <View style={{ backgroundColor: Colors.primary, borderRadius: 2 }}>
                    <Text style={{ ...GlobalStyles.fontSubHeader, fontWeight: 'bold', paddingVertical: 5, paddingLeft: 10, color: Colors.white }}>{"周辺の情報"}</Text>
                </View>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={
                    ({ route }) => {
                        switch (route.key) {
                            case 'first':
                                return <PublicRouter data={address} />;
                            case 'second':
                                return <ShelterRouter data={address} />;
                            default:
                                return null;
                        }
                    }
                }
                onIndexChange={setIndex}
                style={{ marginHorizontal: 20 }}
            />

        </View>
    )
}
