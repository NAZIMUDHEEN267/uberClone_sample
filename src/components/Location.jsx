import { Text, View, PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import pw from "tailwind-react-native-classnames";
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0
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


    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MapScreen", {latitude: this.state.latitude, longitude: this.state.longitude})}
                activeOpacity={1}
            >
                <Text className="text-xl font-bold text-black ml-1 mb-4">Around you</Text>
                <View style={[pw`h-48 w-full rounded-xl bg-gray-300`, { padding: 7 }]}>
                        <MapView
                            className="h-full w-full"
                            scrollEnabled={false}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.022,
                                longitudeDelta: 0.0500,
                            }}
                        >
                            <Marker
                                coordinate={this.state}
                            />
                        </MapView>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Location