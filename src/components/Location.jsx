import { Text, View, PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import tw from 'tailwind-react-native-classnames';

export class Location extends Component {
    constructor() {
        super();
        this.state = {
            latitude: 0,
            longitude: 0,
        }
    }

    async componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ).then(() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { coords: { latitude, longitude } } = position;
                    this.setState({ latitude, longitude })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
        }).catch(err => {
            console.error(err)
        })
    }

    componentDidUpdate(state) {
        // console.log(this.state, "hello");
    }

    render() {
        return (
            <View className="h-48 w-full rounded-xl bg-gray-500 p-1 mt-20">
                <MapView
                    paddingAdjustmentBehavior='automatic'
                    className="h-full w-full"
                    // scrollEnabled={false}
                    mapType={"standard"}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.022,
                        longitudeDelta: 0.0500,
                    }}
                >
                    <Marker
                        coordinate={this.state}
                        title={"title"}
                        description={"description"}
                    />
                </MapView>
            </View>
        )
    }
}

export default Location